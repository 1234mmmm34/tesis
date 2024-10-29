import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPropiedadesComponent } from './consultar-propiedades.component';

describe('ConsultarPropiedadesComponent', () => {
  let component: ConsultarPropiedadesComponent;
  let fixture: ComponentFixture<ConsultarPropiedadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarPropiedadesComponent]
    });
    fixture = TestBed.createComponent(ConsultarPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
