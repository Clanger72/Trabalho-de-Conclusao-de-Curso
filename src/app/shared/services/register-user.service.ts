import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegisterUser } from '../model/register-user.model';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  authState: any = null;

  constructor(private firestore: AngularFirestore,
              private afu: AngularFireAuth,
              private router: Router) {
                this.afu.authState.subscribe((auth =>{
                  this.authState = auth;
                }))
    }

    registerWithEmail(email:string, password:string): any{
      this.afu.createUserWithEmailAndPassword(email, password).then((user) =>
      {
        this.authState = user;
      }).catch(error=>{
        console.log(error);
        throw error
      })
    }

  getUser() {
    return this.firestore.collection('user').snapshotChanges();
  }

  createUser(registerUser: RegisterUser){
    return this.firestore.collection('user/').add(registerUser);
  }

  updateUser(registerUser: RegisterUser){
    this.firestore.doc(`user/${registerUser.id}`).update(registerUser);
  }

  deleteUser(registerUserId: string){
    this.firestore.doc('user/' + registerUserId).delete();
  }
}
