import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { d4sign } from '../../d4sign/d4sign.js';
import { SignatureModel } from '../model/contract';
import { ContractService } from '../services/contract.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegisterUser } from '../model/register-user.model';


@Injectable({
  providedIn: 'root'
})
export class RegisterSignerService {
  //apiUrl = '/api/v1/documents/8fff9202-4c3f-4964-a73a-ebf352ffb6e0/';
  apiKey = '?tokenAPI=live_e3fd7b803cae4546cf4d1395ccca277ea2daa025910425818fd79f6c6c3caac6';
  cript = '&cryptKey=live_crypt_wCpPa3DDNgR7vBnh8yWsgwvZdD9ZO5nD';

  registerUsers: RegisterUser[];
  userData: any;
  userId: any;
  userEmail: string;
  errorMessage = "";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private httpClient: HttpClient,
              private signatureModel: SignatureModel,
              private contractService: ContractService,
              private afu: AngularFireAuth,) {
                this.afu.authState.subscribe((auth =>{
                if(auth){
                  this.userData = auth;
                  localStorage.setItem('user', JSON.stringify(this.userData));
                  JSON.parse(localStorage.getItem('user'));
                  this.userId = this.userData.uid;
                  console.log("this.userId", this.userId);
              }else{
                  localStorage.setItem('user', null);
                  JSON.parse(localStorage.getItem('user'));
              }
              })) }

  //Create document for the responsible
  createDocument(templateData){
    let template = '/api/v1/documents/dd4919cf-cf05-4d3c-8c7e-759e17de4135/makedocumentbytemplate'
    let url = `${template}${this.apiKey}${this.cript}`;
    this.httpClient.post(url, templateData).subscribe(res => {
      return res
    }, err => {return err});
  }

  createListSigner(documents: string, signatureModel){
    //ducuments=createlist
    let urlSigner = '/api/v1/documents/8fff9202-4c3f-4964-a73a-ebf352ffb6e0/';
    let url = `${urlSigner}${documents}${this.apiKey}${this.cript}`;
    console.log('url: ', url);
    return this.httpClient.post(url, signatureModel).subscribe(e => {
      this.contractService.addSigner(this.userId, e);
    }, err =>{
      this.errorMessage = err.message
    });
  }

  ListSafes(documents: string){
    //ducuments=safes
    let safes = '/api/v1/'
    let url = `${safes}${documents}${this.apiKey}${this.cript}`;
    this.httpClient.get(url).subscribe(res => {
      console.log("Safes", res);
    });
  }

  //Listing template
  ListTemplate(){
    //ducuments=Template
    let template = '/api/v1/templates'
    let url = `${template}${this.apiKey}${this.cript}`;
    this.httpClient.post(url, this.httpOptions).subscribe(res => {
      console.log("Template", res);
    });
  }

  embed(signerModel){
    d4sign.configure({
      container: "signature-div",
      key: "afe6081e-b193-492f-a3b6-cde01c8e0b42",
      protocol: "http",
      host: "demo.d4sign.com.br/embed/viewblob",
      signer: signerModel,
      width: '100%',
      height: '400',
      callback: function(event) {
        if (event.data === "signed") {
          alert('ASSINADO');
        }
        if (event.data === "wrong-data") {
          alert('USUARIO CLICOU NO LINK: Meus dados estão errados.'); //ou redirecionar o usuário para uma página onde poderá alterar os seus dados.
        }
      }
  });
  }
}
