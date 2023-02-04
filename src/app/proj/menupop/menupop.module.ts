import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenupopPageRoutingModule } from './menupop-routing.module';

import { MenupopPage } from './menupop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenupopPageRoutingModule
  ],
  declarations: [MenupopPage]
})
export class MenupopPageModule {}
