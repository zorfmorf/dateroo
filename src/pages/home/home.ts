import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarsPage } from '../calendars/calendars';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
	nav: NavController;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.nav = navCtrl;
	}
	
	openCalendars() {
		this.nav.push(CalendarsPage);
	}
}
