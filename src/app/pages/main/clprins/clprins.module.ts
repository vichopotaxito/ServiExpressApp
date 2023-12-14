import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClprinsPageRoutingModule } from './clprins-routing.module';

import { ClprinsPage } from './clprins.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClprinsPageRoutingModule,
    SharedModule
  ],
  declarations: [ClprinsPage]
})
export class ClprinsPageModule {}
