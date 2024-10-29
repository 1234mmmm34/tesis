import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarNotificacionesComponent } from './consultar-notificaciones.component';

describe('ConsultarNotificacionesComponent', () => {
  let component: ConsultarNotificacionesComponent;
  let fixture: ComponentFixture<ConsultarNotificacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarNotificacionesComponent]
    });
    fixture = TestBed.createComponent(ConsultarNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
