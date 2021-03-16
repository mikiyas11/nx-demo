import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCalendarMonthsComponent } from './ui-calendar-months.component';

describe('UiCalendarMonthsComponent', () => {
  let component: UiCalendarMonthsComponent;
  let fixture: ComponentFixture<UiCalendarMonthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiCalendarMonthsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCalendarMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
