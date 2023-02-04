import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceStatementPage } from './attendance-statement.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceStatementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceStatementPageRoutingModule {}
