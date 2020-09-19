import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
//validação de e-mail
//https://www.positronx.io/full-angular-7-firebase-authentication-system/
//https://firebase.google.com/docs/auth/web/manage-users?hl=pt-br

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

}
