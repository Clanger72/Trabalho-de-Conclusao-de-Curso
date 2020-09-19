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

  constructor(private router: Router,
              private loginService: LoginService,
              private registerUserService: RegisterUserService,
              public registerUser: RegisterUser,
              private afu: AngularFireAuth) {
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

  create(registerUser: RegisterUser){

    this.clearErrorMessage();

    this.loginService.doRegister(this.registerUser.email, this.password).then(async _res => {
      let user = await this.afu.currentUser;

      registerUser = {
        id: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        nome: registerUser.nome,
        cpf: registerUser.cpf,
        dtBirth: registerUser.dtBirth,
        telefone: registerUser.telefone,
        cep: registerUser.cep,
        street: registerUser.street,
        number: registerUser.number,
        city: registerUser.city,
        state: registerUser.state
      }

      this.registerUserService.updateUser(registerUser);

      this.errorMessage = "";
      this.SuccessMessage = "Sua conta foi criada";

    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.SuccessMessage = "";
    })
  }
}
