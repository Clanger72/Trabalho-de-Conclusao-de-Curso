import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  @Output() createDependent: boolean = false;
  @Output() editProfile: boolean = false;

  constructor() { }

  ngOnInit(): void {
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
