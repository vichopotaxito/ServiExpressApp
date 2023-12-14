import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClreservaPageRoutingModule } from './clreserva-routing.module';

import { ClreservaPage } from './clreserva.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClreservaPageRoutingModule,
    SharedModule
  ],
  declarations: [ClreservaPage]
})
export class ClreservaPageModule {}
