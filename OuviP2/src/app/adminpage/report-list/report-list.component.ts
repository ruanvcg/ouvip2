import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudReportService } from 'src/app/services/crud-report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})

export class ReportListComponent implements OnInit{
  
  auth: any;
  reportList: any = [];
  reportListSubscribe: any;


  constructor(
    private crudReportService: CrudReportService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenAdmin');

    if (!this.auth || this.auth == undefined || this.auth == null) {
      this.router.navigate(['/login']);
    }

    this.getReportList();
  }

  getReportList(){
    this.reportListSubscribe = this.crudReportService.loadReports().subscribe(res => {
      this.reportList = res;

      console.log('res', res);
    })
  }
}
