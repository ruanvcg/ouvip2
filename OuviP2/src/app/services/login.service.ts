import { Injectable, Output, EventEmitter } from "@angular/core";
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  redirectUrl!: string;
  baseUrl: string = "https://ruanads.alwaysdata.net"; // Base URL for the API

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter(); // Event emitter for indicating logged-in status

  constructor(private httpClient: HttpClient) { }

  // Method for user registration
  public userregistration(
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    senha: string
  ): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/register.php',
      { nome, cpf, email, telefone, senha } // Sending registration data
    ).pipe(
      map(response => {
        if (response.message === 'success') {
          return { success: true, message: 'Usuário registrado com sucesso.' };
        } else {
          return { success: false, message: 'Erro ao registrar usuário. Verifique se já existe um usuário cadastrado com o CPF ou Email fornecido.' };
        }
      }),
      catchError(error => {
        console.error('Request error:', error);
        return throwError('Request error.');
      })
    );
  }

  // Method for user login
  public userlogin(email: string, senha: string) {
    return this.httpClient.post<any>(
      this.baseUrl + '/login.php', { email, senha } // Sending login credentials
    ).pipe(map(response => {
      if (response.message === 'user success') {
        this.setUserToken(response.email); // Set user token in session storage
        this.setUserInfo(response.nome, response.cpf, response.telefone, response.id);
        this.getLoggedInName.emit(true); // Emit event indicating user is logged in
        return { success: true, message: 'Login realizado com sucesso.' };
      } else {
        return { success: false, message: 'Email ou senha incorretos!' };
      }
    }));
  }

  // Method for admin login
  public adminlogin(email: string, senha: string) {
    return this.httpClient.post<any>(
      this.baseUrl + '/login.php', { email, senha } // Sending admin login credentials
    ).pipe(map(response => {
      if (response.message === 'admin success') {
        this.setAdminToken(response.email); // Set admin token in session storage
        this.getLoggedInName.emit(true); // Emit event indicating admin is logged in
        return { success: true, message: 'Login realizado com sucesso.' };
      } else {
        return { success: false, message: 'Email ou senha incorretos!' };
      }
    }));
  }


  // Method to check if user or admin is logged in
  isLoggedIn() {
    const userToken = this.getUserToken(); // Get user token from session storage
    const adminToken = this.getAdminToken(); // Get admin token from session storage

    if (userToken != null || adminToken != null) {
      return true; // User or admin is logged in
    }

    return false; // Neither user nor admin is logged in
  }

  public requestPasswordReset(email: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/recover-pass.php`, { email }).pipe(
      catchError(error => {
        console.error('Request error:', error);
        return throwError('Request error.');
      })
    );
  }

  public verifyCode(email: string, code: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/recover-pass.php`, { email, code }).pipe(
      catchError(error => {
        console.error('Request error:', error);
        return throwError('Request error.');
      })
    );
  }

  public redefineSenha(email: string, senha: string): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/redefine-pass.php', { email, senha, confirmSenha: senha }).pipe(
      catchError(error => {
        console.error('Request error:', error);
        return throwError('Request error.');
      })
    );
  }

  // Method to set user token in session storage
  setUserToken(token: string) {
    sessionStorage.setItem('tokenUser', token);
  }

  setUserInfo(tokenUserName: string, tokenUserCpf: string, tokenUserPhone: string, tokenUserId: string) {
    sessionStorage.setItem('tokenUserName', tokenUserName);
    sessionStorage.setItem('tokenUserCpf', tokenUserCpf);
    sessionStorage.setItem('tokenUserPhone', tokenUserPhone);
    sessionStorage.setItem('tokenUserId', tokenUserId)
  }
  getTokenUserName() {
    console.log(sessionStorage.getItem('tokenUserName'));
    return sessionStorage.getItem('tokenUserName');
  }
  getTokenUserId() {
    console.log(sessionStorage.getItem('tokenUserId'));
    return sessionStorage.getItem('tokenUserId');

  }
  getTokenUserCpf() {
    console.log(sessionStorage.getItem('tokenUserCpf'));
    return sessionStorage.getItem('tokenUserCpf');
  }
  getTokenUserPhone() {
    console.log(sessionStorage.getItem('tokenUserPhone'));
    return sessionStorage.getItem('tokenUserPhone');
  }
  // Method to get user token from session storage
  getUserToken() {
    return sessionStorage.getItem('tokenUser');
  }

  // Method to delete user token from session storage
  deleteUserToken() {
    sessionStorage.removeItem('tokenUser');
  }
  deleteTokenUserName() {
    sessionStorage.removeItem('tokenUserName');
  }
  deleteTokenUserCpf() {
    sessionStorage.removeItem('tokenUserCpf');
  }
  deleteTokenUserPhone() {
    sessionStorage.removeItem('tokenUserPhone');
  }
  deleteTokenUserId() {
    sessionStorage.removeItem('tokenUserId');
  }

  // Method to set admin token in session storage
  setAdminToken(token: string) {
    sessionStorage.setItem('tokenAdmin', token);
  }

  // Method to get admin token from session storage
  getAdminToken() {
    return sessionStorage.getItem('tokenAdmin');
  }

  // Method to delete admin token from session storage
  deleteAdminToken() {
    sessionStorage.removeItem('tokenAdmin');
  }
}
