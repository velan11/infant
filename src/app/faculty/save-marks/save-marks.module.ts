import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveMarksPageRoutingModule } from './save-marks-routing.module';

import { SaveMarksPage } from './save-marks.page';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    IonicModule,
    SaveMarksPageRoutingModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule

  ],
  declarations: [SaveMarksPage]
})
export class SaveMarksPageModule {}
