import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemarkModalPage } from './remark-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RemarkModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemarkModalPageRoutingModule {}
