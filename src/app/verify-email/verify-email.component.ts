import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public loginService: LoginService,
              public router: Router) { }

  ngOnInit(): void {

  }

  resentEmail(user){
    this.loginService.sendEmailVerification(user);
  }

  reload(){
    this.router.navigate(['login']).then(() => location.reload());
  }

}
