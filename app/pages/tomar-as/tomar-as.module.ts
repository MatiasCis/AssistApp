import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomarAsPageRoutingModule } from './tomar-as-routing.module';

import { TomarAsPage } from './tomar-as.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TomarAsPageRoutingModule
  ],
  declarations: [TomarAsPage]
})
export class TomarAsPageModule {}
