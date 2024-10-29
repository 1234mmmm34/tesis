import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDeudasComponent } from './consultar-deudas.component';

describe('ConsultarDeudasComponent', () => {
  let component: ConsultarDeudasComponent;
  let fixture: ComponentFixture<ConsultarDeudasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarDeudasComponent]
    });
    fixture = TestBed.createComponent(ConsultarDeudasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
