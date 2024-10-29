import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuerdosUsuariosComponent } from './acuerdos-usuarios.component';

describe('AcuerdosUsuariosComponent', () => {
  let component: AcuerdosUsuariosComponent;
  let fixture: ComponentFixture<AcuerdosUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcuerdosUsuariosComponent]
    });
    fixture = TestBed.createComponent(AcuerdosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
