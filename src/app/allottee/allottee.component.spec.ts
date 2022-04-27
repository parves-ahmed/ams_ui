import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotteeComponent } from './allottee.component';

describe('AllotteeComponent', () => {
  let component: AllotteeComponent;
  let fixture: ComponentFixture<AllotteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllotteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllotteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
