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
  ){}

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenUser');

    if (!this.auth || this.auth == undefined || this.auth == null) {
      this.router.navigate(['/login']);
    }else{
       // Set user information
      this.userIdd = this.loginService.getTokenUserId();
      this.userNamed = this.loginService.getTokenUserName();
      this.userCpfd = this.loginService.getTokenUserCpf();
      
      // Check if user information is available before creating the form
      if (this.userIdd && this.userNamed && this.userCpfd) {
        this.createReportForm(); // Call this method here
      } else {
        // Handle the case where user information is not available
        alert('Erro ao obter informações do usuário.');
      }
    }
  }

  createReportForm(){
    this.reportForm = this.formBuilder.group({
      'usuarioId': [this.userIdd, Validators.required],
      'nome': [this.userNamed, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)])],
      'cpf': [this.userCpfd, Validators.required],
      'tipoReporte': ['', Validators.compose([Validators.required, Validators.maxLength(100),Validators.pattern(/^[a-zA-Z ]+$/)])],
      'categoria': ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z ]+$/)])],
      'descricao': ['', Validators.compose([Validators.required, Validators.maxLength(3000)])],
      'endereco': ['', Validators.compose([Validators.required, Validators.maxLength(150)])],
      'numero': ['', Validators.maxLength(999)],
      'statusReporte': ['Encaminhado']
    });
  }

  // Handle form submission
  postdata(values:any) {
    let formData = new FormData();

    formData.append('usuarioId', values.usuarioId);
    formData.append('nome', values.nome);
    formData.append('cpf', values.cpf);
    formData.append('tipoReporte', values.tipoReporte);
    formData.append('categoria', values.categoria);
    formData.append('descricao', values.descricao);
    formData.append('endereco', values.endereco);
    formData.append('numero', values.numero);
    formData.append('statusReporte', values.statusReporte);

    // Log all values in formData
    formData.forEach((value, key) => {
      console.log(`Key: ${key}, Value: ${value}`);
    });

    this.crudReportService.createReport(formData).subscribe(
      response => {
        if (response && (response.message === 'success' || response === 'success')) {
          // Redirect to userpage on success
          this.router.navigate(['/userpage']);
        } else {
          // Handle failure
          alert('Falha ao criar o relatório.');
        }
      },
      error => {
        // Handle error
        alert('Erro ao se comunicar com o servidor.');
      }
    );
  }
}
