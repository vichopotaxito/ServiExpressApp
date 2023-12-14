import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClprinsPage } from './clprins.page';

const routes: Routes = [
  {
    path: '',
    component: ClprinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClprinsPageRoutingModule {}
