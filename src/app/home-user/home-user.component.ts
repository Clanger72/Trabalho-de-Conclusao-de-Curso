import { Component, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import { RegisterUserService } from '../shared/services/register-user.service';
import { RegisterUser } from '../shared/model/register-user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  @Output() createDependent: boolean = false;
  @Output() editProfile: boolean = false;
  userName: string;
  registerUsers: RegisterUser[];

  constructor(private loginService: LoginService,
              private router: Router,
              private service: RegisterUserService,
              private afu: AngularFireAuth,
              private angularFirestore: AngularFirestore)  { }

 ngOnInit() {
    this.service.getUser().subscribe(data =>{
      this.registerUsers = data.map(e =>{
        const data = e.payload.doc.data() as RegisterUser;
        const id = e.payload.doc.id;
        this.userName =  e.payload.doc.data()['nome'];
        return { id, ...data };
      })
    });
  }

  dependent(): void{
    this.createDependent = true;
    this.editProfile = false
  }

  userProfile(): void{
    this.editProfile = true;
    this.createDependent = false;
  }

  logout(){
    this.loginService.logout();
  }

}
