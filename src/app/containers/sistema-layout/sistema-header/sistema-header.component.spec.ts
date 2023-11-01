import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaHeaderComponent } from './sistema-header.component';

describe('SistemaHeaderComponent', () => {
  let component: SistemaHeaderComponent;
  let fixture: ComponentFixture<SistemaHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemaHeaderComponent]
    });
    fixture = TestBed.createComponent(SistemaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
