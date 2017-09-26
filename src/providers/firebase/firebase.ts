import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs'; // todo only import map if possible?
import { Storage } from '@ionic/storage';
 
@Injectable()
export class FirebaseProvider {
	
	//currentCalendar = 'calendar2134';
	currentCalendar;
	calendars = [];
	admin = false;
	
	// the item currently being booked
	bookItem;

	constructor(public afd: AngularFireDatabase, private storage: Storage) { }
	
	getCalendars() {
		return this.calendars;
	}
	
	getCalendar(name) {
		console.log("Load calender with name " + name);
		return this.afd.list('/calendars/' + name + '/');
	}
	
	setCalendars(names : string[]) {
		console.log("Setting calendars to new value " + names);
		for (let cal of names) {
			let entry = cal.split(',');
			if (entry.length == 2 && entry[0].length > 5) {
				console.log('Loading calendar: ' + cal);
				this.currentCalendar = entry[0];
				this.admin = (entry[1] == 'true');
				this.addCalendar(true, entry[0], entry[1] == 'true');
			} else {
				console.log('Firebase: failed to load calendar from storage: ' + cal);
			}
		}
	}

	addNewCalendar(name, description) {
		// TODO set admin data
		this.addCalendar(true, this.afd.list('/calendars/').push({ name: name, description: description }).key, true);
	}

	removeCalendar(index) {
		console.log('Firebase: Remove calendar #' + index);
		if (this.calendars.length < 2) {
			this.calendars = [];
			this.currentCalendar = '';
		} else {
			this.calendars.splice(index, 1);
			this.currentCalendar = this.calendars[0][0];
			this.admin = this.calendars[0][3];
		}
		this.storeCurrentCalendars();
	}
	
	getCurrentCalendar() {
		if (this.currentCalendar == null) { return null; }
		return this.afd.list('/calendars/' + this.currentCalendar + '/');
	}
	
	getCurrentCalendarName() {
		return this.currentCalendar;
	}
	
	setCurrentCalendar(name : string) {
		if (name != null && name.length > 5 && name.length < 50 && this.currentCalendar != name) {
			console.log("Switching to calendar " + name);
			this.currentCalendar = name;
			this.admin = false;
			for (let cal of this.calendars) {
				if (cal[0] == this.currentCalendar) {
					this.admin = cal[3];
					console.log("Current calendar is admin: " + cal[3]);
				}
			}
			this.storage.set('currentCalendar', this.currentCalendar);
			console.log('Saving current calendar to storage: ' + name);
		} else {
			console.log('Failed to set currentCalendar ' + name);
		}
	}
	
	getDay(day: string) {
		return this.afd.list('/calendars/' + this.currentCalendar + '/entries/', {
			query: {
				orderByChild: 'date',
				equalTo: day
			}
		});
	}
	
	addCalendarIfExist(name : string) {
		this.afd.list('/calendars/' + name).map(list=>list.length).subscribe(length => this.addCalendar(length > 0, name, false) );
	}
	
	// parameter is a dirty workaround
	addCalendar(actuallyDoIt, name : string, isAdmin) {
		console.log('Add calendar called ' + name);
		if (actuallyDoIt && name.length < 40 && name.length > 5 && this.countCalenderOccurence(name) == 0) {
			this.afd.object('/calendars/' + name + '/').subscribe(loadedCal => {
				this.calendars.push([name, loadedCal.name, loadedCal.description, isAdmin == true]);
				this.setCurrentCalendar(name);
				this.storeCurrentCalendars();
			});
		} else {
			console.log('Failed to load calendar with name ' + name);
		}
	}
	
	
	countCalenderOccurence(name) {
		let i = 0;
		for (let cal of this.calendars) {
			if (cal[0] == name) {
				i++;
			}
		}
		console.log('Count calender occurence ' + name + ' ' + i);
		return i;
	}
	
	cleanCalenders() {
		let cals = [];
		let rmvs = [];
		let i = 0;
		this.calendars.reverse();
		for (let cal of this.calendars) {
			if (cals.indexOf(cal[0]) > -1) {
				rmvs.push([cal[0], i]);
			} else {
				cals.push(cal[0]);
			}
			i++;
		}
		this.calendars.reverse();
		i = 0;
		for (let cal of rmvs) {
			this.removeCalendar(cal[1] - i);
			i++;
		}
	}
	
	storeCurrentCalendars() {
		this.cleanCalenders();
		let value = '';
		let firstCalendar = true;
		for (let cal of this.calendars) {
			if (this.countCalenderOccurence(cal[0]) == 1) {
				if (!firstCalendar) {
					value = value + '/';
				}
				firstCalendar = false;
				value = value + cal[0] + ',' + cal[3];
			} else {
				console.log("Duplicate calender found on store " + cal[0]);
			}
		}
		this.storage.set('calendars', value);
		console.log('Saving current calendars to storage: ' + value);
	}
	
	// of current selected calendar
	isAdmin() {
		return this.admin;
	}
	
	authenticate(id) {
		this.afd.object('/keys/'+ this.currentCalendar).subscribe(item => {
		console.log(item.$value);
			this.checkKey(id, item.$value);
		});
		return this.isAdmin();
	}
	
	checkKey(id, value) {
		console.log('Authenticating calendar with ' + id + ' ' + value);
		if (id == value) {
			this.admin = true;
			for (let cal of this.calendars) {
				if (cal[0] == this.currentCalendar) {
					cal[3] = this.admin;
				}
			}
			this.storeCurrentCalendars();
		}
	}
	
	setBookItem(item) {
		this.bookItem = item;
	}
	
	getBookItem() {
		return this.bookItem;
	}
	
	updateBookItem(ref, data) {
		console.log(ref + data);
		let state = this.getCurrentCalendarState();
		this.afd.list('/calendars/' + this.currentCalendar + '/entries/').update(ref, data);
		this.setCurrentCalendarState(state);
	}
	
	getRules() {
		return this.afd.list('/calendars/' + this.currentCalendar + '/rules/');
	}
	
	addEntry(data) {
		console.log("Adding entry with data " + data);
		let state = this.getCurrentCalendarState();
		this.afd.list('/calendars/' + this.currentCalendar + '/entries/').push(data);
		this.setCurrentCalendarState(state);
		console.log("Finished adding object with " + data);
	}
	
	addRule(data) {
		console.log("Adding rule with data " + data);
		let state = this.getCurrentCalendarState();
		this.afd.list('/calendars/' + this.currentCalendar + '/rules/').push(data);
		this.setCurrentCalendarState(state);
		console.log("Finished adding object with " + data);
	}
	
	getCurrentCalendarState() {
		let cals = [];
		let admins = [];
		for (let cal of this.calendars) {
			if (cals.indexOf(cal[0]) < 0) {
				cals.push([cal[0], cal[1]]);
			}
			if (cal[1]) {
				admins.push(cal[0]);
			}
		}
		for (let adminCal of admins) {
			for (let cal of cals) {
				if (cal[0] == adminCal) {
					cal[1] = true;
				}
			}
		}
		return [
			cals,
			this.currentCalendar
		];
	}
	
	setCurrentCalendarState(data) {
		this.currentCalendar = "";
		this.calendars = [];
		for (let cal of data[0]) {
			this.addCalendar(true, cal[0], cal[1]);
		}
		this.currentCalendar = data[1];
	}
	
	deleteRule(ref) {
		let state = this.getCurrentCalendarState();
		this.afd.list('/calendars/' + this.currentCalendar + '/rules/').remove(ref);
		this.setCurrentCalendarState(state);
	}
}
