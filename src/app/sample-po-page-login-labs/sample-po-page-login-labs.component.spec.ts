import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePoPageLoginLabsComponent } from './sample-po-page-login-labs.component';

describe('SamplePoPageLoginLabsComponent', () => {
  let component: SamplePoPageLoginLabsComponent;
  let fixture: ComponentFixture<SamplePoPageLoginLabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplePoPageLoginLabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplePoPageLoginLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
