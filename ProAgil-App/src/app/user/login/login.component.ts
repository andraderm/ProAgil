import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public titulo: string = 'login';
    public model: any = {};

    constructor(
        public router: Router,
        private toastr: ToastrService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        if (localStorage.getItem('token') != null) {
            this.router.navigate(['/dashboard']);
        }
    }

    public login(): void {
        this.authService.login(this.model).subscribe(
            () => {
                this.router.navigate(['/dashboard']);
                this.toastr.success('Logado com sucesso.');
            },
            error => {
                this.toastr.error('Falha ao tentar entrar.');
            }
        );
    }
}
