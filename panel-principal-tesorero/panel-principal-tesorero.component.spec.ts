import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPrincipalTesoreroComponent } from './panel-principal-tesorero.component';

describe('PanelPrincipalTesoreroComponent', () => {
  let component: PanelPrincipalTesoreroComponent;
  let fixture: ComponentFixture<PanelPrincipalTesoreroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelPrincipalTesoreroComponent]
    });
    fixture = TestBed.createComponent(PanelPrincipalTesoreroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
