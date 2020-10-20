import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DependentData } from '../model/dependent-data';
import { auth, User } from 'firebase';
import { Observable } from 'rxjs';
import { DependentUserComponent } from 'src/app/dependent-user/dependent-user.component';

@Injectable({
  providedIn: 'root'
})
export class DependentService {

  userData: any;

  constructor(public afs: AngularFirestore,
              private afu: AngularFireAuth,
              private router: Router) {
                this.afu.authState.subscribe((auth =>{
                  if(auth){
                    this.userData = auth;
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    JSON.parse(localStorage.getItem('user'));
                    console.log("0", this.userData.uid);
                }else{
                    localStorage.setItem('user', null);
                    JSON.parse(localStorage.getItem('user'));
                }
                }))
              }

  getDependent(){
    this.delay(300);
    return this.afs.collection('user').doc(this.userData.uid).collection("dependent").snapshotChanges();
  }

  delay(ms) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async createDependent(dependentData){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection("user").doc(this.userData.uid)
          .collection("dependent")
          .add(dependentData)
          .then(res => {
            resolve(res)
            },err => reject(err)
          )
   })
  }

  updateDependet(dependentData: DependentData){
    this.afs.doc(`dependent/${dependentData.uid}`).update(dependentData);
  }

  deleteDependent(registerUserId: string){
    this.afs.doc('dependent/' + registerUserId).delete();
  }

}
