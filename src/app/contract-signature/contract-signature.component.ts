import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-signature',
  templateUrl: './contract-signature.component.html',
  styleUrls: ['./contract-signature.component.css']
})
export class ContractSignatureComponent implements OnInit {

  number = Date.now();
  date = new Date(this.number).toLocaleDateString("pt-br");
  time = new Date(this.number).toLocaleTimeString("pt-br");

  //Convert HTML to PDF
  //https://www.thecodehubs.com/how-to-convert-html-to-pdf-in-angular-9/

  constructor() { }

  ngOnInit(): void {
  }
}
