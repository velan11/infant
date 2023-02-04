import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpcheckPage } from './otpcheck.page';

const routes: Routes = [
  {
    path: '',
    component: OtpcheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpcheckPageRoutingModule {}
