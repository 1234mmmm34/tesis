import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquilinosComponent } from './inquilinos.component';

describe('InquilinosComponent', () => {
  let component: InquilinosComponent;
  let fixture: ComponentFixture<InquilinosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InquilinosComponent]
    });
    fixture = TestBed.createComponent(InquilinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
