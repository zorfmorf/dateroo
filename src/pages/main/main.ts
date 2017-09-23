import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { CalendarsPage } from '../calendars/calendars';
import { DatesPage } from '../dates/dates';
import { ManagePage } from '../manage/manage';
import { Storage } from '@ionic/storage';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

	private rootPage;
	private homePage;
	private settingsPage;
	private calendarsPage;
	private datesPage;
	private managePage;

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public firebaseProvider: FirebaseProvider) {
		this.rootPage = HomePage;
		this.homePage = HomePage;
		this.settingsPage = SettingsPage;
		this.calendarsPage = CalendarsPage;
		this.datesPage = DatesPage;
		this.managePage = ManagePage;
		
		// now load any already loaded calendars from storage
		this.storage.get('calendars').then((val) => {
			console.log('Loading existing calendar data: ' + val);
			if (val != null) {
				this.firebaseProvider.setCalendars(val.split('/'));
			}
		});
		this.storage.get('currentCalendar').then((val) => {
			console.log('Loading existing currentCalender: ' + val);
			if (val != null) {
				this.firebaseProvider.setCurrentCalendar(val);
			}
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MainPage');
	}
	
	calendarIsLoaded() {
		return this.firebaseProvider.getCurrentCalendar() != null;
	}

	openPage(p) {
		this.rootPage = p;
	}
}
