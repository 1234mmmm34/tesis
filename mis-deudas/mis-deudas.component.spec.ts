import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDeudasComponent } from './mis-deudas.component';

describe('MisDeudasComponent', () => {
  let component: MisDeudasComponent;
  let fixture: ComponentFixture<MisDeudasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisDeudasComponent]
    });
    fixture = TestBed.createComponent(MisDeudasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
