import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';
import { FeriadoService } from '../../service/feriado.service';


@Component({
  selector: 'app-feriado',
  templateUrl: './feriado.page.html',
  styleUrls: ['./feriado.page.scss'],
})
export class FeriadoPage implements OnInit {

  feriado: Article[] = [];

  constructor(private menuController: MenuController, private feriadoService: FeriadoService) { }


  ngOnInit() {
    this.feriadoService.getTopHeadLines().subscribe(resp => 
      {
        this.feriado = resp ;

  });
  };

  mostrarMenu(){
    if(localStorage.getItem('esAlumno')){
      this.menuController.open('first');
    }else{
      this.menuController.open('second')
    }   
  }
}
