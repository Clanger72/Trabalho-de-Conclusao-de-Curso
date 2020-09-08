import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUser } from '../shared/model/register-user.model';
import { RegisterUserService } from '../shared/services/register-user.service';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  loggedIn: boolean = false; 
  userNome: string;
  userEmail: string;
  userTelefone: string;
  userPassword: string;
  userPasswordCheck: string;
  errorMessage = "";
  SuccessMessage = "";
  error: {name:string, message:string} = {name: "", message: ""};

  constructor(private router: Router,
              private loginService: LoginService,
              private registerUserService: RegisterUserService) {
               }

  ngOnInit() {
    
  }

  clearErrorMessage(){
    this.errorMessage = "";
    this.SuccessMessage = "";
  }

  create(){
    this.clearErrorMessage();

    this.loginService.doRegister(this.userEmail, this.userPassword).then(_res => {
        let Record = {};
        Record['name'] = this.userNome;
        Record['email'] = this.userEmail;
        Record['telefone'] = this.userTelefone;
        Record['password'] = this.userPassword;
        this.loggedIn = true;

        this.registerUserService.createUser(Record).then(_res =>{
        this.userNome = "";
        this.userEmail = "";
        this.userTelefone = "";
        this.userPassword = "";
        this.userPasswordCheck = "";
        }).catch(error =>{
          console.log(error);
        });

        this.router.navigate(['home'])
        this.errorMessage = "";
        this.SuccessMessage = "Sua conta foi criada";

    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.SuccessMessage = "";
    })
  }

  update(registerUsers: RegisterUser) {
    this.registerUserService.updateUser(registerUsers);
  }

  delete(id: string) {
    this.registerUserService.deleteUser(id);
  }

}
