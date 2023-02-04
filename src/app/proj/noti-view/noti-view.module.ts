import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotiViewPageRoutingModule } from './noti-view-routing.module';

import { NotiViewPage } from './noti-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotiViewPageRoutingModule
  ],
  declarations: [NotiViewPage]
})
export class NotiViewPageModule {}
