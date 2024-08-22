import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../service/registroservice.service';


interface Componente{
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  datos:Usuario[]=[];
  newDato:Usuario=<Usuario>{};
  
  constructor(private menuController: MenuController,
    private registroService:RegistroserviceService,private plt:Platform,
    private toastController:ToastController, private navController: NavController) {
      this.plt.ready().then(()=>{
        this.loadDatos();
      })
     }

  ngOnInit() {

    
  }

  scanner() {
    this.navController.navigateRoot('tomar-as')
  }

  
  //obtener datos
  loadDatos(){
    this.registroService.getUsuarios().then(datos=>{
      this.datos=datos
    })
  }

  //actualizar
  actualizarDatos(dato:Usuario){
    dato.nomUsuario=`UPDATE: ${dato.nomUsuario}`;
    dato.apeUsuario=`UPDATE: ${dato.apeUsuario}`;
    dato.correoUsuario=`UPDATE: ${dato.correoUsuario}`;
    dato.passUsuario=`UPDATE: ${dato.passUsuario}`;
    this.registroService.actualizar(dato).then(item=>{
      this.showToast('Datos Actualizados')
      this.loadDatos();
    })
    
  }

  mostrarMenu(){
    if(localStorage.getItem('esAlumno')){
      this.menuController.open('first');
    }else{
      this.menuController.open('second')
    }   
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message:msg,
      duration:2000
    });
    toast.present();
  }

}
