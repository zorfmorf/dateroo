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

	removeCalendar(id) {
		console.log('Remove calendar called');
		//this.afd.list('/calendars/').remove(id);
		if (this.calendars.length < 2) {
			this.calendars = [];
			this.currentCalendar = '';
		} else {
			for (let cal of this.calendars) {
				if (cal[0] == id) {
					var index = this.calendars.indexOf(cal);
					this.calendars.splice(index, 1);
				}
			}
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
		console.log('Add calendar called');
		if (actuallyDoIt && name.length < 40 && name.length > 5) {
			this.afd.object('/calendars/' + name + '/').subscribe(loadedCal => {
				this.calendars.push([name, loadedCal.name, loadedCal.description, isAdmin == true]);
				this.setCurrentCalendar(name);
				this.storeCurrentCalendars();
			});
		} else {
			console.log('Failed to load calendar with name ' + name);
		}
	}
	
	storeCurrentCalendars() {
		let value = '';
		let firstCalendar = true;
		for (let cal of this.calendars) {
			if (!firstCalendar) {
				value = value + '/';
			}
			firstCalendar = false;
			value = value + cal[0] + ',' + cal[3];
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
		this.afd.list('/calendars/' + this.currentCalendar + '/entries/').update(ref, data);
	}
	
	getRules() {
		this.afd.list('/calendars/' + this.currentCalendar + '/rules/');
	}
	
	addEntry(data) {
		console.log("Adding entry with data " + data);
		this.afd.list('/calendars/' + this.currentCalendar + '/entries/').push(data);
	}
}
