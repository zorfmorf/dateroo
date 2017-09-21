import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-dates',
  templateUrl: 'dates.html',
})
export class DatesPage {
	calendar : FirebaseListObservable<any[]>;
	dayOffset = 0;
	days = [];
	entryMap : Map<string, FirebaseListObservable<any[]>> = new Map<string, FirebaseListObservable<any[]>>();

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
		this.calendar = this.firebaseProvider.getCurrentCalendar();
		var date = new Date();
		date.setDate(date.getDate() + this.dayOffset);
		let list = [1, 2, 3, 4, 5, 6, 7];
		for (let i in list) {
			let day = this.dateToString(date);
			this.firebaseProvider.getDay(day).map(list=>list.length).subscribe(length => {
				this.addCalendar(day, length > 0);
			});
			date.setDate(date.getDate() + 1);
		}
	}

	// Constructor helper
	addCalendar(dayName, add) {
		if (add) {
			//console.log("dates: found valid data at " + dayName);
			this.days.push([this.getDayName(dayName), this.firebaseProvider.getDay(dayName)]);
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DatesPage');
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
	
	getDayName(dateName) {
		var date = new Date();
		if (this.dateToString(date) == dateName) {
			return "Today";
		}
		date.setDate(date.getDate() + 1);
		if (this.dateToString(date) == dateName) {
			return "Tomorrow";
		}
		return dateName;
	}
	
	getDayValue() {
		return new Date();
	}
}
