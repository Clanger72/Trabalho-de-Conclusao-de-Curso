import { Component, OnInit, Input } from '@angular/core';
import { DependentService } from '../shared/services/dependent.service';
import { DependentData } from '../shared/model/dependent-data';
import { RegisterSignerService } from '../shared/services/register-signer.service';
import { TemplateDependent } from '../shared/model/contract';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dependent-user',
  templateUrl: './dependent-user.component.html',
  styleUrls: ['./dependent-user.component.css']
})
export class DependentUserComponent implements OnInit {

  newDependent: boolean = false;
  dependentDatas: DependentData[];
  userData: any;
  userId: any;

  @Input() lDependent: boolean = false;
  @Input() lEdit: boolean = false;

  constructor(private dependentService: DependentService,
              public dependentData: DependentData,
              private registerSignerService: RegisterSignerService,
              private templateDependent: TemplateDependent,
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
    this.newDependent = true;
  }

  createNewDependent(dependentData: DependentData){
     dependentData = {
      uid: this.fireStore.createId(),
      uidParent: this.userId,
      nome: dependentData.nome,
      cpf: dependentData.cpf,
      telefone: dependentData.telefone,
      dtBirth: dependentData.dtBirth,
      typeParent: dependentData.typeParent
    }
    this.dependentService.createDependent(dependentData);
    this.newDependent = false;
  }

  SignerContractForDependent(dependentData: DependentData){
    console.log(dependentData);
    //chamar assinatura
    this.templateDependent = {
      name_document: 'Termo de Responsabilidade Dependente Destrava',
      templates: {
        "MzQ4": {
          nome: '',
          cpf: '',
          telefone: '',
          email: '',
          dtBirth: '',
          idade: '',
          rua: '',
          bairro: '',
          number: '',
          cidade: '',
          estado: '',
          nome_dep: dependentData.nome,
          cpf_dep: dependentData.cpf,
          parent: dependentData.typeParent,
          telefone_dep: dependentData.telefone,
          idade_dep: dependentData.dtBirth,
          outro: '',
          contato_dep: '',
        }
      }
    }
    this.registerSignerService.createDocumentDependent(dependentData);
  }

  backToList(): void{
    this.newDependent = false;
  }

}
