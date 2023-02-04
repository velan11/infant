import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassListMarkPage } from './class-list-mark.page';

const routes: Routes = [
  {
    path: '',
    component: ClassListMarkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassListMarkPageRoutingModule {}
