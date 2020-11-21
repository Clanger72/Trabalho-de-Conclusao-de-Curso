import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DependentData } from '../model/dependent-data';

@Injectable({
  providedIn: 'root'
})
export class DependentService {

  userData: any;

  constructor(public afs: AngularFirestore,
              private afu: AngularFireAuth) {}

  async getDependent(){
    let user = await this.afu.currentUser;
    return this.afs.collection('user').doc(user.uid).collection("dependent").snapshotChanges();
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
