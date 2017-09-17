import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { CalendarsPage } from '../calendars/calendars';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  private rootPage;
  private homePage;
  private settingsPage;
  private calendarsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.rootPage = HomePage;

	  this.homePage = HomePage;
	  this.settingsPage = SettingsPage;
	  this.calendarsPage = CalendarsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  openPage(p) {
    this.rootPage = p;
  }
}
