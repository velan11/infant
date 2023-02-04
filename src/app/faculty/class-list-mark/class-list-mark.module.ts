import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassListMarkPageRoutingModule } from './class-list-mark-routing.module';

import { ClassListMarkPage } from './class-list-mark.page';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassListMarkPageRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [ClassListMarkPage]
})
export class ClassListMarkPageModule {}
