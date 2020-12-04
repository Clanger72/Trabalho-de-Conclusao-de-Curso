import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegisterUser } from '../shared/model/register-user.model';
import { LoginService } from '../shared/services/login.service';
import { ContractService } from '../shared/services/contract.service';
import { RegisterUserService } from '../shared/services/user.service';
import { RegisterSignerService } from '../shared/services/register-signer.service';
import { Contract, ListContract, Download} from '../shared/model/contract';


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  userData: any;
  userId: any;
  userName: string;
  name: string;
  message: string;
  searchCpf: string;

  registerUsers: RegisterUser[];
  contract: Contract[];
  contratoDate: void[];
  listContract: any;
  dataUser: any;
  listing: Array<ListContract>;
  ListContracts: Array<ListContract> = [];
  download: any;
  cpf: any;
  email: any;

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
      this.registerUsers = data.map( e =>{
        const data = e.payload.doc.data() as RegisterUser;
        const id = e.payload.doc.id;
        this.name = e.payload.doc.data()['nome'];
        this.cpf = e.payload.doc.data()['cpf'];
        this.email = e.payload.doc.data()['email'];
        this.getContract(id, data);
        if(id === this.userId){
          this.userName = e.payload.doc.data()["nome"];
        }
        return { id, ...data };
      })
    });
  }

  getContract(id, user){
    this.contractService.getAllContract(id).subscribe(data =>{
      this.contract = data.map(e =>{
        const data = e.payload.doc.data() as Contract;
        const id = e.payload.doc.id;
        const nameDoc = e.payload.doc.data()['uuid'];
        this.registerSignerService.ListDocs("status").subscribe(res =>{
          if(res == ""){
            alert("Lista de contratos vazia");
          }else{
            this.listContract = res;
            for(let index=1; this.listContract.length >= 0 &&
                this.listContract[index] != undefined; index++){
                if(this.listContract[index].uuidDoc == nameDoc){
                this.listContract = {
                  uuid: this.listContract[index].uuidDoc,
                  nameDoc: this.listContract[index].nameDoc,
                  cpf: user.cpf,
                  email: user.email,
                  nome: user.nome
                };
                console.log("index", index, this.listContract);
                this.ListContracts.push(this.listContract);
              }
            }
          }
        })
        return { id, ...data };
      })
    });
  }

  getDocumentSpecifc(searchCpf){
    if(searchCpf === undefined || searchCpf == ''){
      location.reload();
    }
    this.ListContracts = [];
    this.service.getUser().subscribe(data =>{
      this.registerUsers = data.map( e =>{
        const data = e.payload.doc.data() as RegisterUser;
        const id = e.payload.doc.id;
        const cpf = e.payload.doc.data()['cpf'];

        this.contractService.getAllContract(id).subscribe(data =>{
          this.contract = data.map(edata =>{
            const data = edata.payload.doc.data() as Contract;
            const id = edata.payload.doc.id;
            const uuidDoc = edata.payload.doc.data()['uuid'];
            this.registerSignerService.ListDocs("status").subscribe(res =>{
              if(res == ""){
                alert("Lista de contratos vazia");
              }else{
                this.listContract = res;
                for(let index=1; this.listContract.length >= 0 &&
                    this.listContract[index] != undefined; index++){
                  if(this.listContract[index].uuidDoc == uuidDoc && cpf === searchCpf){
                    this.listContract = {
                      uuid: uuidDoc,
                      nameDoc: this.listContract[index].nameDoc,
                      cpf: e.payload.doc.data()['cpf'],
                      email: e.payload.doc.data()['email'],
                      nome: e.payload.doc.data()['nome']
                    };
                    this.ListContracts.push(this.listContract);
                  }
                }
              }
            })
            return { id, ...data };
          })
        });

        return { id, ...data };
      })
    });
  }

  Download(downloadContract){
    this.registerSignerService.DownloadDoc(downloadContract).subscribe(res =>{
      this.download = res;
      window.open(this.download.url);
    })
  }

  logout(){
    this.loginService.logout();
  }

}
