import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  postdata(angForm: any) {
    this.dataService.userregistration(
      angForm.value.nome,
      angForm.value.cpf,
      angForm.value.email,
      angForm.value.telefone,
      angForm.value.senha
    ).pipe(first()).subscribe(data => {
      this.router.navigate(['login'])
    },
      error => {

      });
  }
}
