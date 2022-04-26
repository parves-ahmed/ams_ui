import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllotteeComponent } from './add-allottee.component';

describe('AddAllotteeComponent', () => {
  let component: AddAllotteeComponent;
  let fixture: ComponentFixture<AddAllotteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAllotteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAllotteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
