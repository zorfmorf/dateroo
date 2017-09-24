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
	day;
	from;
	repeats = 1;
	increments = 30;

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
		this.nav = navCtrl;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddrulePage');
	}

	isSendable() {
		return this.day != null && this.day.length > 0 && this.from != null && this.from.length > 0;
	}
	
	createRule() {
		this.firebaseProvider.addRule({
			'day' : this.day,
			'from' : this.from,
			'duration' : this.increments,
			'count' : this.repeats
		});
		this.nav.pop();
	}
}
