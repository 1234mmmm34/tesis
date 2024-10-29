import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudasOrdinariasComponent } from './deudas-ordinarias.component';

describe('DeudasOrdinariasComponent', () => {
  let component: DeudasOrdinariasComponent;
  let fixture: ComponentFixture<DeudasOrdinariasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeudasOrdinariasComponent]
    });
    fixture = TestBed.createComponent(DeudasOrdinariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
