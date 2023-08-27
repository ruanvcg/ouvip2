import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  ){
    // Set user information
    this.userIdd = this.loginService.getTokenUserId();
    this.userNamed = this.loginService.getTokenUserName();
    this.userCpfd = this.loginService.getTokenUserCpf();
    
    this.reportForm = this.formBuilder.group({
      usuarioId: [this.userIdd, Validators.required],
      nome: [this.userNamed, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)])],
      cpf: [this.userCpfd, Validators.required],
      tipoReporte: ['', Validators.compose([Validators.required, Validators.maxLength(100),Validators.pattern(/^[a-zA-Z ]+$/)])],
      categoria: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z ]+$/)])],
      descricao: ['', Validators.compose([Validators.required, Validators.maxLength(3000)])],
      endereco: ['', Validators.compose([Validators.required, Validators.maxLength(150)])],
      numero: ['', Validators.maxLength(999)],
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
  postdata(values:any) {
    const usuarioIdControl = this.reportForm.get('usuarioId');
    const nomeControl = this.reportForm.get('nome');
    const cpfControl = this.reportForm.get('cpf');
    const tipoReporteControl = this.reportForm.get('tipoReporte');
    const categoriaControl = this.reportForm.get('categoria');
    const descricaoControl = this.reportForm.get('descricao');
    const enderecoControl = this.reportForm.get('endereco');
    const numeroControl = this.reportForm.get('numero');
    const statusReporteControl = this.reportForm.get('statusReporte');

    if (tipoReporteControl?.invalid) {
      if (tipoReporteControl?.hasError('required')) {
        alert("O campo Tipo Reporte é obrigatório.");
      }
      return;
    }

    if (categoriaControl?.invalid) {
      if (categoriaControl?.hasError('required')) {
        alert("O campo Categoria é obrigatório.");
      }
      return;
    }

    if (descricaoControl?.invalid) {
      if (descricaoControl?.hasError('required')) {
        alert("O campo Categoria é obrigatório.");
      }
      return;
    }

    if (enderecoControl?.invalid) {
      if (enderecoControl?.hasError('required')) {
        alert("O campo Tipo Reporte é obrigatório.");
      }
      return;
    }

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
