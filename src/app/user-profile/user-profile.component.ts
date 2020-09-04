import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  editProfile: boolean = false;
  @Input() lDependent: boolean = false;
  @Input() lEdit: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}