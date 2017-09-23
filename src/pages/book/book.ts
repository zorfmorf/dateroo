import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
	
	entry;
	inputName;
	inputTitle;
	inputDescription;
	inputEmail = "";
	
	nav;

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
		this.entry = this.firebaseProvider.getBookItem();
		this.nav = navCtrl;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BookPage');
	}
	
	sendChanges() {
		if (this.isSendable()) {
			this.firebaseProvider.updateBookItem(this.entry.$key, {
				"title" : this.inputTitle,
				"description" : this.inputDescription,
				"email" : this.inputEmail,
				"used" : true,
				"person" : this.inputName
			});
			this.nav.pop();
		}
	}
	
	isSendable() {
		return this.inputTitle != null && this.inputTitle.length > 1 && this.inputDescription != null && this.inputDescription.length > 1;
	}

}
