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
import { DatesPageModule } from '../pages/dates/dates.module';
import { BookPage } from '../pages/book/book';
import { ManagePage } from '../pages/manage/manage';
import { AddtimePage } from '../pages/addtime/addtime';
import { AddrulePage } from '../pages/addrule/addrule';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { EmailComposer } from '@ionic-native/email-composer';

import { IonicStorageModule } from '@ionic/storage';
import { NgxQRCodeModule } from 'ngx-qrcode2';

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
	//DatesPage,
	BookPage,
	ManagePage,
	AddtimePage,
	AddrulePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    DatesPageModule,
    IonicStorageModule.forRoot(),
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	MainPage,
	SettingsPage,
	CalendarsPage,
	//DatesPage,
	BookPage,
	ManagePage,
	AddtimePage,
	AddrulePage
  ],
  providers: [
    StatusBar,
	EmailComposer,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})

export class AppModule {}