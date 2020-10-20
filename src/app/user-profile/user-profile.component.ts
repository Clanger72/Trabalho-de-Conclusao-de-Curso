import { Component, OnInit, Input } from '@angular/core';
import { RegisterUserService } from '../shared/services/register-user.service';
import { RegisterUser } from '../shared/model/register-user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  editProfile: boolean = false;
  @Input() lDependent: boolean = false;
  @Input() lEdit: boolean = false;
  errorMessage = "";
  registerUsers: RegisterUser[];
  userData:any = [];
  userUid: any;
  nomeUser: any;
  cpfUser: any;
  rgUser: any;
  dtBirthuser: any;


  constructor(private service: RegisterUserService,
              public registerUser: RegisterUser,
              private afu: AngularFireAuth
    ) { }

  async ngOnInit() {
    let user = await this.afu.currentUser;
    this.service.getUser().subscribe(data =>{
      this.registerUsers = data.map(e =>{
        const data = e.payload.doc.data() as RegisterUser;
        const id = e.payload.doc.id;
        this.userUid =  e.payload.doc.data()['id'];
        if(user.uid == this.userUid){
          this.nomeUser = e.payload.doc.data()['nome'];
          this.cpfUser = e.payload.doc.data()['cpf'];
          this.rgUser = e.payload.doc.data()['rg'];
          this.dtBirthuser = e.payload.doc.data()['dtBirth'];
          console.log(this.nomeUser);
          return { id, ...data };
        }else{
          this.nomeUser = '';
          this.cpfUser = '';
          this.rgUser = '';
          this.dtBirthuser = '';
        }

      })
    });
  }

  async salvar(registerUser: RegisterUser){
    let user = await this.afu.currentUser;
    console.log(user.email);
    registerUser = {
      id: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      nome: registerUser.nome,
      displayName: registerUser.nome,
      cpf: registerUser.cpf,
      rg: registerUser.rg,
      dtBirth: registerUser.dtBirth,
      telefone: registerUser.telefone,
      cep: registerUser.cep,
      street: registerUser.street,
      number: registerUser.number,
      city: registerUser.city,
      state: registerUser.state
    }
    this.service.updateUser(registerUser);

  }

}
