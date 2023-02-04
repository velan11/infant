import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacPasswordPageRoutingModule } from './fac-password-routing.module';

import { FacPasswordPage } from './fac-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FacPasswordPageRoutingModule
  ],
  declarations: [FacPasswordPage]
})
export class FacPasswordPageModule {}
