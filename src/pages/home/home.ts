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
	day4 : FirebaseListObservable<any[]> = null;
	entryMap : Map<string, FirebaseListObservable<any[]>> = new Map<string, FirebaseListObservable<any[]>>();

	constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {
		this.calendar = this.firebaseProvider.getCalendar();
		var date = new Date();
		date.setDate(date.getDate() + this.dayOffset);
		this.day0 = this.firebaseProvider.getDay(this.dateToString(date));
		date.setDate(date.getDate() + 1);
		this.day1 = this.firebaseProvider.getDay(this.dateToString(date));
		date.setDate(date.getDate() + 1);
		this.day2 = this.firebaseProvider.getDay(this.dateToString(date));
		date.setDate(date.getDate() + 1);
		this.day3 = this.firebaseProvider.getDay(this.dateToString(date));
	}
	
	displayDay(index) {
		return true; //TODO implement
	}
	
	getDay( day: string) {
		return this.firebaseProvider.getDay(day)
	}
	
	getEntry(day: number, entry: string) {
		var date = new Date();
		date.setDate(date.getDate() + this.dayOffset + day);
		if (this.entryMap[entry] == null) {
			this.entryMap[entry] = this.firebaseProvider.getEntry(this.dateToString(date), entry)
		}
		return this.entryMap[entry]
	}
	
	dateToString(date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	}
	
	getDayName(value: string) {
		let v = value + '';
		let s = v.split("/");
		let r = s[s.length - 1];
		var date = new Date();
		if (this.dayOffset == 0 && r == this.dateToString(date)) {
			return "Today";
		}
		date.setDate(date.getDate() + 1)
		if (this.dayOffset == 0 && r == this.dateToString(date)) {
			return "Tomorrow";
		}
		return r;
	}
}
