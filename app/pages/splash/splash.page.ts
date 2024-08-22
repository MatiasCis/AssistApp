import { Component, OnInit } from '@angular/core';
import { Router }from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router:Router,private menuController: MenuController) { }

  ngOnInit() {
    setTimeout(()=>{
      this.router.navigateByUrl('login');
    },2700);

    this.menuController.swipeGesture(false,'second');
    this.menuController.swipeGesture(false,'first');
  }

  ir(){
    this.router.navigateByUrl('login')
  }
}
