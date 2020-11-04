import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabetesPrintComponent } from './diabetes-print.component';

describe('DiabetesPrintComponent', () => {
  let component: DiabetesPrintComponent;
  let fixture: ComponentFixture<DiabetesPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiabetesPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiabetesPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
