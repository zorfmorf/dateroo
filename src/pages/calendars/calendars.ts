import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-calendars',
  templateUrl: 'calendars.html',
})
export class CalendarsPage {
	calendars : FirebaseListObservable<any[]>;
	newCalendarName = '';
	newCalendarDescription = '';
	existingCalenderId = '';

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
		this.calendars = this.firebaseProvider.getCalendars();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CalendarsPage');
	}

	addCalendar(name) {
		this.firebaseProvider.addCalendar(this.newCalendarName, this.newCalendarDescription);
	}
	
	addExistingCalender(id) {
		
	}
	
	selectCalendar(name) {
		console.log(name)
		this.firebaseProvider.setCurrentCalendar(name);
	}

	removeCalendar(id) {
		this.firebaseProvider.removeCalendar(id);
	}

	currentCalendar() {
		return this.firebaseProvider.getCurrentCalendar()
	}
}
