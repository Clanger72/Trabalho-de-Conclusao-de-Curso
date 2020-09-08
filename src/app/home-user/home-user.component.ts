import { Component, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  @Output() createDependent: boolean = false;
  @Output() editProfile: boolean = false;
  userEmail: string;

  constructor() { }

  ngOnInit() {
    var user = firebase.auth().currentUser;
    this.userEmail = user.email;
  }

  dependent(): void{
    this.createDependent = true;
    this.editProfile = false
  }

  userProfile(): void{
    this.editProfile = true;
    this.createDependent = false;
  }

}
