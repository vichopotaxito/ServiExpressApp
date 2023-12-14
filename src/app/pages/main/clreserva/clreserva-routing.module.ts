import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClreservaPage } from './clreserva.page';

const routes: Routes = [
  {
    path: '',
    component: ClreservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClreservaPageRoutingModule {}
