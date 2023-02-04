import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CircularsinglePageRoutingModule } from './circularsingle-routing.module';

import { CircularsinglePage } from './circularsingle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CircularsinglePageRoutingModule
  ],
  declarations: [CircularsinglePage]
})
export class CircularsinglePageModule {}
