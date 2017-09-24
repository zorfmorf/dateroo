import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddrulePage } from './addrule';

@NgModule({
  declarations: [
    AddrulePage,
  ],
  imports: [
    IonicPageModule.forChild(AddrulePage),
  ],
})
export class AddrulePageModule {}
