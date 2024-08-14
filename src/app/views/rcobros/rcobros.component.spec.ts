import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RCobrosComponent } from './rcobros.component';

describe('RCobrosComponent', () => {
  let component: RCobrosComponent;
  let fixture: ComponentFixture<RCobrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RCobrosComponent]
    });
    fixture = TestBed.createComponent(RCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
