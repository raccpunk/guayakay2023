import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsStateComponent } from './tickets-state.component';

describe('TicketsStateComponent', () => {
  let component: TicketsStateComponent;
  let fixture: ComponentFixture<TicketsStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketsStateComponent]
    });
    fixture = TestBed.createComponent(TicketsStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
