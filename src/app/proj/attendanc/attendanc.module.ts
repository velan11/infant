import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AttendancPageRoutingModule } from "./attendanc-routing.module";

import { AttendancPage } from "./attendanc.page";

import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    NgbModalModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    IonicModule,
    AttendancPageRoutingModule
  ],
  declarations: [AttendancPage]
})
export class AttendancPageModule {}
