import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegisterUser } from '../model/register-user.model';
import { SignatureModel } from '../model/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  authState: any = null;
  userData: any;
  userId: any;
  registerUsers: RegisterUser[];
  emailAuth: any;
  //Create all informations for firestore data base related with signature contract
  constructor(private afs: AngularFirestore,
              private afu: AngularFireAuth,
              private signatureModel: SignatureModel) {
                this.afu.authState.subscribe(auth =>{
                  this.authState = auth;
                  if(auth){
                      this.userData = auth;
                      localStorage.setItem('user', JSON.stringify(this.userData));
                      JSON.parse(localStorage.getItem('user'));
                      this.emailAuth = this.userData.email;
                  }else{
                      localStorage.setItem('user', null);
                      JSON.parse(localStorage.getItem('user'));
                  }
                })
              }

  getAllContract(id) {
    //'TjIr2ubu9sViI9NmpeXeMvoF2FM2'
      return this.afs.collection('user').doc(id).collection('template').snapshotChanges();
  }


  createTemplateForSigner(id, templateResponse){
    return new Promise<any>((resolve,reject) =>{
      this.afs.collection("user").doc(id).collection("template").add(templateResponse).then(res =>{
        resolve(res);
      }, err => reject(err));
    })
  }

  getSpecificTemplateUser(uuid){
    return this.afs.collection('user').doc(uuid).collection('template').snapshotChanges();
  }

  addSigner(id, signer){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection("user").doc(id).collection("signer").add(signer).then(res =>{
        resolve(res)
      }, err => reject(err))
    })
  }

  //When assign contract for dependent
  addSignerDependent(id, depId, signer){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection("user").doc(id).collection("dependent").doc(depId).collection("dependentSigner").add(signer).then(res =>{
        resolve(res)
      }, err => reject(err))
    })
  }

  delay(ms) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
