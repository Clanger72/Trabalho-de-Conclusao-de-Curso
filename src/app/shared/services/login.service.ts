import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserModel } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  userData: any;

  constructor(
    public afs: AngularFirestore,
    private afu: AngularFireAuth,
    private router: Router) {
    this.afu.authState.subscribe(user =>{
        if(user){
            this.userData = user;
            localStorage.setItem('user', JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('user'));
        }else{
            localStorage.setItem('user', null);
            JSON.parse(localStorage.getItem('user'));
        }
    })
  }

  doRegister(loginEmail, loginPassword){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(loginEmail, loginPassword).then(res => {
        this.sendEmailVerification(firebase.auth().currentUser.email);
        this.SetUserData(res.user);
        resolve(res);
      },err => reject(err))
    })
  }

  async login(email: string, password: string ){
      return await this.afu.signInWithEmailAndPassword(email, password);
  }

  async sendEmailVerification(actionCodeSettings: any): Promise<void>{
    return (await this.afu.currentUser).sendEmailVerification().then(() =>{
      this.router.navigate(['VerifyEmail']);
    })
  }

  async sendPasswordResetEmail(passwordResetEmail: string){
    return await this.afu.sendPasswordResetEmail(passwordResetEmail)
    // .then(res => {
    //   window.alert('Email de redefinição de senha enviado, verifique sua caixa de entrada');
    // }).catch((error) => {
    //   window.alert(error);
    // })
  }

  get confirmation():boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  delay(ms) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  get isLoggedIn():boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user && user.emailVerified) ? true : false;
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${user.uid}`);

    const userData: UserModel = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  async logout(){
      await this.afu.signOut();
      localStorage.removeItem('user');
      localStorage.removeItem('dependent');
      this.router.navigate(['login'])
  }
}
