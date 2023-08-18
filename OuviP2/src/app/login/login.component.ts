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

  ngOnInit(): void {}

  postdata() {
    if (this.loginInProgress) {
      return; // Avoid multiple login attempts
    }

    const email = this.angForm.value.email;
    const senha = this.angForm.value.senha;

    this.loginInProgress = true;

    this.dataService.adminlogin(email, senha)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (data.message === 'admin success') {
            this.router.navigate(['/adminpage']);
          }
          this.loginInProgress = false;
        },
        error => {
          if (error.status !== 403) {
            this.dataService.userlogin(email, senha)
              .pipe(first())
              .subscribe(
                userData => {
                  console.log(userData);
                  if (userData.message === 'user success') {
                    this.router.navigate(['/userpage']);
                  }
                  this.loginInProgress = false;
                },
                userError => {
                  alert("Email ou Senha incorretos!");
                  this.loginInProgress = false;
                }
              );
          } else {
            this.loginInProgress = false;
          }
        }
      );
  }
}
