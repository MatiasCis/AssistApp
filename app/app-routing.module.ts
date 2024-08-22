import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AlumnoGuard } from './guards/alumno.guard';
import { IngresadoGuard } from './guards/ingresado.guard'
import { NoIngresadoGuard } from './guards/no-ingresado.guard';
import { ProfesorGuard } from './guards/profesor.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },

  {
    path: 'asist-qr',
    loadChildren: () => import('./pages/asist-qr/asist-qr.module').then(m => m.AsistQRPageModule), canActivate: [IngresadoGuard, ProfesorGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule), canActivate: [NoIngresadoGuard]
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule)
  },

  {
    path: 'datos',
    loadChildren: () => import('./pages/datos/datos.module').then(m => m.DatosPageModule), canActivate: [IngresadoGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule), canActivate: [NoIngresadoGuard]
  },
  {
    path: 'asistencia-alumno',
    loadChildren: () => import('./pages/asistencia-alumno/asistencia-alumno.module').then(m => m.AsistenciaAlumnoPageModule), canActivate: [IngresadoGuard, AlumnoGuard]
  },

  {
    path: 'feriado',
    loadChildren: () => import('./pages/feriado/feriado.module').then(m => m.FeriadoPageModule), canActivate: [IngresadoGuard]
  },
  {
    path: 'menu-alumno',
    loadChildren: () => import('./pages/menu-alumno/menu-alumno.module').then( m => m.MenuAlumnoPageModule),canActivate: [IngresadoGuard, AlumnoGuard]
  },
  {
    path: 'menu-profesor',
    loadChildren: () => import('./pages/menu-profesor/menu-profesor.module').then( m => m.MenuProfesorPageModule) ,canActivate: [IngresadoGuard, ProfesorGuard]
  },  {
    path: 'tomar-as',
    loadChildren: () => import('./pages/tomar-as/tomar-as.module').then( m => m.TomarAsPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }