import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosOrdinariosComponent } from './ingresos-ordinarios.component';

describe('IngresosOrdinariosComponent', () => {
  let component: IngresosOrdinariosComponent;
  let fixture: ComponentFixture<IngresosOrdinariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresosOrdinariosComponent]
    });
    fixture = TestBed.createComponent(IngresosOrdinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
