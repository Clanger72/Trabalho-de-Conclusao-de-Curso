import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentUserComponent } from './dependent-user.component';

describe('DependentUserComponent', () => {
  let component: DependentUserComponent;
  let fixture: ComponentFixture<DependentUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependentUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
