import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from '../shared/model/register-user.model';
import { RegisterUserService } from '../shared/services/user.service';
import { LoginService } from '../shared/services/login.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  password = '';
  passwordCheck: '';
  errorMessage = "";
  SuccessMessage = "";
  error: {name:string, message:string} = {name: "", message: ""};
  registerUsers = new RegisterUser;
  userData: any;
  userId: any;
  formularioDeUsuario: FormGroup;



  constructor(private router: Router,
              private loginService: LoginService,
              private registerUserService: RegisterUserService,
              private afu: AngularFireAuth,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.registerUsers = new RegisterUser;
    this.registerUsers.email = "";
    this.password = "";
    this.criarFormularioDeUsuario();
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      nome: [''],
      email: [''],
      cpf: [''],
      age: [''],
      telefone: [''],
      cep: [''],
      city: [''],
      number: [''],
      neighborhood: [''],
      street: [''],
      senha: [''],
      confirmarSenha: ['']
    });
  }

  clearErrorMessage(){
    this.errorMessage = "";
    this.SuccessMessage = "";
  }

  back(){
    this.router.navigate(['login']);
  }

  create(registerUser: RegisterUser){
    console.log('this.isValidCpf(this.registerUser)',this.isValidCpf(this.registerUsers));
    if(this.isValidCpf(this.registerUsers)){
      if(this.registerUsers.age >= "18"){
        this.clearErrorMessage();
        this.loginService.doRegister(this.registerUsers.email, this.password).then(async _res => {
          let user = await this.afu.currentUser;
          if(registerUser.cpf)
          this.registerUsers = {
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
          this.registerUserService.updateUser(this.registerUsers);

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
}
