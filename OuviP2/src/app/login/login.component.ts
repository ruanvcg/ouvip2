import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../services/login.service';

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
    // Initialize the form with FormBuilder
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  // Handle form submission
  postdata() {
    if (this.loginInProgress) {
      return; // Avoid multiple login attempts
    }

    const email = this.angForm.value.email;
    const senha = this.angForm.value.senha;

    this.loginInProgress = true;

    // Attempt user login first
    this.dataService.userlogin(email, senha)
      .pipe(first())
      .subscribe(
        response => {
          if (response.success) {
            this.router.navigate(['/userpage']); // Navigate to user page on successful login
          } else {
            // If user login fails, attempt admin login
            this.dataService.adminlogin(email, senha)
              .pipe(first())
              .subscribe(
                adminResponse => {
                  if (adminResponse.success) {
                    this.router.navigate(['/adminpage']); // Navigate to admin page on successful login
                  } else {
                    alert(adminResponse.message);
                    this.loginInProgress = false;
                  }
                },
                error => {
                  alert('An error occurred while logging in as an administrator');
                  this.loginInProgress = false;
                }
              );
          }
        },
        userError => {
          alert('An error occurred while logging in as a user');
          this.loginInProgress = false;
        }
      );
  }

  anonym() {
    let user = 'anonimo@gmail.com';
    let pass = 'anonimo'
    this.dataService.userlogin(user, pass)
      .pipe(first())
      .subscribe(
        response => {
          if (response.success) {
            this.router.navigate(['/anonympage']); // Navigate to user page on successful login
          } else{
            alert('Erro ao logar.');
          }
        },
        userError => {
          alert('An error occurred while logging in as a user');
          this.loginInProgress = false;
        }
      );
  }
}
