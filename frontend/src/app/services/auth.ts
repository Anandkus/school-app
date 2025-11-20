import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http: HttpClient, private router: Router) { }
  apiUrl = environment.apiUrl;

  login(data: any) {
    return this.http.post(this.apiUrl + '/auth/login', data);
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");

    if (!token || !expiresAt) {
      return false;
    }

    const now = new Date().getTime();
    const expireTime = new Date(expiresAt).getTime();

    if (now > expireTime) {
      // Token expired → log out user
      this.logOut();
      return false;
    }

    return true;
  }

  // isLoggedIn(): boolean {
  //   if (localStorage.getItem("token")) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
