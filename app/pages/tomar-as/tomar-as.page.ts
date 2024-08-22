import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { RegistroserviceService, AsistenciaTomada, Usuario } from '../../service/registroservice.service';


@Component({
  selector: 'app-tomar-as',
  templateUrl: './tomar-as.page.html',
  styleUrls: ['./tomar-as.page.scss'],
})
export class TomarAsPage implements OnInit {

  formularioAsistencia: FormGroup;
  qrData = '';
  datoScaneados = '';
  newAsistencia: AsistenciaTomada = <AsistenciaTomada>{};
  usuarioMail: Usuario;

  constructor(private alertController: AlertController,
    private toast: ToastController,
    private barcodeScanner: BarcodeScanner,
    private menuController: MenuController,
    private registroService: RegistroserviceService,
    private fa: FormBuilder) {
    this.formularioAsistencia = this.fa.group({
      'asistencia': new FormControl("" , Validators.required)
    })
  }

  ngOnInit() {

  }

  mostrarMenu() {
    this.menuController.enable(true, 'first');
    this.menuController.open('first');
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.datoScaneados = barcodeData.text;
    }).catch(err => {
      console.log('Error al escanear', err);
    });
  }

  async crearAsistencia() {
    var formA = this.formularioAsistencia.value;
    if (this.formularioAsistencia.invalid) {
      this.alertError();
    }
    else {
      this.registroService.getOnlyOneUser().then(datoMail => {
        this.usuarioMail = datoMail;
        this.newAsistencia.correo = this.usuarioMail.correoUsuario;
        this.newAsistencia.asistenciaAlumno = formA.asistencia;
        this.registroService.addAsist(this.newAsistencia).then(dato => {
          this.newAsistencia = <AsistenciaTomada>{};
          this.showToast('Asistencia Tomada Correctamente')
          return;
        })

      })
      this.formularioAsistencia.reset();
    }
  }
  async showToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1000,
    })
    await toast.present();
    setTimeout(() => {
      /* this.router.navigateByUrl('login'); */
    }, 1000);
  }
  async alertError() {
    const alert = await this.alertController.create({
      header: 'Error..',
      message: 'No hay datos',
      buttons: ['Aceptar']
    })
    await alert.present();
  }
}


