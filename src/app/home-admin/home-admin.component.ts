import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();
  }

}
