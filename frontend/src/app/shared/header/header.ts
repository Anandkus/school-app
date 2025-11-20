import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private authService: Auth) { }

  logout() {
    this.authService.logOut();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
