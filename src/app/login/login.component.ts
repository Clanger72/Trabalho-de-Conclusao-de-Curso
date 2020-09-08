import { Component, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { RegisterUserService } from '../shared/services/register-user.service'
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Registring: boolean = false;

  @Output() loginEmail = "";
  @Output() loginPassword = "";
  loginUser: void[];

  SuccessMessage = "";
  errorMessage = "";
  error: {name:string, message:string} = {name: "", message: ""};

  constructor (
    private registerUserService: RegisterUserService,
    private loginService: LoginService,
    private matIconRegistry: MatIconRegistry,
    private router: Router)
    {}

  ngOnInit() {
  }

  login(){
   this.loginService.login(this.loginEmail, this.loginPassword).then(res =>{
     this.router.navigate(['home']);
     this.SuccessMessage = "Logado com sucesso";
   }, err=>{
     this.router.navigate(['login']);
     this.errorMessage = err.message;
     this.SuccessMessage = "";
   })
  }
}
