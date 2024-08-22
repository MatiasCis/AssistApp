import { Component, NgModule, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../service/registroservice.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

@NgModule({
  declarations:[
    BarcodeScanner,
  ],
  imports:[BarcodeScanner,],
  providers: [BarcodeScanner]
})


@Component({
  selector: 'app-menu-alumno',
  templateUrl: './menu-alumno.page.html',
  styleUrls: ['./menu-alumno.page.scss'],
})
export class MenuAlumnoPage implements OnInit {

  datosUsuario: Usuario;
  datoScaneados:{};
  constructor(private alertController:AlertController,private barcodeScanner: BarcodeScanner,
    private navController: NavController, private menuController: MenuController, private registroService: RegistroserviceService) { 

  
  }

  async ngOnInit() {

    this.datosUsuario = await this.registroService.getOnlyOneUser();

  }
  mostrarMenu() {
    this.menuController.enable(true,'first');
    this.menuController.open('first');
  }

  logout() {
    localStorage.clear();
    this.navController.navigateRoot('login')
  }
  scanner() {
    this.navController.navigateRoot('tomar-as')
  }



/*   async alertMsg(this.datodatos){
    const alert = await this.alertController.create({
      header: 'Error...',
      message: ''+datos,
      buttons: ['Aceptar']
    })
    await alert.present();
    return;
  }
   */

}


