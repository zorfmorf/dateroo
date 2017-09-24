import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddtimePage } from './addtime';

@NgModule({
  declarations: [
    AddtimePage,
  ],
  imports: [
    IonicPageModule.forChild(AddtimePage),
  ],
})
export class AddtimePageModule {}
