import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  loginInProgress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  postdata() {
    if (this.loginInProgress) {
      return; // Evitar múltiplas tentativas de login
    }

    const email = this.angForm.value.email;
    const senha = this.angForm.value.senha;

    this.loginInProgress = true;

    this.dataService.userlogin(email, senha)
      .pipe(first())
      .subscribe(
        response => {
          if (response.success) {
            this.router.navigate(['/userpage']);
          } else {
            this.dataService.adminlogin(email, senha)
              .pipe(first())
              .subscribe(
                adminResponse => {
                  if (adminResponse.success) {
                    this.router.navigate(['/adminpage']);
                  } else {
                    alert(adminResponse.message);
                    this.loginInProgress = false;
                  }
                },
                error => {
                  alert('Ocorreu um erro ao fazer login como administrador');
                  this.loginInProgress = false;
                }
              );
          }
        },
        userError => {
          alert('Ocorreu um erro ao fazer login como usuário');
          this.loginInProgress = false;
        }
      );
  }

}
