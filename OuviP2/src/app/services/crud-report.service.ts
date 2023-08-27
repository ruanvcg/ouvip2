import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudReportService {
  baseUrl: string = "http://localhost/OuviP2/OuviP2/php/report/"; // Base URL for the API

  constructor(private httpClient: HttpClient) { }

  loadReports(){
    const url = this.baseUrl + 'view_reports.php';
    return this.httpClient.get<any[]>(url, { observe: 'response' }).pipe(map(response => response));
  }

  createReport(reportData: FormData): Observable<any> {
    const url = this.baseUrl + 'create_report.php';
    return this.httpClient.post(url, reportData).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
  
}
