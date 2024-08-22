import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../service/registroservice.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})


export class RegistroPage implements OnInit {
  
  formularioRegistro: FormGroup;
  newUsuario: Usuario = <Usuario>{};
  usuarioMail: Usuario[];
  nameApellidoPatern: any = /[a-zA-Z[a-zA-Z]/;
  
  constructor(private alertController: AlertController,
    private registroService: RegistroserviceService,
    private toast: ToastController,
    private fb: FormBuilder,
    private router: Router,) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(12), Validators.pattern(this.nameApellidoPatern)]),
      'apellido': new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(12), Validators.pattern(this.nameApellidoPatern)]),
      'correo': new FormControl("", Validators.required),
      'tipo': new FormControl("", Validators.required),
      'password': new FormControl("",Validators.compose( [Validators.required, Validators.minLength(4)])),
      'confirmaPass': new FormControl("",Validators.compose([Validators.required, Validators.minLength(4)])),
    },
      {
        Validators: this.MustMatch('password', 'confirmaPass')
      })
  }

  registerArray:any={};
  regArry:any={};


  get f() { 
    return this.formularioRegistro.controls 
  }

  errors = [
    { type: 'required', message: 'No puede estar vacio' },
    { type: 'maxlength', message: 'No puede tener mas de 8 caracteres' },
    { type: 'minlength', message: 'No puede tener menos de 4 caracteres' },
    { type: 'pattern', message: 'caracter no permitido' },
    { type:'MustMatch',message:'No coinciden'} ,
  ] 

  ngOnInit() {
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.MustMatch) { 
        return;
      }
      if (control.valid !== matchingControl.value) {

        matchingControl.setErrors({ MustMatch: true });
      }
      else {
        matchingControl.setErrors(null)
      }

    }
  }


  async CrearUsuario() {
    var form = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid) {
      this.alertError();
    }
    else {
      this.newUsuario.nomUsuario = form.nombre;
      this.newUsuario.apeUsuario = form.apellido;
      this.newUsuario.correoUsuario = form.correo;
      this.newUsuario.tipoUsuario = form.tipo;
      this.newUsuario.passUsuario = form.password;
      this.newUsuario.repassUsuario = form.confirmaPass;
      this.registroService.getUsuarios().then(datoMail => {
        this.usuarioMail = datoMail;
        if (!datoMail) {
          this.registroService.addUsuario(this.newUsuario).then(dato => {
            this.newUsuario = <Usuario>{};
            this.showToast('Cuenta Creada con existo')
          })
        } else {
          for (let meil of this.usuarioMail) {
            if (meil.correoUsuario === form.correo) {
              this.alertYaRegistrada();
              return;
            } else {
              this.registroService.addUsuario(this.newUsuario).then(dato => {
                this.newUsuario = <Usuario>{};
                this.showToast('Cuenta Creada con Existo!')
              })
            }
          }
        }
      })
      this.formularioRegistro.reset();
    }
  }

  async alertError() {
    const alert = await this.alertController.create({
      header: 'Error..',
      message: 'Debe completar todos los datos',
      buttons: ['Aceptar']
    })
    await alert.present();
  }

  async alertYaRegistrada() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Usuario ya existe',
      buttons: ['Aceptar']
    })
    await alert.present();
  }


  async showToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1000,

    })
    await toast.present();
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 1000);
  }

  tipoUsuario = undefined;

  handleChange(ev) {
    this.tipoUsuario = ev.target.value;
  }

}

