import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignFacultyPageRoutingModule } from './assign-faculty-routing.module';

import { AssignFacultyPage } from './assign-faculty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignFacultyPageRoutingModule
  ],
  declarations: [AssignFacultyPage]
})
export class AssignFacultyPageModule {}
