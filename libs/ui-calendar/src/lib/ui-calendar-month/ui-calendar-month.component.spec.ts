import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCalendarMonthComponent } from './ui-calendar-month.component';

describe('UiCalendarMonthComponent', () => {
  let component: UiCalendarMonthComponent;
  let fixture: ComponentFixture<UiCalendarMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiCalendarMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCalendarMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
