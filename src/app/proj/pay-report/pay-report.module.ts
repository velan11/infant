import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayReportPageRoutingModule } from './pay-report-routing.module';

import { PayReportPage } from './pay-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayReportPageRoutingModule
  ],
  declarations: [PayReportPage]
})
export class PayReportPageModule {}
