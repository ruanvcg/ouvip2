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
}