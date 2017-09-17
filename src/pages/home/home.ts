import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	calendar : FirebaseListObservable<any[]>;
	days : FirebaseListObservable<any[]>;

	constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {
		this.calendar = this.firebaseProvider.getCalendar();
		this.days = this.firebaseProvider.getDays();
	}
	
	getDay( day: string) {
		return this.firebaseProvider.getDay(day)
	}
}
