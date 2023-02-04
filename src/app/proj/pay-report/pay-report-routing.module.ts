import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayReportPage } from './pay-report.page';

const routes: Routes = [
  {
    path: '',
    component: PayReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayReportPageRoutingModule {}
