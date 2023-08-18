import { Injectable, Output, EventEmitter } from "@angular/core";
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Users } from './users';

@Injectable({
    providedIn: 'root'
})

export class ApiService{

    baseUrl: string = "http://localhost/OuviP2/"

    constructor(private httpClient: HttpClient){}

    public userregistration(
        nome: string, 
        cpf: string, 
        email: string, 
        telefone: string, 
        senha: string
    ){
        return this.httpClient.post<any>(this.baseUrl + '/register.php', 
        {
            nome, cpf, email, telefone, senha
        }
        ).pipe(map(Users => {
            return Users;
        }));
    }

    public userlogin(email: string, senha: string){
        // alert(email);
        return this.httpClient.post<any>(
            this.baseUrl + '/login.php', { email, senha }
        ).pipe(map(response => {
            if (response.message === 'user success') {
                this.setUserToken(response.email);
                return { success: true, message: 'Login bem-sucedido' };
            } else {
                return { success: false, message: 'Email ou senha incorretos' };
            }
        }));
    }

    public adminlogin(email: string, senha: string){
        // alert(email);
        return this.httpClient.post<any>(
            this.baseUrl + '/login.php', { email, senha }
        ).pipe(map(response => {
            if (response.message === 'admin success') {
                this.setAdminToken(response.email);
                return { success: true, message: 'Login bem-sucedido' };
            } else {
                return { success: false, message: 'Email ou senha incorretos' };
            }
        }));
    }

    setUserToken(token: string){
        localStorage.setItem('tokenUser', token);
    }

    setAdminToken(token: string){
        localStorage.setItem('tokenAdmin', token);
    }
}