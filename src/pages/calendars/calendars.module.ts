import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarsPage } from './calendars';

@NgModule({
  declarations: [
    CalendarsPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarsPage),
  ],
})
export class CalendarsPageModule {}
