import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDeudasComponent } from './historial-deudas.component';

describe('HistorialDeudasComponent', () => {
  let component: HistorialDeudasComponent;
  let fixture: ComponentFixture<HistorialDeudasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialDeudasComponent]
    });
    fixture = TestBed.createComponent(HistorialDeudasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
