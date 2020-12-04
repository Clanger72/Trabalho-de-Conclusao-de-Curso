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
  apiKey = '?tokenAPI=live_b0f1e899d6dd0f5916e73b5f93de20836fd5978fb6411b6b36e2b9a4bc102ac2';
  cript = '&cryptKey=live_crypt_VZjVLPWRFsvrkV7knIdUCqPY679pUE9x';

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
              private afu: AngularFireAuth,) {
              }

  //Create document for the responsible
  createDocument(templateData): Observable<any>{
    let template = '/api/v1/documents/bf039a9c-5ec0-4a4c-91ed-0232ff33c07d/makedocumentbytemplate'
    let url = `${template}${this.apiKey}${this.cript}`;
    return this.httpClient.post(url, templateData);
  }

  createDocumentDependent(templateDependent): Observable<any>{
    console.log("templateDependent", templateDependent);
    let template = '/api/v1/documents/bf039a9c-5ec0-4a4c-91ed-0232ff33c07d/makedocumentbytemplate'
    let url = `${template}${this.apiKey}${this.cript}`;
    return this.httpClient.post(url, templateDependent);
  }

  createListSigner(documents: string, signatureModel, uuid){
    //ducuments=createlist
    let urlSigner = '/api/v1/documents/';
    let url = `${urlSigner}${uuid}/${documents}${this.apiKey}${this.cript}`;
    console.log(signatureModel);
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
    console.log("Send-signer", url);
    return this.httpClient.post(url, this.sendContract);
  }

  embed(signerModel, uuid){
    console.log('signerModel', signerModel, 'uuid', uuid);
    d4sign.configure({
      container: "signature-div",
      key: uuid,
      protocol: "https",
      host: "secure.d4sign.com.br/embed/viewblob",
      signer: signerModel,
      width: '100%',
      height: '400',
      callback: function(event) {
        if (event.data === "signed") {
          alert('ASSINADO');
        }
        if (event.data === "wrong-data") {
          this.errorMessage = "Dados Pessoais Incorretos, edite seu perfil e tente novamente!" //ou redirecionar o usuário para uma página onde poderá alterar os seus dados.
        }
      }
    });
  }

  ListDocs(documents: string){
    //ducuments=status
    let safes = '/api/v1/documents/04/'
    let url = `${safes}${documents}${this.apiKey}${this.cript}`;
    return this.httpClient.get(url);
    // .subscribe(res => {
    //   console.log("status", res);
    // });
  }

  //Listing documento específico
  ListSpecificDocs(uuid){
    let docs = '/api/v1/documents/'
    let url = `${docs}${uuid}${this.apiKey}${this.cript}`;
    return this.httpClient.get(url);
  }

  DownloadDoc(uuid){
    let docs = '/api/v1/documents/'
    let url = `${docs}${uuid}/download${this.apiKey}${this.cript}`;
    let downloadData = {
      type: "PDF",
      language: "pt"
    }
    return this.httpClient.post(url, downloadData)
  }

  //Listing template
  ListTemplate(){
    //ducuments=Template
    let template = '/api/v1/templates';
    let url = `${template}${this.apiKey}${this.cript}`;
    console.log(url);
    this.httpClient.post(url, this.httpOptions).subscribe(res => {
      console.log("Template", res);
    });
  }

  //Listing template
  ListSafes(){
    //ducuments=Template
    let safes = '/api/v1/safes';
    let url = `${safes}${this.apiKey}${this.cript}`;
    console.log(url);
    this.httpClient.get(url).subscribe(res => {
      console.log("Safes", res);
    });
  }
}
