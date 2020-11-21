import { Component, OnInit, Input } from '@angular/core';
import { RegisterUserService } from '../shared/services/register-user.service';
import { RegisterUser } from '../shared/model/register-user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
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

  constructor(private service: RegisterUserService,
              public registerUser: RegisterUser,
              private afu: AngularFireAuth,
              public router: Router
    ) { }

  async ngOnInit() {
    let user = await this.afu.currentUser;
    this.service.getUser().subscribe(data =>{
      this.registerUsers = data.map(e =>{
        const data = e.payload.doc.data() as RegisterUser;
        const id = e.payload.doc.id;
        this.userUid =  e.payload.doc.data()['id'];
        if(user.uid == this.userUid){
          this.registerUser = {
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            nome: e.payload.doc.data()['nome'],
            displayName: e.payload.doc.data()['nome'],
            cpf: e.payload.doc.data()['cpf'],
            rg: e.payload.doc.data()['rg'],
            dtBirth: e.payload.doc.data()['dtBirth'],
            telefone: e.payload.doc.data()['telefone'],
            cep: e.payload.doc.data()['cep'],
            neighborhood: e.payload.doc.data()['neighborhood'],
            street: e.payload.doc.data()['street'],
            number:e.payload.doc.data()['number'],
            city: e.payload.doc.data()['city'],
            state: e.payload.doc.data()['state']
          }
          return { id, ...data };
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
      neighborhood: registerUser.neighborhood,
      street: registerUser.street,
      number: registerUser.number,
      city: registerUser.city,
      state: registerUser.state
    }
    this.service.updateUser(registerUser);
  }

  routerHome(){
    this.router.navigate(['home']);
  }

}
