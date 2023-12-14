import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    { title:'Principal', url:'/main/clprins', icon: 'home-outline'},
    { title:'Tienda', url:'/main/home', icon: 'cart-outline' },
    { title:'Perfil', url:'/main/profile', icon: 'person-outline'},
    { title:'Reserva de citas', url:'/main/clreserva', icon: 'calendar-outline'}
  ]

  router = inject(Router);
  firebaseSbc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  currentPath: string = '';

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if(event?.url) this.currentPath = event.url;
    })
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  // ==== Cerrar Sesion ====
  signOut(){
    this.firebaseSbc.signOut();

  }

}
