import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NotiPageRoutingModule } from "./noti-routing.module";

import { NotiPage } from "./noti.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NotiPageRoutingModule],
  declarations: [NotiPage],providers:[DatePipe]
})
export class NotiPageModule {}
