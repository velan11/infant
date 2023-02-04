import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenupopPage } from './menupop.page';

const routes: Routes = [
  {
    path: '',
    component: MenupopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenupopPageRoutingModule {}
