import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacMarkentryPage } from './fac-markentry.page';

const routes: Routes = [
  {
    path: '',
    component: FacMarkentryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacMarkentryPageRoutingModule {}
