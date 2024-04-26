import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/login.service';

@Component({
  selector: 'app-redefine-pass',
  templateUrl: './redefine-pass.component.html',
  styleUrls: ['./redefine-pass.component.css']
})
export class RedefinePassComponent {
  recoveryForm: FormGroup;
  email: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.recoveryForm = this.fb.group({
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      confirmSenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]]
    });

    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  postdata() {
    if (this.recoveryForm.invalid) {
      return;
    }

    const senha = this.recoveryForm.value.senha;
    const confirmSenha = this.recoveryForm.value.confirmSenha;

    if (senha !== confirmSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    this.apiService.redefineSenha(this.email, senha)
      .subscribe(
        (response: any) => {
          if (response.success) {
            alert('Senha redefinida com sucesso.');
            this.router.navigate(['login']);
          } else {
            alert(`Erro: ${response.message}`);
          }
        },
        (error) => {
          console.error('Erro na redefinição de senha:', error);
          alert('Ocorreu um erro ao redefinir a senha.');
        }
      );
  }
}
