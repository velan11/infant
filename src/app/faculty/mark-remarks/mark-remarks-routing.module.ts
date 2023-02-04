import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarkRemarksPage } from './mark-remarks.page';

const routes: Routes = [
  {
    path: '',
    component: MarkRemarksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarkRemarksPageRoutingModule {}
