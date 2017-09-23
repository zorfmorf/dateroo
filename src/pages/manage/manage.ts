import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {
	
	adminkey;

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
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
}
