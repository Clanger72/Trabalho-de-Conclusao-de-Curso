import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  @Input() createDependent: boolean = false;
  @Input() editProfile: boolean = false;

  //changeValue = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  dependent(): void{
    this.createDependent = true;
    //(this.changeValue.emit({changeValue: this.createDependent});
  }

  userProfile(): void{
    this.editProfile = true;
  }

}
