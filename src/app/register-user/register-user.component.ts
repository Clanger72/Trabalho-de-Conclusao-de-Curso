import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RegisterUser } from '../shared/model/register-user.model'
import { RegisterUserService } from '../shared/services/register-user.service'


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerUsers: RegisterUser[];

  id: number;
  router: Router;
  loggedIn: boolean = false; 

  userId: number = 1;
  userNome: string;
  userEmail: string;
  userTelefone: string;
  userPassword: string;
  userPasswordCheck: string;

  constructor(router: Router,
              private activatedRoute: ActivatedRoute,
              private registerUserService: RegisterUserService) {
              this.router = router;
               }

  ngOnInit() {
    
  }

  create(){
    alert("Clicou em Salvar");
    if(this.userPassword == this.userPasswordCheck){
      console.log(this.userNome);
    let Record = {};
    Record['id'] = this.userId;
    Record['name'] = this.userNome;
    Record['email'] = this.userEmail;
    Record['telefone'] = this.userTelefone;
    Record['password'] = this.userPassword;

    this.registerUserService.createUser(Record).then(res =>{
      this.userId = undefined;
      this.userNome = "";
      this.userEmail = "";
      this.userTelefone = "";
      this.userPassword = "";
      this.userPasswordCheck = "";
      console.log('Salvo', res);
    }).catch(error =>{
      console.log(error);
    });
    }else{
      alert("A senha de confirmação deve ser igual a primeira digitada!");
      this.userPassword = "";
      this.userPasswordCheck = "";
    }
    
  }

  update(registerUsers: RegisterUser) {
    this.registerUserService.updateUser(registerUsers);
  }

  delete(id: string) {
    this.registerUserService.deleteUser(id);
  }

  //metodo para salvar o registro
  save(): void{

    this.loggedIn = true;
    console.log('entrou no save');
     // this.serviceRegisterUser.create(this.registerUser).subscribe(
        //this.router.navigate(['/', 'app-sample-po-page-login-labs']);
        //https://www.youtube.com/watch?v=87-2KVKZrew
        //https://assinante-b9780.firebaseio.com/
        //key AIzaSyBTYCorHl3fSZ3ke2BvQF87FD1nQvaQ2co
        //colocar a rota para próxima tela
        //this.router.navigate('/samplepo');
     // );
   }
             
}
