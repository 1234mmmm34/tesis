import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesUsuariosComponent } from './notificaciones-usuarios.component';

describe('NotificacionesUsuariosComponent', () => {
  let component: NotificacionesUsuariosComponent;
  let fixture: ComponentFixture<NotificacionesUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificacionesUsuariosComponent]
    });
    fixture = TestBed.createComponent(NotificacionesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
