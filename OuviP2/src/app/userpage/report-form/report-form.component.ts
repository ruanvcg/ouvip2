import { NONE_TYPE } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {
  auth: any;
  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.auth = sessionStorage.getItem('tokenUser');

    if (!this.auth || this.auth == undefined || this.auth == null || this.auth == NONE_TYPE) {
      this.router.navigate(['/login']);
    }
  }
}
