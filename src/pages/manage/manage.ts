import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AddtimePage } from '../addtime/addtime';
import { AddrulePage } from '../addrule/addrule';
@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {
	
	adminkey;
	rules;
	nav;
	url; // Direct url to this calendar

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
		this.rules = this.firebaseProvider.getRules();
		this.nav = navCtrl;
		this.url = "dateroo.de/#/calendar/" + this.getKey();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ManagePage');
	}
	
	authenticate() {
		let result = this.firebaseProvider.authenticate(this.adminkey);
		if (result) {
			
		}
	}
	
	isAdmin() {
		return this.firebaseProvider.isAdmin();
	}
	
	openAddTimeslot() {
		this.nav.push(AddtimePage);
	}
	
	openAddRule() {
		this.nav.push(AddrulePage);
	}
	
	getKey() {
		return this.firebaseProvider.getCurrentCalendarName();
	}
	
	removeRule(ref) {
		console.log("Deleting rule " + ref);
		this.firebaseProvider.deleteRule(ref);
	}


	getWeekday(value) {
		if (value == 0) { return "Sunday"; }
		if (value == 1) { return "Monday"; }
		if (value == 2) { return "Tuesday"; }
		if (value == 3) { return "Wednesday"; }
		if (value == 4) { return "Thursday"; }
		if (value == 5) { return "Friday"; }
		if (value == 6) { return "Saturday"; }
	}
	
}
