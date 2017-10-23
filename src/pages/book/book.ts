import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { EmailComposer } from '@ionic-native/email-composer';


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

	constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider, private emailComposer: EmailComposer) {
		this.entry = this.firebaseProvider.getBookItem();
		this.nav = navCtrl;
		this.emailComposer = emailComposer;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BookPage');
	}
	
	sendChanges() {
		if (this.isSendable()) {
			console.log('Booking entry ' + this.entry.$key);
			this.firebaseProvider.updateBookItem(this.entry.$key, {
				"title" : this.inputTitle,
				"description" : this.inputDescription,
				"email" : this.inputEmail,
				"used" : true,
				"person" : this.inputName
			});
			this.emailComposer.isAvailable().then((available: boolean) =>{
				if(available) {
					let email = {
						to: this.inputEmail,
						subject: 'Booking confirmation',
						body: 'You just booked a date slot, here is your confirmation: \n'
							+ this.entry.date + "\n"
							+ this.entry.from + " until " + this.entry.until + "\n"
							+ this.inputTitle + "\n"
							+ this.inputName + "\n"
							+ this.inputDescription + "\n",
						isHtml: true
					};

					console.log('Sending email');
					// Send a text message using default options
					console.log('Email sent');
					this.emailComposer.open(email);
				} else {
					console.log('Email not available');
				}
			});
			this.nav.pop();
		}
	}
	
	isSendable() {
		return this.inputTitle != null && this.inputTitle.length > 1 && this.inputDescription != null && this.inputDescription.length > 1;
	}

}
