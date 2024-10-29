import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPrincipalAdminComponent } from './panel-principal-admin.component';

describe('PanelPrincipalAdminComponent', () => {
  let component: PanelPrincipalAdminComponent;
  let fixture: ComponentFixture<PanelPrincipalAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelPrincipalAdminComponent]
    });
    fixture = TestBed.createComponent(PanelPrincipalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
