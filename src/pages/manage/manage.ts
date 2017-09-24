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

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
		this.rules = this.firebaseProvider.getRules();
		this.nav = navCtrl;
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
	
	getRule(rule) {
		
	}
	
}
