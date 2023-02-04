import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarkRemarksPageRoutingModule } from './mark-remarks-routing.module';

import { MarkRemarksPage } from './mark-remarks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MarkRemarksPageRoutingModule
  ],
  declarations: [MarkRemarksPage]
})
export class MarkRemarksPageModule {}
