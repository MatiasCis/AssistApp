import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistQRPage } from './asist-qr.page';

const routes: Routes = [
  {
    path: '',
    component: AsistQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistQRPageRoutingModule {}
