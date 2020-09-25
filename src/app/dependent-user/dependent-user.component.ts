import { Component, OnInit, Input } from '@angular/core';
import { RegisterUser } from '../shared/model/register-user.model';
import { RegisterUserService } from '../shared/services/register-user.service';
import { DependentService } from '../shared/services/dependent.service';
import { DependentData } from '../shared/model/dependent-data';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dependent-user',
  templateUrl: './dependent-user.component.html',
  styleUrls: ['./dependent-user.component.css']
})
export class DependentUserComponent implements OnInit {

  newDependent: boolean = false;
  userUid: any;
  registerUsers: RegisterUser[];
  dependentDatas: DependentData[];

  @Input() lDependent: boolean = false;
  @Input() lEdit: boolean = false;

  constructor(private service: RegisterUserService,
              private dependentService: DependentService,
              public dependentData: DependentData,
              private fireStore: AngularFirestore,
              private afu: AngularFireAuth) { }

  ngOnInit(){
    this.service.getUser().subscribe(data =>{
      this.registerUsers = data.map(e =>{
        const data = e.payload.doc.data() as RegisterUser;
        const id = e.payload.doc.id;
        this.userUid =  e.payload.doc.data()['id'];
        return { id, ...data };
      })
    });

    this.dependentService.getDependent().subscribe(data =>{
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
      uidParent: this.userUid,
      nome: dependentData.nome,
      cpf: dependentData.cpf,
      telefone: dependentData.telefone,
      dtBirth: dependentData.dtBirth,
      typeParent: dependentData.typeParent
    }
    this.dependentService.createDependent(dependentData);
    this.newDependent = false;
  }

  backToList(): void{
    this.newDependent = false;
  }

}
