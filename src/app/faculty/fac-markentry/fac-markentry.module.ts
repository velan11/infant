import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacMarkentryPageRoutingModule } from './fac-markentry-routing.module';

import { FacMarkentryPage } from './fac-markentry.page';

import { MatExpansionModule} from '@angular/material/expansion';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FacMarkentryPageRoutingModule
  ],
  declarations: [FacMarkentryPage]
})
export class FacMarkentryPageModule {}
