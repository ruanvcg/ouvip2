import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudReportService } from 'src/app/services/crud-report.service';

@Component({
  selector: 'app-report-forwarded-list',
  templateUrl: './report-forwarded-list.component.html',
  styleUrls: ['./report-forwarded-list.component.css']
})
export class ReportForwardedListComponent implements OnInit {
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
    this.reportListSubscribe = this.crudReportService.loadForwardedReports().subscribe(res => {
      this.reportList = res.body; // Use res.body to access the array of reports
      console.log('res', res);
    });
  }

  viewReportDetails(reportId: number) {
    console.log('Clicked report ID:', reportId);
    // Navigate to the details page, passing the report ID as a parameter
    this.router.navigate(['adminpage/report-forwarded-list/report-view/', reportId]);
  }
}