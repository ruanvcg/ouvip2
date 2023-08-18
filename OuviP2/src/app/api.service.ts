import { Injectable, Output, EventEmitter } from "@angular/core";
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Users } from './users';

@Injectable({
    providedIn: 'root'
})

export class ApiService{
    redirectUrl!: string;

    baseUrl: string = "http://localhost/OuviP2/";

    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

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
                this.getLoggedInName.emit(true);
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
                this.getLoggedInName.emit(true);
                return { success: true, message: 'Login bem-sucedido' };
            } else {
                return { success: false, message: 'Email ou senha incorretos' };
            }
        }));
    }

    isLoggedIn(){
        const userToken = this.getUserToken();
        const adminToken = this.getAdminToken();

        if(userToken != null || adminToken != null){
            return true;
        }

        return false;
    }

    setUserToken(token: string){
        localStorage.setItem('tokenUser', token);
    }
    getUserToken(){
        return localStorage.getItem('tokenUser');
    }
    deleteUserToken(){
        localStorage.removeItem('tokenUser');
    }



    setAdminToken(token: string){
        localStorage.setItem('tokenAdmin', token);
    }
    getAdminToken(){
        return localStorage.getItem('tokenAdmin');
    }
    deleteAdminToken(){
        localStorage.removeItem('tokenAdmin');
    }
}