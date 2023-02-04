import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacPasswordPage } from './fac-password.page';

const routes: Routes = [
  {
    path: '',
    component: FacPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacPasswordPageRoutingModule {}
