import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudReportService } from 'src/app/services/crud-report.service';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent {
  auth: any;
  reportDetails: any; // Defina a variável para armazenar os detalhes do relatório

  constructor(
    private crudReportService: CrudReportService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenAdmin');

    if (!this.auth || this.auth == undefined || this.auth == null) {
      this.router.navigate(['/login']);
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    this.crudReportService.getReportDetails(id).subscribe(
      reportDetails => {
        this.reportDetails = reportDetails; // Defina reportDetails para exibir no template
      },
      error => {
        console.error('Error loading report details:', error);
      }
    );
  }
}
