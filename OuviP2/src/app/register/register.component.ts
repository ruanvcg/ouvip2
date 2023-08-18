import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
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
    this.angForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, this.validateCpf]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, this.validateTelefone]],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {}

  validateCpf(control: any) {
    if (cpf.isValid(control.value)) {
      return null;
    } else {
      return { cpfInvalido: true };
    }
  }

  validateTelefone(control: FormControl) {
    const telefonePattern = /^\(\d{2}\)\d{4}-\d{4}$/;
    return telefonePattern.test(control.value) ? null : { telefoneInvalido: true };
  }

  postdata() {
    const nomeControl = this.angForm.get('nome');
    const cpfControl = this.angForm.get('cpf');
    const emailControl = this.angForm.get('email');
    const telefoneControl = this.angForm.get('telefone');
    const senhaControl = this.angForm.get('senha');

    if (nomeControl?.invalid) {
      alert("Por favor, informe um nome válido.");
      return;
    }

    if (cpfControl?.invalid) {
      alert("Por favor, informe um CPF válido. Lembre-se de utilizar o formato: (xxx.xxx.xxx-xx)");
      return;
    }

    if (emailControl?.invalid) {
      if (emailControl?.hasError('required')) {
        alert("O campo de e-mail é obrigatório.");
      } else if (emailControl?.hasError('email')) {
        alert("Por favor, informe um e-mail válido.");
      }
      return;
    }

    if (telefoneControl?.invalid) {
      alert("Por favor, informe um telefone válido no formato: (xx)xxxx-xxxx.");
      return;
    }

    if (senhaControl?.invalid) {
      if (senhaControl?.hasError('required')) {
        alert("O campo de senha é obrigatório.");
      } else if (senhaControl?.hasError('minlength')) {
        alert("A senha deve ter pelo menos 8 caracteres.");
      }
      return;
    }

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
          this.router.navigate(['login']);
        } else {
          alert(data.message);
        }
      },
      error => {
        alert("Erro ao registrar-se.");
      }
    );
  }
}
