import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-addrule',
  templateUrl: 'addrule.html',
})
export class AddrulePage {
	
	nav;
	weekday = 0;
	start;
	slots = 1;
	duration = 30;

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
		this.nav = navCtrl;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddrulePage');
	}

	isSendable() {
		return this.start != null && this.start.length > 0;
	}
	
	createRule() {
		this.firebaseProvider.addRule({
			'weekday' : this.weekday,
			'start' : this.start,
			'duration' : this.duration,
			'slots' : this.slots
		});
		this.nav.pop();
	}
}
