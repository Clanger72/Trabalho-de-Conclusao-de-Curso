import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUser } from '../shared/model/register-user.model';
import { RegisterUserService } from '../shared/services/register-user.service';
import { LoginService } from '../shared/services/login.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  password: string;
  passwordCheck: string;
  errorMessage = "";
  SuccessMessage = "";
  error: {name:string, message:string} = {name: "", message: ""};
  registerUsers: RegisterUser[];
  userData: any;
  userId: any;

  constructor(private router: Router,
              private loginService: LoginService,
              private registerUserService: RegisterUserService,
              public registerUser: RegisterUser,
              private afu: AngularFireAuth) {
                this.afu.authState.subscribe((auth =>{
                  if(auth){
                    this.userData = auth;
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    JSON.parse(localStorage.getItem('user'));
                    this.userId = this.userData.uid;
                }else{
                    localStorage.setItem('user', null);
                    JSON.parse(localStorage.getItem('user'));
                }
                }))
               }

  ngOnInit() {
    this.registerUserService.getUser().subscribe(data =>{
      this.registerUsers = data.map(e =>{
        const data = e.payload.doc.data() as RegisterUser;
        const id = e.payload.doc.id;
        return { id, ...data };
      })
    });
  }

  clearErrorMessage(){
    this.errorMessage = "";
    this.SuccessMessage = "";
  }

  back(){
    this.router.navigate(['login']);
  }

  isValidCpf(registerUser: RegisterUser){
    let cpf = registerUser.cpf;
    if (cpf == null) {
      return false;
    }
    if (cpf.length != 11) {
        return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
        return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
            return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
        digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
        digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
        return false;
    }
    else {
        return true;
    }
  }

  create(registerUser: RegisterUser){
    if(this.isValidCpf(this.registerUser)){
      if(this.registerUser.age >= "18"){
        this.clearErrorMessage();
        this.loginService.doRegister(this.registerUser.email, this.password).then(async _res => {
          let user = await this.afu.currentUser;
          if(registerUser.cpf)
          registerUser = {
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: registerUser.nome,
            nome: registerUser.nome,
            age: registerUser.age,
            cpf: registerUser.cpf,
            dtBirth: registerUser.dtBirth,
            telefone: registerUser.telefone,
            cep: registerUser.cep,
            neighborhood: registerUser.neighborhood,
            street: registerUser.street,
            number: registerUser.number,
            city: registerUser.city,
            state: registerUser.state
          }
          this.registerUserService.updateUser(registerUser);

          this.errorMessage = "";
          this.SuccessMessage = "Sua conta foi criada";

        }, err => {
          this.errorMessage = err.message;
          this.SuccessMessage = "";
        })
      }else{
        console.log("Menor de idade");
        this.errorMessage = "Menores de 18 anos devem solicitar que seu pai, mãe ou responsável legal se cadastre!!"
      }
    }else{
      console.log("invalido")
      this.errorMessage = "CPF inválido, confira o número digitado!"
    }

  }
}
