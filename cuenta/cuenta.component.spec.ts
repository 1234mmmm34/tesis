import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaComponent } from './cuenta.component';

describe('CuentaComponent', () => {
  let component: CuentaComponent;
  let fixture: ComponentFixture<CuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaComponent]
    });
    fixture = TestBed.createComponent(CuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
