import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAcuerdosComponent } from './consultar-acuerdos.component';

describe('ConsultarAcuerdosComponent', () => {
  let component: ConsultarAcuerdosComponent;
  let fixture: ComponentFixture<ConsultarAcuerdosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarAcuerdosComponent]
    });
    fixture = TestBed.createComponent(ConsultarAcuerdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
