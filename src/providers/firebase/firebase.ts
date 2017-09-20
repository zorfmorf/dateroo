import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs'; // todo only import map if possible?
import { Storage } from '@ionic/storage';
 
@Injectable()
export class FirebaseProvider {
	
	//currentCalendar = 'calendar2134';
	currentCalendar;
	calendars = [];

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
			console.log('Loading calendar: ' + cal)
			this.currentCalendar = cal;
			this.addCalendar(true, cal);
		}
	}

	addNewCalendar(name, description) {
		this.addCalendar(true, this.afd.list('/calendars/').push({ name: name, description: description }).key);
	}

	removeCalendar(id) {
		//this.afd.list('/calendars/').remove(id);
		if (this.calendars.length < 2) {
			this.calendars = [];
			this.currentCalendar = '';
		} else {
			for (let cal of this.calendars) {
				if (cal[0] == id) {
					var index = this.calendars.indexOf(cal);
					this.calendars.splice(index, 1);
					return;
				}
			}
		}
	}
	
	getCurrentCalendar() {
		if (this.currentCalendar == null) { return null; }
		return this.afd.list('/calendars/' + this.currentCalendar + '/');
	}
	
	setCurrentCalendar(name : string) {
		this.currentCalendar = name;
		this.storage.set('currentCalendar', this.currentCalendar);
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
		this.afd.list('/calendars/' + name).map(list=>list.length).subscribe(length => this.addCalendar(length > 0, name) );
	}
	
	updateCurrentCalendar() {
		if (this.calendars.length > 0 && (this.currentCalendar == null || this.currentCalendar.length < 1)) {
			this.currentCalendar = this.calendars[0];
		}
	}
	
	// parameter is a dirty workaround
	addCalendar(actuallyDoIt, name : string) {
		if (actuallyDoIt) {
			this.afd.object('/calendars/' + name + '/').subscribe(loadedCal => { 
				this.calendars.push([name, loadedCal.name, loadedCal.description]);
				this.updateCurrentCalendar();
				let value = '';
				for (let cal of this.calendars) {
					value = value + cal[0];
				}
				this.storage.set('calendars', value);
			});
		} else {
			console.log('Failed to load calendar with name ' + name);
		}
	}
}
