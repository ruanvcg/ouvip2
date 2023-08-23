import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit{
  auth: any;
  constructor(
    private api: ApiService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenAdmin');

    if (!this.auth || this.auth == undefined || this.auth == null) {
      this.router.navigate(['/login']);
    }

    this.api.get_reports().subscribe(
      (res: any) => {
        console.log(res);
      }
    )
  }
}
