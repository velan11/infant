import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpcheckPageRoutingModule } from './otpcheck-routing.module';

import { OtpcheckPage } from './otpcheck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpcheckPageRoutingModule
  ],
  declarations: [OtpcheckPage]
})
export class OtpcheckPageModule {}
