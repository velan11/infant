import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendancPage } from './attendanc.page';

const routes: Routes = [
  {
    path: '',
    component: AttendancPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendancPageRoutingModule {}
