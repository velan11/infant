import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarksListPageRoutingModule } from './marks-list-routing.module';

import { MarksListPage } from './marks-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MarksListPageRoutingModule
  ],
  declarations: [MarksListPage]
})
export class MarksListPageModule {}
