import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { CalendarsPage } from '../calendars/calendars';
import { DatesPage } from '../dates/dates';
import { ManagePage } from '../manage/manage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
	nav: NavController;

	constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public navParams: NavParams) {
		this.nav = navCtrl;
	}
	
	openCalendars() {
		this.nav.push(CalendarsPage);
	}
	
	openCalendar() {
		this.nav.push(DatesPage);
	}
	
	isCalendarLoaded() {
		return this.firebaseProvider.getCurrentCalendar() != null;
	}
	
	manageCalendar() {
		this.nav.push(ManagePage);
	}
}
