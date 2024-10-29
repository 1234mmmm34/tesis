import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarUsuariosTesoreroComponent } from './consultar-usuarios-tesorero.component';

describe('ConsultarUsuariosTesoreroComponent', () => {
  let component: ConsultarUsuariosTesoreroComponent;
  let fixture: ComponentFixture<ConsultarUsuariosTesoreroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarUsuariosTesoreroComponent]
    });
    fixture = TestBed.createComponent(ConsultarUsuariosTesoreroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
