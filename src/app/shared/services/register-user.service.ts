import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegisterUser } from '../model/register-user.model'

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private firestore: AngularFirestore) { }

  getUser() {
    return this.firestore.collection('user').snapshotChanges();
  }

  createUser(Record){
    return this.firestore.collection('user').add(Record);
  }

  updateUser(registerUser: RegisterUser){
    delete registerUser.id;
    this.firestore.doc('user/' + registerUser.id).update(registerUser);
  }

  deleteUser(registerUserId: string){
    this.firestore.doc('user/' + registerUserId).delete();
  }
}
