import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomarAsPage } from './tomar-as.page';

const routes: Routes = [
  {
    path: '',
    component: TomarAsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomarAsPageRoutingModule {}
