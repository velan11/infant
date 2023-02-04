import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuextraPage } from './menuextra.page';

const routes: Routes = [
  {
    path: '',
    component: MenuextraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuextraPageRoutingModule {}
