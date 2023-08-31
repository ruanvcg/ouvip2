import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit{

  auth: any;
  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenAdmin');

    if (!this.auth || this.auth == undefined || this.auth == null) {
      this.router.navigate(['/login']);
    }
  }

  navigateToPendingReports(): void {
    this.router.navigate(['/adminpage/report-pending-list']);
  }

  navigateToForwardedReports(): void {
    this.router.navigate(['/adminpage/report-forwarded-list']);
  }

  navigateToCompletedReports(): void {
    this.router.navigate(['/adminpage/report-completed-list']);
  }

}
