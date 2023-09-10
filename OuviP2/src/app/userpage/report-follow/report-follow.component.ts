import { Component, OnInit } from '@angular/core';
import { CrudReportService } from 'src/app/services/crud-report.service';
import { ApiService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-follow',
  templateUrl: './report-follow.component.html',
  styleUrls: ['./report-follow.component.css']
})
export class ReportFollowComponent implements OnInit {
  auth: any;
  userReports: any[] = [];
  public isLoading: boolean = true;

  constructor(private router: Router, private crudReportService: CrudReportService, private dataService: ApiService) {}
  
  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenUser');

    if (!this.auth || this.auth == undefined || this.auth == null) {
      this.router.navigate(['/login']);
    }

    const usuarioId = this.dataService.getTokenUserId();

    if (typeof usuarioId === 'string') {
      // Converter a string para número, se necessário
      const usuarioIdNumero = parseInt(usuarioId, 10);

      // Verificar se a conversão foi bem-sucedida (não NaN)
      if (!isNaN(usuarioIdNumero)) {
        // Carregar os reportes do usuário logado
        this.crudReportService.getUserReports(usuarioIdNumero).subscribe(
          (response: any) => {
            if (response.error) {
              console.error('API returned an error:', response.error);
              // Trate o erro de acordo com suas necessidades, como redirecionar para a página de login.
            } else if (Array.isArray(response.data)) {
              this.userReports = response.data;
              this.isLoading = false;
            } else {
              console.error('API response is not in the expected format:', response);
            }
          },
          (error) => {
            console.error('Error fetching user reports:', error);
          }
        );        
      } else {
        console.error('Invalid usuarioId:', usuarioId);
      }
    } else {
      console.error('Invalid usuarioId:', usuarioId);
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Pendente':
        return '#D83131';
      case 'Encaminhado':
        return '#BBBE27';
      case 'Concluido':
        return '#49C027';
      default:
        return ''; // Cor padrão ou vazia se nenhum valor corresponder
    }
  }
  
}
