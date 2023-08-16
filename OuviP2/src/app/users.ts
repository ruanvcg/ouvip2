export class Users{

    public id: number;
    public nome: string;
    public cpf: string;
    public email: string;
    public telefone: string;
    public senha: string;

    constructor(
        id: number, 
        nome: string, 
        cpf: string, 
        email: string, 
        telefone: string, 
        senha: string
    ){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
    }
}