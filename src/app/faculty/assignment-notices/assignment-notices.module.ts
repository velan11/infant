import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignmentNoticesPageRoutingModule } from './assignment-notices-routing.module';

import { AssignmentNoticesPage } from './assignment-notices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignmentNoticesPageRoutingModule
  ],
  declarations: [AssignmentNoticesPage]
})
export class AssignmentNoticesPageModule {}
