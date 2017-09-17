import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
 
@Injectable()
export class FirebaseProvider {
	
	currentCalendar = 'calendar2134';

	constructor(public afd: AngularFireDatabase) { }

	getCalendars() {
		return this.afd.list('/calendars/');
	}
	
	getCalendar() {
		return this.afd.list('/calendars/' + this.currentCalendar + '/');
	}
	
	setCalendar(name) {
		this.currentCalendar = name;
	}

	addCalendar(name, description) {
		this.afd.list('/calendars/').push({ name: name, description: description });
	}

	removeCalendar(id) {
		this.afd.list('/calendars/').remove(id);
	}
	
	getCurrentCalendar() {
		return this.currentCalendar;
	}
	
	getDays() {
		return this.afd.list('/calendars/' + this.currentCalendar + '/days/');
	}
	
	getDay(day: string) {
		return this.afd.object('/calendars/' + this.currentCalendar + '/days/$(day)');
	}
}
