export class Admins{

    public id: number;
    public email: string;
    public senha: string;

    constructor(
        id: number,
        email: string,
        senha: string
    ){
        this.id = id;
        this.email = email;
        this.senha = senha;
    }
}