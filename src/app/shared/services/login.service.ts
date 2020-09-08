import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authState: any = null;
  user: User;

  constructor(
    public afs: AngularFirestore,
    private afu: AngularFireAuth, 
    private router: Router ) {
    this.afu.authState.subscribe(user =>{
        if(user){
            this.user = user;
            localStorage.setItem('user', JSON.stringify(this.user));
        }else{
            localStorage.setItem('user', null);
        }
    }) 
  }

  doRegister(loginEmail, loginPassword){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(loginEmail, loginPassword).then(res => {
        this.sendEmailVerification();
        resolve(res);
        // this.SetUserData(res.user);
      },err => reject(err))
    })
  }

  async login(email: string, password: string ){
      var result = await this.afu.signInWithEmailAndPassword(email, password)
      this.router.navigate(['home']);
  }

  async register(email: string, password: string){
      var result = await this.afu.createUserWithEmailAndPassword(email, password)
      this.router.navigate(['home']);
  }

  async sendEmailVerification(){
      await (await this.afu.currentUser).sendEmailVerification()
      this.router.navigate(['verifyEmail']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string){
    return await this.afu.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(){
      await this.afu.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['login'])
  }

  get isLoggedIn():boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? true : false;
  }
}
