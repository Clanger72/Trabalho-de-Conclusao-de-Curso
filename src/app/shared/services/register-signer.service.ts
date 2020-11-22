import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { d4sign } from '../../d4sign/d4sign.js';
import { SignatureModel, SendContract } from '../model/contract';
import { ContractService } from '../services/contract.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegisterUser } from '../model/register-user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterSignerService {
  //apiUrl = '/api/v1/documents/8fff9202-4c3f-4964-a73a-ebf352ffb6e0/';
  apiKey = '?tokenAPI=live_14b91e51ea4fe3b6f9420f5a6efc31bf52aecc32de080a2613d1e877508b2a01';
  //live_e3fd7b803cae4546cf4d1395ccca277ea2daa025910425818fd79f6c6c3caac6';
  cript = '&cryptKey=live_crypt_evFXSNxibRujwlq50TMpktKqfTcQPzy1';
  //live_crypt_wCpPa3DDNgR7vBnh8yWsgwvZdD9ZO5nD';

  registerUsers: RegisterUser[];
  userData: any;
  userId: any;
  errorMessage = "";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private httpClient: HttpClient,
              private signatureModel: SignatureModel,
              private sendContract: SendContract,
              private contractService: ContractService,
              private afu: AngularFireAuth,) {}

  //Create document for the responsible
  createDocument(templateData): Observable<any>{
    let template = '/api/v1/documents/c9cf8e5e-c83c-4e20-ba8e-4577b40719e4/makedocumentbytemplate'
    let url = `${template}${this.apiKey}${this.cript}`;
    return this.httpClient.post(url, templateData);
  }

  createDocumentDependent(dependentData): Observable<any>{
    let template = '/api/v1/documents/c9cf8e5e-c83c-4e20-ba8e-4577b40719e4/makedocumentbytemplate'
    let url = `${template}${this.apiKey}${this.cript}`;
    return this.httpClient.post(url, dependentData);
  }

  createListSigner(documents: string, signatureModel, uuid){
    //ducuments=createlist
    let urlSigner = '/api/v1/documents/';
    let url = `${urlSigner}${uuid}/${documents}${this.apiKey}${this.cript}`;
    return this.httpClient.post(url, signatureModel);
  }

  sendSigner(documents: string, uuid){
    //ducuments=sendtosigner
    let urlSend = '/api/v1/documents/';
    let url = `${urlSend}${uuid}/${documents}${this.apiKey}${this.cript}`;
    this.sendContract = {
      skip_email: "1",
      workflow: "0"
    }
    return this.httpClient.post(url, this.sendContract);
  }

  embed(signerModel, uuid){
    d4sign.configure({
      container: "signature-div",
      key: uuid,
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

  ListDocs(documents: string){
    //ducuments=status
    let safes = '/api/v1/documents/04/'
    let url = `${safes}${documents}${this.apiKey}${this.cript}&pg=2`;
    return this.httpClient.get(url);
    // .subscribe(res => {
    //   console.log("status", res);
    // });
  }

  //Listing documento específico
  ListSpecificDocs(uuid){
    let docs = '/api/v1/documents/'
    let url = `${docs}${uuid}${this.apiKey}${this.cript}`;
    this.httpClient.get(url).subscribe(res => {
      console.log("Documento especifico", res);
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
}
