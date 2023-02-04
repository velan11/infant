import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarksListPage } from './marks-list.page';

const routes: Routes = [
  {
    path: '',
    component: MarksListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarksListPageRoutingModule {}
