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

  public loadPendingReports(){
    const url = this.baseUrl + 'view_pending_reports.php';
    return this.httpClient.get<any[]>(url, { observe: 'response' }).pipe(map(response => response));
  }

  public loadForwardedReports(){
    const url = this.baseUrl + 'view_forwarded_reports.php';
    return this.httpClient.get<any[]>(url, { observe: 'response' }).pipe(map(response => response));
  }

  public loadCompletedReports(){
    const url = this.baseUrl + 'view_completed_reports.php';
    return this.httpClient.get<any[]>(url, { observe: 'response' }).pipe(map(response => response));
  }

  // Method for user registration
  public createReport(
    usuarioId: number,
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    tipoReporte: string,
    categoria: string,
    endereco: string,
    numero: number,
    bairro: string,
    referencia: string,
    descricao: string,
    statusReporte: string
  ): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'create_report.php',
      { usuarioId, nome, cpf, email, telefone, tipoReporte, categoria, endereco, numero, bairro, referencia, descricao, statusReporte } // Sending registration data
    ).pipe(
      map(response => {
        if (response.message === 'success') {
          return { success: true, message: 'Reporte enviado com sucesso.' };
        } else {
          return { success: false, message: 'Erro ao enviar o reporte' };
        }
      }),
      catchError(error => {
        console.error('Request error:', error);
        return throwError('Request error.');
      })
    );
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
