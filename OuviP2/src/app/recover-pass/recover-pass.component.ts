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
  codeSent: boolean = false;
  code?: string;

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
            this.codeSent = true;
            this.code = response.code;
            alert('Código de verificação enviado via e-mail com sucesso!');
          } else {
            alert(`Erro: ${response.message}`);
            this.recoveryInProgress = false;
          }
        },
        (error) => {
          console.error('Erro na solicitação de redefinição de senha:', error);
          alert('Ocorreu um erro ao enviar a solicitação de redefinição de senha.');
          this.recoveryInProgress = false;
        }
      );
  }

  verifyCode() {
    let codeInput: string | null;
    do {
      codeInput = prompt('Digite o código de verificação (máximo 5 caracteres):');
      if (codeInput == null || codeInput.length < 5) {
        alert('O código de verificação deve ter no máximo 5 caracteres!');
        codeInput = null;
      }
    } while (codeInput === null);
  
    const email = this.recoveryForm.value.email;
  
    this.apiService.verifyCode(email, codeInput)
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.router.navigate(['recover-pass/redefine-pass'], { queryParams: { email: email } });
          } else {
            alert(`Erro: ${response.message}`);
          }
        },
        (error) => {
          console.error('Erro na verificação do código:', error);
          alert('Ocorreu um erro ao verificar o código de verificação.');
        }
      );
  }
}