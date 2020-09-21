import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractSignatureComponent } from './contract-signature.component';

describe('ContractSignatureComponent', () => {
  let component: ContractSignatureComponent;
  let fixture: ComponentFixture<ContractSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractSignatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
