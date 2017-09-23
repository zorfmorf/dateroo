import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-calendars',
  templateUrl: 'calendars.html',
})
export class CalendarsPage {
	calendars : string[];
	newCalendarName = '';
	newCalendarDescription = '';
	existingCalenderId = '';

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
		this.calendars = this.firebaseProvider.getCalendars();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CalendarsPage');
	}

	addCalendar() {
		this.firebaseProvider.addNewCalendar(this.newCalendarName, this.newCalendarDescription);
	}
	
	addExistingCalender() {
		this.firebaseProvider.addCalendarIfExist(this.existingCalenderId);
		this.calendars = this.firebaseProvider.getCalendars();
	}
	
	selectCalendar(name) {
		console.log('Selected calendar ' + name);
		this.firebaseProvider.setCurrentCalendar(name);
	}

	removeCalendar(id) {
		console.log("Remove calendar with id " + id)
		this.firebaseProvider.removeCalendar(id);
		this.calendars = this.firebaseProvider.getCalendars();
	}

	currentCalendarName() {
		return this.firebaseProvider.getCurrentCalendarName();
	}
}
