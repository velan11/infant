import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmenteditPage } from './assignmentedit.page';

const routes: Routes = [
  {
    path: '',
    component: AssignmenteditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmenteditPageRoutingModule {}
