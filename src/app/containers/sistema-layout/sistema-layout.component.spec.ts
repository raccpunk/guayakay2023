import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaLayoutComponent } from './sistema-layout.component';

describe('SistemaLayoutComponent', () => {
  let component: SistemaLayoutComponent;
  let fixture: ComponentFixture<SistemaLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemaLayoutComponent]
    });
    fixture = TestBed.createComponent(SistemaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
