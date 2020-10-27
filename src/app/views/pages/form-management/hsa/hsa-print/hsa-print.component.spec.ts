import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HsaPrintComponent } from './hsa-print.component';

describe('HsaPrintComponent', () => {
  let component: HsaPrintComponent;
  let fixture: ComponentFixture<HsaPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsaPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HsaPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
