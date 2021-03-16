import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCalendarDaysComponent } from './ui-calendar-days.component';

describe('UiCalendarDaysComponent', () => {
  let component: UiCalendarDaysComponent;
  let fixture: ComponentFixture<UiCalendarDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiCalendarDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCalendarDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
