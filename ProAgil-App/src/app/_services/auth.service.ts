import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseURl = 'http://localhost:5000/api/user';
  public jwtHelper = new JwtHelperService();
  public decodedToken: any;

  constructor(private http: HttpClient) { }

  public login(model: any) {
    return this.http.post(`${this.baseURl}/login`, model).pipe(
      map((response: any) => {
        const user = response;

        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          sessionStorage.setItem('username', this.decodedToken.unique_name);
        }
      })
    );
  }

  public register(model: any) {
    return this.http.post(`${this.baseURl}/register`, model);
  }

  public loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token?.valueOf());
  }
}
