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
	newCalendarEmail = '';
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
		console.log("CalendarsPage: Remove calendar at index " + id)
		this.firebaseProvider.removeCalendar(id);
		this.calendars = this.firebaseProvider.getCalendars();
	}

	currentCalendarName() {
		return this.firebaseProvider.getCurrentCalendarName();
	}
	
	isAdmin() {
		return this.firebaseProvider.isAdmin();
	}
	
	addExampleCalendar() {
		this.firebaseProvider.addCalendarIfExist('calendar2134');
		this.calendars = this.firebaseProvider.getCalendars();
	}	
	
	isSendable() {
		return this.newCalendarName != null && this.newCalendarName.length > 0 
			&& this.newCalendarDescription != null && this.newCalendarDescription.length > 0
			&& this.newCalendarEmail != null && this.newCalendarEmail.length > 2 && this.newCalendarEmail.indexOf("@") >= 0;
	}
	
	isExistingSendable() {
		return this.existingCalenderId != null && this.existingCalenderId.length > 0;
	}
}
