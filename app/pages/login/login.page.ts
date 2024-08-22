import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../service/registroservice.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  usuarios : Usuario[] = [];

  constructor(private menuController: MenuController,private alertController: AlertController, 
              private navController: NavController,
              private registroService: RegistroserviceService, 
              private fb: FormBuilder) { 
                this.formularioLogin = this.fb.group({ 
                  'correo' : new FormControl("", Validators.required),
                  'password' : new FormControl ("", [Validators.required, Validators.minLength(4)])                
                })
              }
  
  ngOnInit() {
    this.menuController.swipeGesture(false,'second');
    this.menuController.swipeGesture(false,'first');
  }

  errors = [
    { type: 'required', message: 'No puede estar vacio' },
    { type:'minlength', message:'Contraseña demasiado corta'}
   
  ]


  async Ingresar(){
    var f = this.formularioLogin.value;
    var a=0;
    this.registroService.getUsuarios().then(datos=>{ 
      this.usuarios = datos; 
      if (!datos || datos.length==0){
        return null;
      }
      for (let obj of this.usuarios){
        if (f.correo == obj.correoUsuario && f.password==obj.passUsuario ){
          a=1;              
          localStorage.setItem('ingresado','true');
          localStorage.setItem('infoUsuario',obj.nomUsuario) 

          if(obj.tipoUsuario=='alumno'){
            localStorage.setItem('esAlumno','true');
            this.navController.navigateRoot('menu-alumno'); 
          }
          if(obj.tipoUsuario=='profesor'){
            localStorage.setItem('esProfesor','true')
            this.navController.navigateRoot('menu-profesor');      
          }       
        }
       
      }
      if(a==0){
        this.alertMsg();
      }
    })
    

  }
  
  async alertMsg(){
    const alert = await this.alertController.create({
      header: 'Error...',
      message: 'Los datos ingresados son incorrectos',
      buttons: ['Aceptar']
    })
    await alert.present();
    return;
  }

}
