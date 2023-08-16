import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ){
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      
  }

  postdata(angForm:any){
    this.dataService.userlogin(this.angForm.value.email, this.angForm.value.senha).pipe(first()).subscribe(
      data => {
        console.log(data);
        if(data.message=='success'){
          //const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/userpage';
          this.router.navigate(['/userpage']);
        }
      },
      error => {
        alert("Email ou Senha incorretos!");
      }
    );
  }
}
