import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';
import { BookPage } from '../book/book';

@IonicPage()
@Component({
  selector: 'page-dates',
  templateUrl: 'dates.html',
})
export class DatesPage {
	nav;
	calendar : FirebaseListObservable<any[]>;
	dayOffset = 0;
	days = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
		this.init();
		this.nav = navCtrl;
	}
	
	init() {
		this.days = [];
		this.calendar = this.firebaseProvider.getCurrentCalendar();
		var date = new Date();
		date.setDate(date.getDate() + this.dayOffset);
		let list = [1, 2, 3, 4, 5, 6, 7];
		for (let i in list) {
			let day = this.dateToString(date);
			this.firebaseProvider.getDay(day).map(list=>list.length).subscribe(length => {
				this.addCalendar(day, length > 0, i);
			});
			date.setDate(date.getDate() + 1);
		}
	}

	// Constructor helper
	addCalendar(dayName, add, unusedParameter) {
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
	
	getFromDate() {
		var date = new Date();
		date.setDate(date.getDate() + this.dayOffset);
		return date.getDate() + '.' + (date.getMonth() + 1) + '.';
	}
	
	getToDate() {
		var date = new Date();
		date.setDate(date.getDate() + this.dayOffset + 7);
		return date.getDate() + '.' + (date.getMonth() + 1) + '.';
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
	
	goForward() {
		this.dayOffset += 7;
		this.init();
	}
	
	goBackward() {
		this.dayOffset -= 7;
		this.init();
	}
	
	getPersonName(name) {
		if (name != null && name.length > 0 && !this.isAdmin()) {
			let res = '';
			for (let v of name.split(' ')) {
				if (v != null && v.length > 0) {
					res += v[0] + '. ';
				}
			}
			return res;
		}
		return name;
	}
	
	isAdmin() {
		return this.firebaseProvider.isAdmin();
	}
	
	book(entry) {
		this.firebaseProvider.setBookItem(entry);
		this.nav.push(BookPage);
	}
}
