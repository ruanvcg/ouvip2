import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudReportService } from 'src/app/services/crud-report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css', '../../userpage/report-follow/report-follow.component.css']
})
export class ReportPendingListComponent implements OnInit {
  auth: any;

  filteredReports: any[] = []; 
  reportList: any = [];
  useFilteredReports: boolean = false;


  reportListSubscribe: any;

  public searchText: string = '';
  public isLoading: boolean = true;

  constructor(
    private crudReportService: CrudReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenAdmin');

    if (!this.auth || this.auth == undefined || this.auth == null) {
      this.router.navigate(['/login']);
    }

    this.getReportList();
  }


  filterReports() {
    if (this.searchText) {
      // Filtrar os relatórios com base no searchText sem alterar a capitalização
      this.filteredReports = this.reportList.filter((report: any) => {
        return (
          report.nome.includes(this.searchText) ||
          report.tipoReporte.includes(this.searchText) ||
          report.categoria.includes(this.searchText)
        );
      });
      this.useFilteredReports = true; // Usar os relatórios filtrados
    } else {
      this.useFilteredReports = false; // Usar todos os relatórios
    }
  }

  getReportList() {
    this.reportListSubscribe = this.crudReportService.loadPendingReports().subscribe(res => {
      this.reportList = res.body;
      this.filteredReports = this.reportList; // Inicialmente, os dados filtrados são iguais aos dados brutos
      this.isLoading = false;
    });
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

  viewReportDetails(reportId: number) {
    console.log('Clicked report ID:', reportId);
    // Navigate to the details page, passing the report ID as a parameter
    this.router.navigate(['adminpage/report-pending-list/report-view/', reportId]);
  }
}