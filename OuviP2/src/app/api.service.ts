import { Injectable, Output, EventEmitter } from "@angular/core";
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  redirectUrl!: string;

  baseUrl: string = "http://localhost/OuviP2/";

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  public userregistration(
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    senha: string
  ): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/register.php',
      { nome, cpf, email, telefone, senha }
    ).pipe(
      map(response => {
        if (response.message === 'success') {
          return { success: true, message: 'Usuário registrado com sucesso.' };
        } else {
          return { success: false, message: 'Erro ao registrar usuário. Verifique se já não há um usuário cadastrado com o CPF ou Email fornecido.' };
        }
      }),
      catchError(error => {
        console.error('Erro na requisição:', error);
        return throwError('Erro na requisição.');
      })
    );
  }

  public userlogin(email: string, senha: string) {
    // alert(email);
    return this.httpClient.post<any>(
      this.baseUrl + '/login.php', { email, senha }
    ).pipe(map(response => {
      if (response.message === 'user success') {
        this.setUserToken(response.email);
        this.getLoggedInName.emit(true);
        return { success: true, message: 'Login bem-sucedido' };
      } else {
        return { success: false, message: 'Email ou senha incorretos' };
      }
    }));
  }

  public adminlogin(email: string, senha: string) {
    // alert(email);
    return this.httpClient.post<any>(
      this.baseUrl + '/login.php', { email, senha }
    ).pipe(map(response => {
      if (response.message === 'admin success') {
        this.setAdminToken(response.email);
        this.getLoggedInName.emit(true);
        return { success: true, message: 'Login bem-sucedido' };
      } else {
        return { success: false, message: 'Email ou senha incorretos' };
      }
    }));
  }

  isLoggedIn() {
    const userToken = this.getUserToken();
    const adminToken = this.getAdminToken();

    if (userToken != null || adminToken != null) {
      return true;
    }

    return false;
  }

  setUserToken(token: string) {
    sessionStorage.setItem('tokenUser', token);
  }

  getUserToken() {
    return sessionStorage.getItem('tokenUser');
  }

  deleteUserToken() {
    sessionStorage.removeItem('tokenUser');
  }

  setAdminToken(token: string) {
    sessionStorage.setItem('tokenAdmin', token);
  }

  getAdminToken() {
    return sessionStorage.getItem('tokenAdmin');
  }

  deleteAdminToken() {
    sessionStorage.removeItem('tokenAdmin');
  }
}