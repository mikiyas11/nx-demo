import { AfterViewInit, OnChanges, Component, ChangeDetectionStrategy, SimpleChanges, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { WeekDay } from '@angular/common';


@Component({
  selector: 'nx-demo-ui-calendar-month',
  templateUrl: './ui-calendar-month.component.html',
  styleUrls: ['./ui-calendar-month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCalendarMonthComponent implements AfterViewInit, OnChanges {


  /**
   *
   *
   * @type {readonly}
   * @memberof UiCalendarMonthComponent
   */
   daysOfMonth!: readonly Date[];
   /**
    *
    *
    * @type {string}
    * @memberof UiCalendarMonthComponent
    */
   firstDayOfMonth!: string;

   /**
    *
    *
    * @memberof UiCalendarMonthComponent
    */
   currentDate =  new Date( new Date().getFullYear(),  new Date().getMonth(),  new Date().getDate());

   /**
    *
    *
    * @type {Date}
    * @memberof UiCalendarMonthComponent
    */
   @Input() selectedDate?: Date;

   /**
    *
    *
    * @type {(Date | null)}
    * @memberof UiCalendarMonthComponent
    */
   @Input() min?: Date | null;

   /**
    *
    *
    * @type {string}
    * @memberof UiCalendarMonthComponent
    */
   @Input() locale?: string;

   /**
    *
    *
    * @type {Date}
    * @memberof UiCalendarMonthComponent
    */
   @Input() activeDate!: Date;

   /**
    *
    *
    * @private
    * @type {Date}
    * @memberof UiCalendarMonthComponent
    */
   private _month!: Date;

   /**
    *
    *
    * @readonly
    * @memberof UiCalendarMonthComponent
    */
   @Input()
   get month() {
     return this._month;
   }

   /**
    *
    *
    * @memberof UiCalendarMonthComponent
    */
   set month(month: Date) {
     if (!this._month || !(this._month.getFullYear() === this._month.getFullYear() && this._month.getMonth() === month.getMonth())) {
       this._month = month;
       this.daysOfMonth = Array.from({length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()}, (_, index) =>  {
          const swapDate = new Date(month);
          swapDate.setDate(index + 1);
          return swapDate;
       });
       this.firstDayOfMonth = WeekDay[this.daysOfMonth[0].getDay()].toLowerCase();
     }
   }

   /**
    *
    *
    * @memberof UiCalendarMonthComponent
    */
   @Output() selectedDateChange = new EventEmitter<Date>();

   /**
    *
    *
    * @memberof UiCalendarMonthComponent
    */
   @Output() activeDateChange = new EventEmitter<Date>()

   /**
    *
    *
    * @private
    * @memberof UiCalendarMonthComponent
    */
   private readonly dateSelector = 'time.month__date';

   /**
    *Creates an instance of UiCalendarMonthComponent.
    * @param {ChangeDetectorRef} changeDetectorRef
    * @memberof UiCalendarMonthComponent
    */
   constructor(public changeDetectorRef: ChangeDetectorRef) {}

   /**
    *
    *
    * @memberof UiCalendarMonthComponent
    */
   ngAfterViewInit(): void {
     this.changeDetectorRef.detach();
   }

   /**
    *
    *
    * @param {SimpleChanges} changes
    * @memberof UiCalendarMonthComponent
    */
   ngOnChanges(changes: SimpleChanges): void {
     if (Object.entries(changes).some(([input, change]) => input !== 'month' && !change.firstChange)) {
       this.changeDetectorRef.detectChanges();
     }
   }

   /**
    *
    *
    * @param {Date} dayOfMonth
    * @returns
    * @memberof UiCalendarMonthComponent
    */
   isSelected(dayOfMonth: Date) {
     return !!this.selectedDate && this.checkSameDate(dayOfMonth, this.selectedDate);
   }

   /**
    *
    *
    * @param {Date} dayOfMonth
    * @returns
    * @memberof UiCalendarMonthComponent
    */
   isDisabled(dayOfMonth: Date) {
     return !!this.min && this.isDateGreaterThan(this.min, dayOfMonth);
   }

   /**
    *
    *
    * @param {Date} dayOfMonth
    * @returns
    * @memberof UiCalendarMonthComponent
    */
   isActive(dayOfMonth: Date) {
     return !!this.activeDate && this.checkSameDate(dayOfMonth, this.activeDate);
   }

   /**
    *
    *
    * @param {Date} dayOfMonth
    * @returns
    * @memberof UiCalendarMonthComponent
    */
   isCurrent(dayOfMonth: Date) {
     return !!this.currentDate && this.checkSameDate(dayOfMonth, this.currentDate);
   }

   /**
    *
    *
    * @private
    * @param {Date} firstDate
    * @param {Date} secondDate
    * @returns
    * @memberof UiCalendarMonthComponent
    */
   private checkSameDate(firstDate: Date, secondDate: Date) {
     return firstDate.getTime() === secondDate.getTime();
   }

   /**
    *
    *
    * @private
    * @param {Date} firstDate
    * @param {Date} secondDate
    * @returns
    * @memberof UiCalendarMonthComponent
    */
   private isDateGreaterThan(firstDate: Date, secondDate: Date) {
     return firstDate.getTime() > secondDate.getTime();
   }

   /**
    *
    *
    * @private
    * @param {Date} date
    * @memberof UiCalendarMonthComponent
    */
   private selectDate(date: Date) {
     if (!this.isSelected(date) && !this.isDisabled(date)) {
       this.selectedDateChange.emit(date);
     }
   }

   /**
    *
    *
    * @private
    * @param {HTMLTimeElement} timeElement
    * @memberof UiCalendarMonthComponent
    */
   private onDateClick(timeElement: HTMLTimeElement) {
     const selectedDate = new Date(timeElement.dateTime + 'T00:00');

     if (  selectedDate instanceof Date && typeof selectedDate.getTime === 'function' && !Number.isNaN(Number(selectedDate.getTime()))) {
       this.selectDate(selectedDate);
     }
   }

   /**
    *
    *
    * @private
    * @param {HTMLElement} element
    * @returns {element is HTMLTimeElement}
    * @memberof UiCalendarMonthComponent
    */
   private isTimeElement(element: HTMLElement): element is HTMLTimeElement {
     return !!element && element.matches(this.dateSelector);
   }

   /**
    *
    *
    * @param {(MouseEvent | Event)} event
    * @memberof UiCalendarMonthComponent
    */
   onMonthClick(event: MouseEvent | Event) {
     const target = event.target as HTMLElement;

     if (this.isTimeElement(target)) {
       this.onDateClick(target);
     }
   }
}
