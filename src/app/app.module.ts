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
import { DatesPage } from '../pages/dates/dates';
import { BookPage } from '../pages/book/book';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from '../providers/firebase/firebase';

import { IonicStorageModule } from '@ionic/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyBc5prANnQMuEfMxM75vA3dSzpKkR7HMBA",
  authDomain: "dateroo-13eb5.firebaseapp.com",
  databaseURL: "https://dateroo-13eb5.firebaseio.com",
  storageBucket: "gs://dateroo-13eb5.appspot.com",
  messagingSenderId: '914064748849'
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
	MainPage,
	SettingsPage,
	CalendarsPage,
	DatesPage,
	BookPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	MainPage,
	SettingsPage,
	CalendarsPage,
	DatesPage,
	BookPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})

export class AppModule {}