import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudasExtraordinariasComponent } from './deudas-extraordinarias.component';

describe('DeudasExtraordinariasComponent', () => {
  let component: DeudasExtraordinariasComponent;
  let fixture: ComponentFixture<DeudasExtraordinariasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeudasExtraordinariasComponent]
    });
    fixture = TestBed.createComponent(DeudasExtraordinariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
