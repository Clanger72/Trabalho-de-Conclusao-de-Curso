import { Component, OnInit, Output } from '@angular/core';
import { RegisterUserService } from '../shared/services/register-user.service'
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service'
import { RegisterUser } from '../shared/model/register-user.model';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';



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
  userData: any;
  userId: any;
  userAdmin = false;

  constructor (
    private registerUserService: RegisterUserService,
    private loginService: LoginService,
    private router: Router,
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
  }

  login(){
    this.loginService.login(this.loginEmail, this.loginPassword).then(async res =>{
      this.registerUserService.getUser().subscribe(data => {
        data.map(async e => {
          const id = e.payload.doc.id;
          if(id === this.userId){
            this.userAdmin = e.payload.doc.data()['admin'];
            if(this.userAdmin == true){
              this.router.navigate(['home-admin'])
            }else{
              await this.loginService.delay(300);
              await this.loginService.isLoggedIn ? this.router.navigate(['home']) : this.router.navigate(['VerifyEmail']);
            }
          }
        })
      })
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
