import { Component, OnInit, Input } from '@angular/core';
import { DependentService } from '../shared/services/dependent.service';
import { DependentData } from '../shared/model/dependent-data';
import { RegisterSignerService } from '../shared/services/register-signer.service';
import { TemplateDependent, SignatureModel } from '../shared/model/contract';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegisterUser } from '../shared/model/register-user.model';
import { RegisterUserService } from '../shared/services/user.service';

@Component({
  selector: 'app-dependent-user',
  templateUrl: './dependent-user.component.html',
  styleUrls: ['./dependent-user.component.css']
})
export class DependentUserComponent implements OnInit {

  newDependent: boolean = false;
  dependentDatas: DependentData[];
  registerUsers: RegisterUser[];
  errorMessage = "";
  SuccessMessage = "";
  userData: any;
  userId: any;

  @Input() lDependent: boolean = false;
  @Input() lEdit: boolean = false;

  constructor(private dependentService: DependentService,
              public dependentData: DependentData,
              private registerSignerService: RegisterSignerService,
              private service: RegisterUserService,
              private registerUser: RegisterUser,
              private templateDependent: TemplateDependent,
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
        dtBirth: dependentData.dtBirth,
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
    console.log(dependentData);
    //chamar assinatura
    this.service.getUser().subscribe(data =>{
      data.map(e =>{
        this.registerUser = e.payload.doc.data() as RegisterUser
        if(this.registerUser.id == this.userId){
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
                idade_dep: dependentData.dtBirth,
                outro: dependentData.otherContact,
                contato_dep: dependentData.contact,
              }
            }
          }
          this.registerSignerService.ListTemplate();
          this.registerSignerService.createDocumentDependent(this.templateDependent).subscribe(res =>{
            console.log("Template Dependente", res);
            this.createSigner(this.registerUser.email, res);
          })
        }
      })
    })
  }

  createSigner(email, templateResDep){
    console.log("templateRes", templateResDep.uuid);
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
      // this.registerSigner.sendSigner('sendtosigner', templateRes.uuid).subscribe(data =>{
      //   this.registerSigner.embed(this.embedModel, templateRes.uuid);
      // })
    })
  }

  backToList(): void{
    this.newDependent = false;
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
