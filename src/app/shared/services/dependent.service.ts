import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DependentData } from '../model/dependent-data';

@Injectable({
  providedIn: 'root'
})
export class DependentService {

  userData: any;

  constructor(public afs: AngularFirestore,
              private afu: AngularFireAuth,
              private router: Router) {
                this.afu.authState.subscribe(dep =>{
                  if(dep){
                      this.userData = dep;
                      localStorage.setItem('dependent', JSON.stringify(this.userData));
                      JSON.parse(localStorage.getItem('dependent'));
                  }else{
                      localStorage.setItem('dependent', null);
                      JSON.parse(localStorage.getItem('dependent'));
                  }
              })
              }

  getDependent() {
    return this.afs.collection('user').doc(this.userData.uid).collection("dependent").snapshotChanges();
  }

  async createDependent(dependentData){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection("user").doc(dependentData.uidParent)
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
