import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegisterUser } from '../model/register-user.model';


@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  authState: any = null;

  constructor(private firestore: AngularFirestore) {}

  getUser() {
    return this.firestore.collection('user').snapshotChanges();
  }

  updateUser(registerUser: RegisterUser){
    return this.firestore.doc(`user/${registerUser.id}`).update(registerUser);
  }
}
