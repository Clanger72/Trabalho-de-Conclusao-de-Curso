export interface IRegisterUser{
    codClient: number;
    firstName: string;
    password: string;
}

export class RegisterUser implements IRegisterUser {
    codClient: number;
    firstName: string;
    password: string;

    get $codClient(): number{
        return this.codClient;
    }
    get $firstName(): string{
        return this.firstName;
    }
    get $password(): string{
        return this.password;
    }
    
    set $codClient(codClient: number){
         this.codClient = codClient;
    }
    set $firstName(firstName: string){
        this.firstName = firstName;
   }
    set $password(password: string){
        this.password = password;
    }

}
