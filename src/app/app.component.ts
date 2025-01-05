import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'interview-pass-v1';
  showNavbar: boolean = true;

  constructor(private router: Router){
    this.router.events.pipe( 
      filter(event => event instanceof NavigationEnd) 
    ).subscribe((event: NavigationEnd) => { 
      this.showNavbar = !(event.url.includes('/sign-up') || event.url === '/'); 
    }); 
  }
}
