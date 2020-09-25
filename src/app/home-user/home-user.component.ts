import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import { RegisterUserService } from '../shared/services/register-user.service';
import { RegisterUser } from '../shared/model/register-user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { DependentService } from '../shared/services/dependent.service';



@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit{

  @Output() createDependent: boolean = false;
  @Output() editProfile: boolean = false;
  @Output() signature: boolean = false;
  userName: string;
  registerUsers: RegisterUser[];
  userData: any;
  userId: any;

  constructor(private loginService: LoginService,
              private router: Router,
              private service: RegisterUserService,
              private afu: AngularFireAuth,)  {
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
    this.service.getUser().subscribe(data =>{
      this.registerUsers = data.map(e =>{
        const data = e.payload.doc.data() as RegisterUser;
        const id = e.payload.doc.id;
        return { id, ...data };
      })
    });
  }

  signatureContract(){
    this.signature = true;
    this.createDependent = false;
    this.editProfile = false;
  }

  dependent(): void{
    this.createDependent = true;
    this.editProfile = false;
    this.signature = false;
  }

  userProfile(): void{
    this.editProfile = true;
    this.createDependent = false;
    this.signature = false;
  }

  logout(){
    this.loginService.logout();
  }

}
