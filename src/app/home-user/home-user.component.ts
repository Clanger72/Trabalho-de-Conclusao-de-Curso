import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { RegisterUserService } from '../shared/services/user.service';
import { RegisterUser } from '../shared/model/register-user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { SendSegnerService } from '../shared/services/send-segner.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';




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

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef; files = ['C:\termoTest1.pdf'];

  constructor(private loginService: LoginService,
              private service: RegisterUserService,
              private afu: AngularFireAuth,
              private sendSegnerService: SendSegnerService)  {
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
        if(id === this.userId){
          this.userName = e.payload.doc.data()["nome"];
        }
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
