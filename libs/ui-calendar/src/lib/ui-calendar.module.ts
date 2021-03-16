import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiCalendarComponent } from './ui-calendar/ui-calendar.component';
import { UiCalendarDaysComponent } from './ui-calendar-days/ui-calendar-days.component';
import { UiCalendarMonthComponent } from './ui-calendar-month/ui-calendar-month.component';
import { UiCalendarMonthsComponent } from './ui-calendar-months/ui-calendar-months.component';

import { MonthPipe } from './pipe/month.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [MonthPipe,UiCalendarComponent, UiCalendarDaysComponent, UiCalendarMonthComponent, UiCalendarMonthsComponent],
  exports: [UiCalendarComponent, UiCalendarDaysComponent, UiCalendarMonthComponent, UiCalendarMonthsComponent],
})
export class UiCalendarModule {}
