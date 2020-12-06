import { Component, OnInit, Input, Output, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DependentService } from '../shared/services/dependent.service';
import { DependentData } from '../shared/model/dependent-data';
import { RegisterSignerService } from '../shared/services/register-signer.service';
import { TemplateDependent, SignatureModel } from '../shared/model/contract';
import { ContractService } from '../shared/services/contract.service';
import { DatePipe } from '@angular/common';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegisterUser } from '../shared/model/register-user.model';
import { RegisterUserService } from '../shared/services/user.service';
import { EmbedModel } from '../shared/model/signature-model';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-dependent-user',
  templateUrl: './dependent-user.component.html',
  styleUrls: ['./dependent-user.component.css']
})
export class DependentUserComponent implements OnInit {

  @Input() newDependent: boolean = false;
  @Output() dependentDatas: DependentData[];
  registerUsers: RegisterUser[];
  errorMessage = "";
  SuccessMessage = "";
  userData: any;
  userId: any;
  html_string;

  @Input() lDependent: boolean = false;
  @Input() lEdit: boolean = false;
  @Input() embed: boolean = false;

  constructor(private dependentService: DependentService,
              public dependentData: DependentData,
              public datePipe: DatePipe,
              private registerSignerService: RegisterSignerService,
              private service: RegisterUserService,
              private embedModel: EmbedModel,
              private registerUser: RegisterUser,
              private sanitizer: DomSanitizer,
              private contractService: ContractService,
              private router: Router,
              private templateDependent: TemplateDependent,
              private elRef: ElementRef,
              private cdRef: ChangeDetectorRef,
              private signatureModel: SignatureModel,
              private fireStore: AngularFirestore,
              private afu: AngularFireAuth) {
                this.afu.authState.subscribe(dep =>{
                  if(dep){
                    this.userData = dep;
                    localStorage.setItem('dependent', JSON.stringify(this.userData));
                    JSON.parse(localStorage.getItem('dependent'));
                    this.userId = this.userData.uid;
                }else{
                    localStorage.setItem('dependent', null);
                    JSON.parse(localStorage.getItem('dependent'));
                }
                })
               }

  async ngOnInit(){
    (await this.dependentService.getDependent()).subscribe(data =>{
      this.dependentDatas = data.map(e =>{
        const data = e.payload.doc.data() as DependentData;
        const id = e.payload.doc.id;

        return { id, ...data };
      })
    });
  }

  cadastro(){
    this.dependentData = new DependentData;
    this.newDependent = true;

  }

  createNewDependent(dependentData: DependentData){

    if(this.isValidCpfDep(this.dependentData)){
      dependentData = {
        uid: this.fireStore.createId(),
        uidParent: this.userId,
        nome: dependentData.nome,
        cpf: dependentData.cpf,
        telefone: dependentData.telefone,
        age: dependentData.age,
        dtBirth: this.datePipe.transform(dependentData.dtBirth, 'dd-MM-yyyy'),
        typeParent: dependentData.typeParent,
        otherContact: dependentData.otherContact,
        contact: dependentData.contact
      }
      this.dependentService.createDependent(dependentData);
      this.newDependent = false;
    }else{
      this.errorMessage = "CPF inválido!";
    }

  }

  SignerContractForDependent(dependentData: DependentData){
    this.embed = true;
    this.service.getUser().subscribe(data =>{
      data.map(e =>{
        this.registerUser = e.payload.doc.data() as RegisterUser
        if(this.registerUser.id == this.userId){
          this.embedModel = {
            email: e.payload.doc.data()["email"],
            display_name: e.payload.doc.data()["nome"],
            documentation: e.payload.doc.data()["cpf"],
            birthday: e.payload.doc.data()["dtBirth"]
          }
          this.templateDependent = {
            name_document: 'Termo de Responsabilidade Dependente Destrava',
            templates: {
              "MjM1Mzc": {
                nome: this.registerUser.nome,
                cpf: this.registerUser.cpf,
                telefone: this.registerUser.telefone,
                email: this.registerUser.email,
                dtBirth: this.registerUser.dtBirth,
                idade: this.registerUser.age,
                rua: this.registerUser.street,
                bairro: this.registerUser.neighborhood,
                number: this.registerUser.number,
                cidade: this.registerUser.city,
                estado: this.registerUser.state,
                nome_dep: dependentData.nome,
                cpf_dep: dependentData.cpf,
                parent: dependentData.typeParent,
                telefone_dep: dependentData.telefone,
                idade_dep: dependentData.age,
                dtBirth_dep: dependentData.dtBirth,
                outro: dependentData.otherContact,
                contato_dep: dependentData.contact,
              }
            }
          }
          console.log(' this.templateDependent', this.templateDependent)
          this.registerSignerService.ListTemplate();
          this.registerSignerService.createDocumentDependent(this.templateDependent).subscribe(res =>{
            console.log("Template Dependente", res);
            this.createSigner(this.registerUser.email, res);
            this.contractService.createTemplateForSigner(this.userId, data);
          })
        }
      })
    })
  }

  createSigner(email, templateResDep){
    console.log("templateRes", templateResDep.uuid, email);
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
    this.registerSignerService.createListSigner('createlist', this.signatureModel, templateResDep.uuid).subscribe( response =>{
        this.newDependent = false;
        this.embed = true;
        this.html_string = this.sanitizer.bypassSecurityTrustHtml('<input type="button" value="Voltar" class="btn btn-dark bg-secondary col-md-6">');
        this.registerSignerService.embed(this.embedModel, templateResDep.uuid);
      // this.registerSignerService.sendSigner('sendtosigner', templateResDep.uuid).subscribe(data =>{
      //   this.registerSignerService.embed(this.embedModel, templateResDep.uuid);
      // })
    })
  }

  backToList(): void{
    this.newDependent = false;
    this.embed = false;
    console.log("Entrou");
  }

  isValidCpfDep(dependentData: DependentData){
    let cpf = dependentData.cpf;
    if (cpf == null) {
      return false;
    }
    if (cpf.length != 11) {
        return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
        return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
            return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
        digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
        digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
        return false;
    }
    else {
        return true;
    }
  }

}
