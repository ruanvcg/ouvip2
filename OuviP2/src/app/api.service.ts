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
        ).pipe(map(Users => {
            //console.log(Users.email);
            this.setToken(Users.email);
            //this.getLoggeddInName.emit(true);
            return Users;
        }));
    }

    setToken(token: string){
        localStorage.setItem('token', token);
    }
}