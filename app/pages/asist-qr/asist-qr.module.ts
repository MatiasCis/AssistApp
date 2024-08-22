import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistQRPageRoutingModule } from './asist-qr-routing.module';

import { AsistQRPage } from './asist-qr.page';

import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistQRPageRoutingModule,
    QRCodeModule,
    
  ],
  declarations: [AsistQRPage]
})
export class AsistQRPageModule {}
