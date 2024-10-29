import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPrincipalUserComponent } from './panel-principal-user.component';

describe('PanelPrincipalUserComponent', () => {
  let component: PanelPrincipalUserComponent;
  let fixture: ComponentFixture<PanelPrincipalUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelPrincipalUserComponent]
    });
    fixture = TestBed.createComponent(PanelPrincipalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
