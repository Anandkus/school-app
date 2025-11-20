import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Home } from './features/home/home';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,  Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'frontend';
   constructor(private authService: Auth, router: Router) {
      router.events.subscribe(() => {
        this.authService.isLoggedIn(); // this will auto-logout if expired
      });
    }
}
