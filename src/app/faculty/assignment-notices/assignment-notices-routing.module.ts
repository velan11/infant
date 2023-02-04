import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmentNoticesPage } from './assignment-notices.page';

const routes: Routes = [
  {
    path: '',
    component: AssignmentNoticesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentNoticesPageRoutingModule {}
