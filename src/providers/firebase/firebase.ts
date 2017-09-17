import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
 
@Injectable()
export class FirebaseProvider {
	
	currentCalendar = 'calendar2134';

	constructor(public afd: AngularFireDatabase) { }

	getCalendars() {
		return this.afd.list('/calendars/');
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
}
