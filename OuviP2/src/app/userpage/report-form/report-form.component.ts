import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { enableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { CrudReportService } from 'src/app/services/crud-report.service';
import { ApiService } from 'src/app/services/login.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {

  auth: any;
  // @ts-ignore
  reportForm: FormGroup;
  userCpfd: string | null = null; // Store user CPF here
  userNamed: string | null = null; // Store user name here
  userIdd: string | null = null; // Store user ID here

  constructor(
    private router: Router,
    private crudReportService: CrudReportService,
    private formBuilder: FormBuilder,
    private loginService: ApiService,
  ) {
    // Set user information
    this.userIdd = this.loginService.getTokenUserId();
    this.userNamed = this.loginService.getTokenUserName();
    this.userCpfd = this.loginService.getTokenUserCpf();

    this.reportForm = this.formBuilder.group({
      usuarioId: [this.userIdd],
      nome: [this.userNamed],
      cpf: [this.userCpfd],
      tipoReporte: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[\p{L} ]+$/u)]],
      categoria: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[\p{L} ]+$/u)]],
      descricao: ['', [Validators.required, Validators.maxLength(3000)]],
      endereco: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      numero: ['', [Validators.maxLength(999)]],
      statusReporte: ['Encaminhado']
    });
  }

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenUser');

    if (!this.auth || this.auth == undefined || this.auth == null) {
      this.router.navigate(['/login']);
    }
  }

  // Handle form submission
  postdata() {
    const tipoReporteControl = this.reportForm.get('tipoReporte');
    const categoriaControl = this.reportForm.get('categoria');
    const descricaoControl = this.reportForm.get('descricao');
    const enderecoControl = this.reportForm.get('endereco');
    const numeroControl = this.reportForm.get('numero');

    if(this.reportForm?.invalid){
      if(tipoReporteControl?.invalid){
        if (tipoReporteControl?.hasError('required')) {
          alert('O campo "Tipo de Reporte" é obrigatório.');
        } else if (tipoReporteControl?.hasError('maxlength')) {
          alert('O campo "Tipo de Reporte" deve ter no máximo 100 caracteres.');
        } else if (tipoReporteControl?.hasError('pattern')) {
          alert('O campo "Tipo de Reporte" deve conter apenas letras e espaços.');
        }
        return;
      }

      if(categoriaControl?.invalid){
        if (categoriaControl?.hasError('required')) {
          alert('O campo "Categoria" é obrigatório.');
        } else if (categoriaControl?.hasError('maxlength')) {
          alert('O campo "Categoria" deve ter no máximo 30 caracteres.');
        } else if (categoriaControl?.hasError('pattern')) {
          alert('O campo "Categoria" deve conter apenas letras e espaços.');
        }
        return;
      }

      if(descricaoControl?.invalid){
        if (descricaoControl?.hasError('required')) {
          alert('O campo "Descrição" é obrigatório.');
        } else if (descricaoControl?.hasError('maxlength')) {
          alert('O campo "Descrição" deve ter no máximo 3000 caracteres.');
        } 
        return;
      }
      if(enderecoControl?.invalid){
        if (enderecoControl?.hasError('required')) {
          alert('O campo "Endereço" é obrigatório.');
        } else if (enderecoControl?.hasError('maxlength')) {
          alert('O campo "Endereço" deve ter no máximo 150 caracteres.');
        } 
        return;
      }
      if(numeroControl?.invalid){
        if (numeroControl?.hasError('maxlength')) {
          alert('O campo "Endereço" deve ter no máximo 999.');
        } 
        return;
      }

      return;
    }else{
      // Submit registration data to the service
      this.crudReportService.createReport(
        this.reportForm.value.usuarioId,
        this.reportForm.value.nome,
        this.reportForm.value.cpf,
        this.reportForm.value.tipoReporte,
        this.reportForm.value.categoria,
        this.reportForm.value.endereco,
        this.reportForm.value.numero,
        this.reportForm.value.descricao,
        this.reportForm.value.statusReporte
      ).pipe(first()).subscribe(
        data => {
          if (data.success) {
            alert(data.message);
            this.router.navigate(['userpage']); // Navigate to login page on successful registration
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
}
