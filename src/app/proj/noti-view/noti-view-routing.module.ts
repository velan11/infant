import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotiViewPage } from './noti-view.page';

const routes: Routes = [
  {
    path: '',
    component: NotiViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotiViewPageRoutingModule {}
