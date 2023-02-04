import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CircularsinglePage } from './circularsingle.page';

const routes: Routes = [
  {
    path: '',
    component: CircularsinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircularsinglePageRoutingModule {}
