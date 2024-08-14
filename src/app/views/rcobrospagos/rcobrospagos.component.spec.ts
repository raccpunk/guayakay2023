import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RCobrospagosComponent } from './rcobrospagos.component';

describe('RCobrosComponent', () => {
  let component: RCobrospagosComponent;
  let fixture: ComponentFixture<RCobrospagosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RCobrospagosComponent]
    });
    fixture = TestBed.createComponent(RCobrospagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
