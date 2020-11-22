import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegisterUser } from '../shared/model/register-user.model';
import { LoginService } from '../shared/services/login.service';
import { ContractService } from '../shared/services/contract.service';
import { RegisterUserService } from '../shared/services/register-user.service';
import { RegisterSignerService } from '../shared/services/register-signer.service';
import { Contract } from '../shared/model/contract';


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  userData: any;
  userId: any;
  userName: string;
  message: string;
  searchCpf: string;

  registerUsers: RegisterUser[];
  contract: Contract[];
  contratoDate: void[];

  constructor(private loginService: LoginService,
              private contractService: ContractService,
              private service: RegisterUserService,
              private registerSignerService: RegisterSignerService,
              private afu: AngularFireAuth)  {
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
        this.registerSignerService.ListDocs("status").subscribe(res =>{
          if(res != ""){
            console.log("Lista de contratos vazia");
          }else{
            console.log(res);
          }
        })
        if(id === this.userId){
          this.userName = e.payload.doc.data()["nome"];
        }
        return { id, ...data };
      })
    });
  }


  getDocumentSpecifc(searchCpf){
    console.log("Testando");
    this.registerUsers.map(data =>{
      if(data.cpf === searchCpf){
        console.log(data);
        return this.service.getSpecificUser(data.id)
      }
    })
    //this.registerSignerService.ListSpecificDocs(uuid)
  }


  getContract(id){
    this.contractService.getAllContract(id).subscribe(data =>{
      this.contract = data.map(e =>{
        const data = e.payload.doc.data() as Contract;
        const id = e.payload.doc.id;
        return { id, ...data };
      })
    });
  }

  logout(){
    this.loginService.logout();
  }

}
