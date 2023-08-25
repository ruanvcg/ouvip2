import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudReportService {
  baseUrl: string = "http://localhost/OuviP2/OuviP2/php/report/"; // Base URL for the API

  constructor(private httpClient: HttpClient) { }

  loadReports(){
    const url = this.baseUrl + 'view_reports.php';
    return this.httpClient.get(url).pipe(map(data => data))
  }
}
