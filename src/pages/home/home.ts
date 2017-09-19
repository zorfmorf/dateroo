import { Component } from '@angular/core';
//import { DatePipe } from '@angular/common';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	calendar : FirebaseListObservable<any[]>;
	dayOffset = 0;
	day0 : FirebaseListObservable<any[]> = null;
	day1 : FirebaseListObservable<any[]> = null;
	day2 : FirebaseListObservable<any[]> = null;
	day3 : FirebaseListObservable<any[]> = null;
	entryMap : Map<string, FirebaseListObservable<any[]>> = new Map<string, FirebaseListObservable<any[]>>();

	constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {
		this.calendar = this.firebaseProvider.getCalendar();
		var date = new Date();
		date.setDate(date.getDate() + this.dayOffset);
		this.day0 = this.firebaseProvider.getDay(this.dateToString(date));
		date.setDate(date.getDate() + 1);
		this.day1 = this.firebaseProvider.getDay(this.dateToString(date));
		date.setDate(date.getDate() + 2);
		this.day2 = this.firebaseProvider.getDay(this.dateToString(date));
		date.setDate(date.getDate() + 3);
		this.day3 = this.firebaseProvider.getDay(this.dateToString(date));
	}
	
	displayDay(index) {
		return true;
	}
	
	getDay( day: string) {
		return this.firebaseProvider.getDay(day)
	}
	
	dateToString(date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	}
	
	getDayName(number) {
		if (this.dayOffset + number == 0) {
			return "Today";
		}
		if (this.dayOffset + number == 1) {
			return "Tomorrow";
		}
		var date = new Date();
		date.setDate(date.getDate() + this.dayOffset + number);
		return this.dateToString(date);
	}
	
	getDayValue() {
		return new Date();
	}
}
