import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnDestroy, OnInit, AfterContentInit, Input, ChangeDetectionStrategy, forwardRef, ElementRef, ChangeDetectorRef, Inject, LOCALE_ID, Output, HostListener } from '@angular/core';
import { getLocaleFirstDayOfWeek, WeekDay } from '@angular/common';
import * as moment from 'moment'

import { EventEmitter } from '@angular/core';

export abstract class CalendarComponentControl<T> {
  abstract value?: T;
  abstract valueChange: EventEmitter<T>;
}

@Component({
  selector: 'nx-demo-ui-calendar',
  templateUrl: './ui-calendar.component.html',
  styleUrls: ['./ui-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiCalendarComponent),
      multi: true
    },
    {
      provide: CalendarComponentControl,
      useExisting: UiCalendarComponent
    }
  ]
})
export class UiCalendarComponent extends CalendarComponentControl<Date>  implements OnInit, OnDestroy, AfterContentInit{


  /**
   *
   *
   * @private
   * @type {string}
   * @memberof UiCalendarComponent
   */
   private _locale?: string;

   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   @Input()
   get locale() {
     return this._locale;
   }


   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   set locale(locale: string | undefined) {
     this._locale = locale || this.localeId;
   }

   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   @Output() valueChange = new EventEmitter<Date>();

   /**
    *
    *
    * @type {boolean}
    * @memberof UiCalendarComponent
    */
   public showCalendar: boolean = false

   /**
    *
    *
    * @type {readonly}
    * @memberof UiCalendarComponent
    */
   public months!: readonly Date[];

   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   public touched = false;
   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   public disabled = false;
   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   public showMonthStepper = true;
   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   public activeDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

   /**
    *
    *
    * @type {Date}
    * @memberof UiCalendarComponent
    */
   public activeMonth?: Date;

   /**
    *
    *
    * @private
    * @memberof UiCalendarComponent
    */
   private _numberOfMonths = 1;

   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   @Input()
   set numberOfMonths(numberOfMonths: any) {
     this._numberOfMonths = Number.isNaN(new Number(numberOfMonths)) ? 0 : +numberOfMonths;
     this.showMonthStepper = this._numberOfMonths <= 2;
   }

   /**
    *
    *
    * @private
    * @type {(Date | null)}
    * @memberof UiCalendarComponent
    */
   private _firstMonth?: Date | null;

   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   @Input()
   set firstMonth(firstMonth: Date | undefined | null) {
     this._firstMonth = firstMonth;
     this.activeMonth = this._firstMonth || undefined;
   }

   /**
    *
    *
    * @readonly
    * @type {(Date | undefined | null)}
    * @memberof UiCalendarComponent
    */
   get firstMonth(): Date | undefined | null {
     return this._firstMonth;
   }

   /**
    *
    *
    * @type {Date}
    * @memberof UiCalendarComponent
    */
   @Input() value?: Date;


   /**
    *
    *
    * @type {Date}
    * @memberof UiCalendarComponent
    */
   @Input() format?: string = 'DD-MM-YYYY';


   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   public formattedValue = moment().format(this.format)

   /**
    *
    *
    * @type {(Date | null)}
    * @memberof UiCalendarComponent
    */
   @Input() min?: Date | null;

   /**
    *
    *
    * @type {string}
    * @memberof UiCalendarComponent
    */
   @Input() monthAndYearFormat?: string;

   /**
    *
    *
    * @private
    * @type {keyof typeof WeekDay}
    * @memberof UiCalendarComponent
    */
   private _firstDayOfWeek?: keyof typeof WeekDay;

   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   @Input()
   get firstDayOfWeek() {
     return this._firstDayOfWeek || this.getDefaultFirstDayOfWeek();
   }

   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   set firstDayOfWeek(firstDayOfWeek: keyof typeof WeekDay) {
     this._firstDayOfWeek = firstDayOfWeek;
   }



   /**
    *
    *
    * @private
    * @memberof UiCalendarComponent
    */
   private onTouched?: () => void;

   @HostListener('document:click', ['$event', '$event.target']) onDocumentClick(event: MouseEvent, targetElement: HTMLElement) {

     if (!targetElement) {
       return;
   }

   const clickedInside = this.elementRef.nativeElement.contains(targetElement);
     if (!clickedInside) {
       // console.log('outside clicked!');
       this.showCalendar = false
     }

   }

   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   trackByMillisecondsChange = (_: number, month: Date) => this.showMonthStepper || month.getTime();

   constructor(public changeDetectorRef: ChangeDetectorRef,
     @Inject(LOCALE_ID) private localeId: string,
     private elementRef: ElementRef) {
       super();
     }

      /**
    *
    *
    * @private
    * @memberof UiCalendarComponent
    */
   private onChange(updatedValue: Date): void {
     this.formattedValue = moment(updatedValue).format(this.format)
   };

   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   ngOnInit(): void {
     console.log('calendar modules....')
     if (!this.locale) {
       this.locale = this.localeId;
     }
     // this.months = this.getMonths()
   }

   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   ngAfterContentInit(): void {
     console.log('Executed after content init');

     this.months = this.getMonths()
     this.formattedValue = moment().format(this.formattedValue)
     console.log( this.months, ' this.months');

   }

   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   ngOnDestroy(): void {

   }

   /**
    *
    *
    * @memberof UiCalendarComponent
    */
   onInputClick(): void {
     this.showCalendar = !this.showCalendar

   }

   /**
    *
    *
    * @param {Date} activeMonth
    * @memberof UiCalendarComponent
    */
   onActiveMonthChange(activeMonth: Date) {
     this.activeMonth = activeMonth;
     this.activeDate = this.dateSetter(this.activeMonth, this.activeDate.getDate());
     this.months = this.getMonths();
   }

   /**
    *
    *
    * @private
    * @memberof UiCalendarComponent
    */
   private getMonths() {
     const firstMonth = (this.showMonthStepper ? this.activeMonth : this.firstMonth) || new Date();
     const startOfFirstMonth = new Date(firstMonth.getFullYear(), firstMonth.getMonth(), firstMonth.getDate());
     console.log(firstMonth, startOfFirstMonth, this.numberOfMonths,'startOfFirstMonth.,..');

     return Array.from({length: this._numberOfMonths}, (_, index) => this.addMonths(startOfFirstMonth, index));
   }

   /**
    *
    *
    * @private
    * @returns
    * @memberof UiCalendarComponent
    */
   private getDefaultFirstDayOfWeek() {
     return WeekDay[getLocaleFirstDayOfWeek(this.locale!)] as keyof typeof WeekDay;
   }

   /**
    *
    *
    * @private
    * @param {Date} date
    * @param {number} months
    * @returns {Date}
    * @memberof UiCalendarComponent
    */
   private addMonths(date: Date, months: number): Date {
     const dateCopy = new Date(date);
     dateCopy.setMonth(date.getMonth() + months);
     return dateCopy
   }

   /**
    *
    *
    * @private
    * @param {Date} firstDate
    * @param {Date} secondDate
    * @returns {boolean}
    * @memberof UiCalendarComponent
    */
   private checkSameDate(firstDate: Date, secondDate: Date): boolean {
     return firstDate.getTime() === secondDate.getTime();
   }

   /**
    *
    *
    * @private
    * @param {Date} date
    * @param {number} dayOfMonth
    * @returns {Date}
    * @memberof UiCalendarComponent
    */
   private dateSetter(date: Date, dayOfMonth: number): Date {
     const dateCopy = new Date(date);
     dateCopy.setDate(dayOfMonth);
     return dateCopy;
   }

   /**
    *
    *
    * @param {Date} activeDate
    * @memberof UiCalendarComponent
    */
   activeDateChange(activeDate: Date) {
     this.activeDate = activeDate;
     console.log(activeDate, 'activeDate');


     if (!this.checkSameDate(this.activeDate, this.activeMonth || new Date())) {
       this.activeMonth = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), 1);
       if (this.showMonthStepper) {
         this.months = this.getMonths();
       }
     }

     setTimeout(() => {
       this.elementRef.nativeElement.querySelector('[tabindex="0"]').focus();
     });
   }

   /**
    *
    *
    * @param {Date} date
    * @memberof UiCalendarComponent
    */
   onSelect(date: Date) {

     if (!this.disabled) {
       this.value = date;
       this.activeMonth = date;
       this.activeDate = date;
       this.valueChange.emit(date);
       if (this.onChange) {
         this.onChange(date);
       }
       if (this.onTouched) {
         this.onTouched();
       }
     }
   }
}
