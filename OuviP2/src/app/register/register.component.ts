import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../services/login.service';
import { cpf } from 'cpf-cnpj-validator';

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
    // Initialize the form with FormBuilder
    this.angForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(255), Validators.pattern(/^[a-zA-Z ]+$/)]], // Added maxLength validation
      cpf: ['', [Validators.required, this.validateCpf]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]], // Added maxLength validation
      telefone: ['', [Validators.required, this.validateTelefone]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]] // Added maxLength validation
    });
  }

  ngOnInit(): void {}

  // Custom validator function for CPF
  validateCpf(control: any) {
    if (cpf.isValid(control.value)) {
      return null; // Valid CPF
    } else {
      return { cpfInvalido: true }; // Invalid CPF
    }
  }

  // Custom validator function for telefone
  validateTelefone(control: FormControl) {
    const telefonePattern = /^\(\d{2}\)\d{4}-\d{4}$/;
    return telefonePattern.test(control.value) ? null : { telefoneInvalido: true };
  }

  // Handle form submission
  postdata() {
    const nomeControl = this.angForm.get('nome');
    const cpfControl = this.angForm.get('cpf');
    const emailControl = this.angForm.get('email');
    const telefoneControl = this.angForm.get('telefone');
    const senhaControl = this.angForm.get('senha');

    // Validate form fields
    if (nomeControl?.invalid) {
      alert("Porfavor, insira um nome válido.");
      return;
    }

    if (cpfControl?.invalid) {
      alert("Porfavor, informe um CPF válido. Lembre-se de usar o formato: (xxx.xxx.xxx-xx)");
      return;
    }

    if (emailControl?.invalid) {
      if (emailControl?.hasError('required')) {
        alert("O campo email é obrigatório.");
      } else if (emailControl?.hasError('email')) {
        alert("Porfavor, informe um email válido.");
      }
      return;
    }

    if (telefoneControl?.invalid) {
      alert("Informe um número de telefone válido no formato: (xx)xxxx-xxxx.");
      return;
    }

    if (senhaControl?.invalid) {
      if (senhaControl?.hasError('required')) {
        alert("O campo de Senha é obrigatório.");
      } else if (senhaControl?.hasError('minlength')) {
        alert("A sua senha deve ter no mínimo 8 caracteres.");
      }
      return;
    }

    // Submit registration data to the service
    this.dataService.userregistration(
      this.angForm.value.nome,
      this.angForm.value.cpf,
      this.angForm.value.email,
      this.angForm.value.telefone,
      this.angForm.value.senha
    ).pipe(first()).subscribe(
      data => {
        if (data.success) {
          alert(data.message);
          this.router.navigate(['login']); // Navigate to login page on successful registration
        } else {
          alert(data.message);
        }
      },
      error => {
        alert("Erro encontrado durante o registro.");
      }
    );
  }
}
