import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpemPageRoutingModule } from './opem-routing.module';

import { OpemPage } from './opem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpemPageRoutingModule
  ],
  declarations: [OpemPage]
})
export class OpemPageModule {}
