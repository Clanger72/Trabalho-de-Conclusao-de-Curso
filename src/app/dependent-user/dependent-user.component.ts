import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dependent-user',
  templateUrl: './dependent-user.component.html',
  styleUrls: ['./dependent-user.component.css']
})
export class DependentUserComponent implements OnInit {

  newDependent: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  createDependent(): void{
    this.newDependent = true;
  }

}
