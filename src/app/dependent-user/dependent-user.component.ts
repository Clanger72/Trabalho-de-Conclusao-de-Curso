import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dependent-user',
  templateUrl: './dependent-user.component.html',
  styleUrls: ['./dependent-user.component.css']
})
export class DependentUserComponent implements OnInit {

  newDependent: boolean = false;

  @Input() lDependent: boolean = false;
  @Input() lEdit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  createNewDependent(): void{
    console.log("lDependent", this.lDependent, "lEdit", this.lEdit);
    this.newDependent = true;
  }

  backToList(): void{
    this.newDependent = false;
  }

}
