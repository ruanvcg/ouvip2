

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.css']
})
export class RecoverPassComponent {
  recoveryForm: FormGroup;
  recoveryInProgress: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  requestPasswordReset() {
    const emailControl = this.recoveryForm.get('email');

    console.log('Valor do email:', emailControl?.value);

    if (emailControl?.invalid) {
      if (emailControl?.hasError('required')) {
        alert("Preencha o campo email.");
      } else if (emailControl?.hasError('email')) {
        alert("Por favor, informe um email válido.");
      }
      return;
    }

    if (this.recoveryInProgress) {
      return;
    }

    const email = this.recoveryForm.value.email;
    this.recoveryInProgress = true;

    this.apiService.requestPasswordReset(email)
      .subscribe(
        (response: any) => {
          if (response.success) {
            alert(response.message);
            this.router.navigate(['login']); // Navigate to login page on successful registration
          } else {
            alert(`Erro: ${response.message}`);
          }
          this.recoveryInProgress = false;
        },
        (error) => {
          console.error('Erro na solicitação de redefinição de senha:', error);
          alert('Ocorreu um erro ao enviar a solicitação de redefinição de senha.');
          this.recoveryInProgress = false;
        }
      );
  }
}
