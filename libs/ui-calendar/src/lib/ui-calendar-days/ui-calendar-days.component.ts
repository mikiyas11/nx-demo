import { ChangeDetectionStrategy, Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { FormStyle, getLocaleDayNames, TranslationWidth } from '@angular/common';


@Component({
  selector: 'nx-demo-ui-calendar-days',
  templateUrl: './ui-calendar-days.component.html',
  styleUrls: ['./ui-calendar-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiCalendarDaysComponent implements OnInit {

  /**
   *
   *
   * @type {readonly}
   * @memberof UiCalendarDaysComponent
   */
   public days!: readonly string[];

   /**
    *
    *
    * @type {readonly}
    * @memberof UiCalendarDaysComponent
    */
   public narrowDays!: readonly string[];

   /**
    *
    *
    * @private
    * @type {string}
    * @memberof UiCalendarDaysComponent
    */
   private _locale?: string;

   /**
    *
    *
    * @readonly
    * @memberof UiCalendarDaysComponent
    */
   @Input()
   get locale() {
     return this._locale;
   }

   /**
    *
    *
    * @memberof UiCalendarDaysComponent
    */
   set locale(locale: string | undefined) {
     this._locale = locale || this.localeId;
     this.days = this.getDays();
     this.narrowDays = this.getNarrowDays();
   }

   constructor(@Inject(LOCALE_ID) private localeId: string) {}

   /**
    *
    *
    * @memberof UiCalendarDaysComponent
    */
   ngOnInit(): void {
     if (!this.locale) {
       this.locale = this.localeId;
     }
   }

   /**
    *
    *
    * @private
    * @returns
    * @memberof UiCalendarDaysComponent
    */
   private getDays() {
     return getLocaleDayNames(this.locale!, FormStyle.Format, TranslationWidth.Wide);
   }

   /**
    *
    *
    * @private
    * @returns
    * @memberof UiCalendarDaysComponent
    */
   private getNarrowDays() {
     return getLocaleDayNames(this.locale!, FormStyle.Format, TranslationWidth.Narrow);
   }
}
