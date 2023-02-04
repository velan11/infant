import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemarkModalPageRoutingModule } from './remark-modal-routing.module';

import { RemarkModalPage } from './remark-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RemarkModalPageRoutingModule
  ],
  declarations: [RemarkModalPage]
})
export class RemarkModalPageModule {}
