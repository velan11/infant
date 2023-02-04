import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceStatementPageRoutingModule } from './attendance-statement-routing.module';

import { AttendanceStatementPage } from './attendance-statement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceStatementPageRoutingModule
  ],
  declarations: [AttendanceStatementPage]
})
export class AttendanceStatementPageModule {}
