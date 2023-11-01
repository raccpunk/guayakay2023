import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaFooterComponent } from './sistema-footer.component';

describe('SistemaFooterComponent', () => {
  let component: SistemaFooterComponent;
  let fixture: ComponentFixture<SistemaFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemaFooterComponent]
    });
    fixture = TestBed.createComponent(SistemaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
