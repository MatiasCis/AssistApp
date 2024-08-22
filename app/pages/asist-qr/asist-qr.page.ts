import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {DatePipe}from '@angular/common'

interface Componente{
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-asist-qr',
  templateUrl: './asist-qr.page.html',
  styleUrls: ['./asist-qr.page.scss'],
})
export class AsistQRPage implements OnInit {

  qrCodeString='This is a secret qr code message';
  qrFecha= 'string ';
  scannedResult:any;
  scannedResultDate:any;
  date=new Date();
  stringDate:string=this.date.toString()
  fechaFormateada=this.datepipe.transform(this.stringDate,' dd-MM-YYYY HH:mm')||null;
  


  constructor(private datepipe:DatePipe,private menuController : MenuController) { }

  ngOnInit() {
   
   this.fechaFormateada

  }
  mostrarMenu(){
    if(localStorage.getItem('esAlumno')){
      this.menuController.open('first');
    }else{
      this.menuController.open('second')
    }   
  }

  usuario={
    modulo:'',
    fecha:`${this.fechaFormateada}`,
  }

  generaScan(){
    this.qrCodeString= this.usuario.modulo;
    this.qrFecha=this.usuario.fecha;
  }

  verScan(){
    this.scannedResult=this.qrCodeString;
    this.scannedResultDate=this.qrFecha;

  }

}
