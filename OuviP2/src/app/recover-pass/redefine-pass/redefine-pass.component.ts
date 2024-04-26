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
    const senhaControl = this.recoveryForm.get('senha');
    const confirmSenhaControl = this.recoveryForm.get('confirmSenha');
  
    // Validate form fields
    if (senhaControl?.invalid) {
      if (senhaControl?.hasError('required')) {
        alert("O campo de Senha é obrigatório.");
      } else if (senhaControl?.hasError('minlength')) {
        alert("A sua senha deve ter no mínimo 8 caracteres.");
      }
      return;
    }
  
    if (confirmSenhaControl?.invalid) {
      if (confirmSenhaControl?.hasError('required')) {
        alert("O campo de Confirmar Senha é obrigatório.");
      } else if (confirmSenhaControl?.hasError('minlength')) {
        alert("A sua senha deve ter no mínimo 8 caracteres.");
      }
      return;
    }
  
    if (confirmSenhaControl?.value!= senhaControl?.value) {
      alert("Você deve informar a mesma senha nos campos 'Senha' e 'Confirmar senha'!");
      return;
    }
  
    // Se tudo estiver válido, envia a solicitação para redefinir a senha
    this.apiService.redefineSenha(this.email, senhaControl?.value)
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
