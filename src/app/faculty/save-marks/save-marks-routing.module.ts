import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveMarksPage } from './save-marks.page';

const routes: Routes = [
  {
    path: '',
    component: SaveMarksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveMarksPageRoutingModule {}
