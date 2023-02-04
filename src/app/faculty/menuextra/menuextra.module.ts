import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuextraPageRoutingModule } from './menuextra-routing.module';

import { MenuextraPage } from './menuextra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuextraPageRoutingModule
  ],
  declarations: [MenuextraPage]
})
export class MenuextraPageModule {}
