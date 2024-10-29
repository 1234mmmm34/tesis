import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresUsuariosComponent } from './proveedores-usuarios.component';

describe('ProveedoresUsuariosComponent', () => {
  let component: ProveedoresUsuariosComponent;
  let fixture: ComponentFixture<ProveedoresUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProveedoresUsuariosComponent]
    });
    fixture = TestBed.createComponent(ProveedoresUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
