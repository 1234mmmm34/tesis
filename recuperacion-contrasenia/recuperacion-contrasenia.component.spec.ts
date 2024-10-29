import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacionContraseniaComponent } from './recuperacion-contrasenia.component';

describe('RecuperacionContraseniaComponent', () => {
  let component: RecuperacionContraseniaComponent;
  let fixture: ComponentFixture<RecuperacionContraseniaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperacionContraseniaComponent]
    });
    fixture = TestBed.createComponent(RecuperacionContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
