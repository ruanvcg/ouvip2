import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudReportService {
  baseUrl: string = "https://ruanads.alwaysdata.net/report/"; // Base URL for the API

  constructor(private httpClient: HttpClient) { }

  public loadPendingReports() {
    const url = this.baseUrl + 'view_pending_reports.php';
    return this.httpClient.get<any[]>(url, { observe: 'response' }).pipe(map(response => response));
  }

  public loadForwardedReports() {
    const url = this.baseUrl + 'view_forwarded_reports.php';
    return this.httpClient.get<any[]>(url, { observe: 'response' }).pipe(map(response => response));
  }

  public loadCompletedReports() {
    const url = this.baseUrl + 'view_completed_reports.php';
    return this.httpClient.get<any[]>(url, { observe: 'response' }).pipe(map(response => response));
  }

  public createReport(
    usuarioId: number,
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    tipoReporte: string,
    categoria: string,
    lat: string,
    longi: string,
    endereco: string,
    numero: number,
    bairro: string,
    referencia: string,
    descricao: string,
    statusReporte: string,
    media: File
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("usuarioId", usuarioId.toString());
    formData.append("nome", nome);
    formData.append("cpf", cpf);
    formData.append("email", email);
    formData.append("telefone", telefone);
    formData.append("tipoReporte", tipoReporte);
    formData.append("categoria", categoria);
    formData.append("lat", lat);
    formData.append("longi", longi);
    formData.append("endereco", endereco);
    formData.append("numero", numero.toString());
    formData.append("bairro", bairro);
    formData.append("referencia", referencia);
    formData.append("descricao", descricao);
    formData.append("statusReporte", statusReporte);
    formData.append("media", media);
  
    return this.httpClient.post(`${this.baseUrl}create_report.php`, formData, {
      observe: 'events',
      responseType: 'json'
    });
  }


  public getReportDetails(id: number): Observable<any> {
    const url = `${this.baseUrl}view_one_report.php?id=${id}`;
    return this.httpClient.get<any>(url).pipe(
      catchError(error => {
        console.error('Request error:', error);
        return throwError('Request error.');
      })
    );
  }

  public updateReportStatus(id: number, newStatus: string): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'update_report.php', { id, statusReporte: newStatus })
      .pipe(
        catchError(error => {
          console.error('Request error:', error);
          return throwError('Request error.');
        })
      );
  }

  public deleteReport(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}delete_report.php?id=${id}`).pipe(
      catchError(error => {
        console.error('Request error:', error);
        return throwError('Request error.');
      })
    );
  }

  public getUserReports(usuarioId: number): Observable<any[]> {
    const url = `${this.baseUrl}follow_reports.php?usuarioId=${usuarioId}`;
    return this.httpClient.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Request error:', error);
        return throwError('Request error.');
      })
    );
  }

}
