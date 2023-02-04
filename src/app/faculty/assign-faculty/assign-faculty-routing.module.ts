import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignFacultyPage } from './assign-faculty.page';

const routes: Routes = [
  {
    path: '',
    component: AssignFacultyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignFacultyPageRoutingModule {}
