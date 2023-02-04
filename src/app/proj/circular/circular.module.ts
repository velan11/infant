import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CircularPageRoutingModule } from './circular-routing.module';

import { CircularPage } from './circular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CircularPageRoutingModule
  ],
  declarations: [CircularPage]
})
export class CircularPageModule {}
