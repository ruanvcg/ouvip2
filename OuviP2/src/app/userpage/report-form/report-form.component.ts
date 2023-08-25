import { NONE_TYPE } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudReportService } from 'src/app/services/crud-report.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {
  auth: any;
  constructor(
    private router: Router,
    private crudReportService: CrudReportService
  ){}

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenUser');

    if (!this.auth || this.auth == undefined || this.auth == null || this.auth == NONE_TYPE) {
      this.router.navigate(['/login']);
    }
  }
}
