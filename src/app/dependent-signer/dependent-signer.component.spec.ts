import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentSignerComponent } from './dependent-signer.component';

describe('DependentSignerComponent', () => {
  let component: DependentSignerComponent;
  let fixture: ComponentFixture<DependentSignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependentSignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentSignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
