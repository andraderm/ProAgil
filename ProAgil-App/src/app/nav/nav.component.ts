import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit() {
  }

  public showMenu() {
    return this.router.url !== '/user/login';
  }

  public loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.toastr.show('Logout');
    this.router.navigate(['/user/login']);
  }

  public entrar(): void {
    this.router.navigate(['user/login']);
  }

  public userName() {
    return sessionStorage.getItem('username');
  }
}
