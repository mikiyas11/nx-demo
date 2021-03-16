import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nx-demo-ui-calendar-months',
  templateUrl: './ui-calendar-months.component.html',
  styleUrls: ['./ui-calendar-months.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCalendarMonthsComponent {

  /**
   *
   *
   * @memberof UiCalendarMonthsComponent
   */
   @Input() month = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

   /**
    *
    *
    * @type {Date}
    * @memberof UiCalendarMonthsComponent
    */
   @Input() activeMonth?: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

   /**
    *
    *
    * @memberof UiCalendarMonthsComponent
    */
   @Input() showMonthStepper = true;

   /**
    *
    *
    * @type {string}
    * @memberof UiCalendarMonthsComponent
    */
   @Input() monthAndYearFormat?: string;

   /**
    *
    *
    * @type {string}
    * @memberof UiCalendarMonthsComponent
    */
   @Input() locale?: string;

   /**
    *
    *
    * @memberof UiCalendarMonthsComponent
    */
   @Output() activeMonthChange = new EventEmitter<Date>();

   /**
    *
    *
    * @template Delta
    * @param {Delta} delta
    * @memberof UiCalendarMonthsComponent
    */
   stepMonth<Delta extends number>(delta: Delta) {
     const activeMonth = this.addMonths(this.activeMonth || new Date(), delta);
     this.activeMonthChange.emit(activeMonth);
   }

   /**
    *
    *
    * @private
    * @param {Date} date
    * @param {number} months
    * @returns {Date}
    * @memberof UiCalendarMonthsComponent
    */
   private addMonths(date: Date, months: number): Date {
     const dateCopy = new Date(date);
     dateCopy.setMonth(date.getMonth() + months);
     return dateCopy
   }

}
