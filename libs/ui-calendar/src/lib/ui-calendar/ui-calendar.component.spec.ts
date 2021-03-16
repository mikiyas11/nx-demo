import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCalendarComponent } from './ui-calendar.component';

describe('UiCalendarComponent', () => {
  let component: UiCalendarComponent;
  let fixture: ComponentFixture<UiCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
