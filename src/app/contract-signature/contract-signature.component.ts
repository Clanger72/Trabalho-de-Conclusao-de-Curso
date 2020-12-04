import { Component, OnInit } from '@angular/core';
import { RegisterSignerService } from '../shared/services/register-signer.service';
import { SignatureModel, Template } from '../shared/model/contract';
import { ContractService } from '../shared/services/contract.service';
import { RegisterUserService } from '../shared/services/user.service';
import { RegisterUser } from '../shared/model/register-user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { EmbedModel } from '../shared/model/signature-model';

@Component({
  selector: 'app-contract-signature',
  templateUrl: './contract-signature.component.html',
  styleUrls: ['./contract-signature.component.css']
})

export class ContractSignatureComponent implements OnInit {

  registerUsers: RegisterUser[];
  userData: any;
  userId: any;
  userEmail: string;

  constructor(private registerSigner: RegisterSignerService,
              private signatureModel: SignatureModel,
              private embedModel: EmbedModel,
              private template: Template,
              private contractService: ContractService,
              private service: RegisterUserService,
              private afu: AngularFireAuth,) {
                this.afu.authState.subscribe((auth =>{
                  if(auth){
                    this.userData = auth;
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    JSON.parse(localStorage.getItem('user'));
                    this.userId = this.userData.uid;
                }else{
                    localStorage.setItem('user', null);
                    JSON.parse(localStorage.getItem('user'));
                }
                }))
              }



  async ngOnInit() {
    this.service.getUser().subscribe(data =>{
      this.registerUsers = data.map(e =>{
        const data = e.payload.doc.data() as RegisterUser;
        const id = e.payload.doc.id;
        if(id === this.userId){
          this.userEmail = e.payload.doc.data()["email"];
          this.embedModel = {
            email: e.payload.doc.data()["email"],
            display_name: e.payload.doc.data()["nome"],
            documentation: e.payload.doc.data()["cpf"],
            birthday: e.payload.doc.data()["dtBirth"]
          }
          this.template = {
            name_document: "Termo de Responsabilidade Destrava",
            templates: {
              "MjMwMjA": {
                nome: this.embedModel.display_name,
                cpf: this.embedModel.documentation,
                telefone: e.payload.doc.data()["telefone"],
                email:  this.embedModel.email,
                dtBirth: this.embedModel.birthday,
                idade: e.payload.doc.data()["age"],
                rua: e.payload.doc.data()["street"],
                bairro: e.payload.doc.data()["neighborhood"],
                number: e.payload.doc.data()["number"],
                cidade: e.payload.doc.data()["city"],
                estado: e.payload.doc.data()["state"],
              }
            }
          }
        }
        return { id, ...data };
      })
    });
    await this.contractService.delay(300);
    this.registerSigner.ListSafes();
    this.registerSigner.ListTemplate();

    this.registerSigner.createDocument(this.template).subscribe(data =>{
      this.createSigner(this.userEmail, data);
      this.contractService.createTemplateForSigner(this.userId, data);
      //this.registerSigner.embed(this.embedModel, '');
    })
  }

  createSigner(email, templateRes){
    this.signatureModel = {
      signers : [
        {
          email: email,
          act: "1",
          foreign: "0",
          certificadoicpbr: "0",
          assinatura_presencial: "0",
          embed_methodauth: "email",
        }]
    };
    console.log(templateRes.uuid);
    this.registerSigner.createListSigner('createlist', this.signatureModel, templateRes.uuid).subscribe( response =>{
      this.registerSigner.sendSigner('sendtosigner', templateRes.uuid).subscribe(data =>{
        this.registerSigner.embed(this.embedModel, templateRes.uuid);
      })
    })
  }
}
