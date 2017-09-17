import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { MainPage } from '../pages/main/main';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { CalendarsPage } from '../pages/calendars/calendars';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	MainPage,
	SettingsPage,
	CalendarsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	MainPage,
	SettingsPage,
	CalendarsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
export const firebaseConfig = {
  apiKey: "AIzaSyBc5prANnQMuEfMxM75vA3dSzpKkR7HMBA",
  authDomain: "dateroo-13eb5.firebaseapp.com",
  databaseURL: "https://dateroo-13eb5.firebaseio.com",
  storageBucket: "gs://dateroo-13eb5.appspot.com",
  messagingSenderId: '914064748849'
};