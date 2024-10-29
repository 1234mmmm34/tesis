import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoPuertaComponent } from './acceso-puerta.component';

describe('AccesoPuertaComponent', () => {
  let component: AccesoPuertaComponent;
  let fixture: ComponentFixture<AccesoPuertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccesoPuertaComponent]
    });
    fixture = TestBed.createComponent(AccesoPuertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
