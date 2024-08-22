import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuProfesorPageRoutingModule } from './menu-profesor-routing.module';

import { MenuProfesorPage } from './menu-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuProfesorPageRoutingModule
  ],
  declarations: [MenuProfesorPage]
})
export class MenuProfesorPageModule {}
