import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-addtime',
  templateUrl: 'addtime.html',
})
export class AddtimePage {
	
	nav;
	date;
	from;
	repeats;
	increments;

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
		this.nav = navCtrl;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddtimePage');
	}
	
	isSendable() {
		return this.date != null && this.date.length > 0 && this.from != null && this.from.length > 0 && this.repeats != null && this.repeats.length > 0 != null && this.increments != null && this.increments.length > 0;
	}
	
	// adds x minutes to the time thingy
	addTime(time, amount) {
		let s = time.split(':');
		let h = Number(s[0]);
		let m = Number(s[1]) + amount;
		while (m > 59) {
			m -= 60;
			h += 1;
		}
		let result = '';
		if (h < 10) { result += '0'}
		result += h + ':';
		if (m < 10) { result += '0'}
		result += m;
		return result;
	}
	
	createEntry(data) {
		let i = 0;
		while (i <= this.repeats) {
			this.firebaseProvider.addEntry({
				'date' : this.date.replace('-0', '-'),
				'from' : this.addTime(this.from, i * this.increments),
				'until' : this.addTime(this.from, (i + 1) * this.increments)
			});
			i += 1;
		}
		this.nav.pop();
	}
	
	dateToString(date) {
		console.log(date);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	}
	
}
