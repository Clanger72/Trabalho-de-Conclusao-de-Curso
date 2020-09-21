import { Component, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { RegisterUserService } from '../shared/services/register-user.service'
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service'
import { RegisterUser } from '../shared/model/register-user.model';



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
  registerUsers: RegisterUser[];

  message = "";
  SuccessMessage = "";
  errorMessage = "";
  error: {name:string, message:string} = {name: "", message: ""};

  constructor (
    private registerUserService: RegisterUserService,
    private loginService: LoginService,
    private matIconRegistry: MatIconRegistry,
    private router: Router,
    public registerUser: RegisterUser)
    {}

  ngOnInit() {
    this.registerUserService.getUser().subscribe(data =>{
      this.registerUsers = data.map(e =>{
        const data = e.payload.doc.data() as RegisterUser;
        const id = e.payload.doc.id;
        return { id, ...data };
      })
    });
  }

  login(){
   this.loginService.login(this.loginEmail, this.loginPassword).then(async res =>{
    await this.loginService.isLoggedIn ? this.router.navigate(['home']) : this.router.navigate(['VerifyEmail']);
   }, err=>{
     this.router.navigate(['login']);
     this.errorMessage = err.message;
     this.SuccessMessage = "";
   })
  }

  ResetPassword(){
    this.loginService.sendPasswordResetEmail(this.loginEmail);
    let validSend = (this.loginEmail !== "") ? true : false;
    validSend ? this.message = "Sua senha foi enviada, verifique seu e-mail!" : this.message = "Digite seu e-mail!";
    alert(this.message);
  }
}
