import { Component, OnInit } from '@angular/core';
import { IRegisterUser, RegisterUser } from '../shared/model/register-user.model';
import { RegisterUserService } from '../shared/services/register-user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

registerUser: IRegisterUser = new RegisterUser();

  id: number;
  router: Router;
  loggedIn: boolean = false; 
  constructor(router: Router,
              private serviceRegisterUser: RegisterUserService,
              private activatedRoute: ActivatedRoute) {
                this.router = router;
               }

  ngOnInit(): void {
  }
  //esse metodo é para consultar
  private get(){
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('codClient'));
    if(this.id){
      this.serviceRegisterUser.get(this.id).subscribe((item: IRegisterUser) => {
        this.registerUser = item;
      })
    }
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
