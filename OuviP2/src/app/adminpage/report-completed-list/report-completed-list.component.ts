import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudReportService } from 'src/app/services/crud-report.service';

@Component({
  selector: 'app-report-completed-list',
  templateUrl: './report-completed-list.component.html',
  styleUrls: ['./report-completed-list.component.css']
})
export class ReportCompletedListComponent {
  auth: any;
  reportList: any = [];
  reportListSubscribe: any;

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

  getReportList() {
    this.reportListSubscribe = this.crudReportService.loadCompletedReports().subscribe(res => {
      this.reportList = res.body; // Use res.body to access the array of reports
      console.log('res', res);
    });
  }

  viewReportDetails(reportId: number) {
    console.log('Clicked report ID:', reportId);
    // Navigate to the details page, passing the report ID as a parameter
    this.router.navigate(['adminpage/report-completed-list/report-view/', reportId]);
  }
}
