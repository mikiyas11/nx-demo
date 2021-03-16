import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { formatDate, getLocaleDateFormat, FormatWidth } from '@angular/common';


@Pipe({
  name: 'monthPipe'
})
export class MonthPipe implements PipeTransform {

  /**
   *
   *
   * @private
   * @type {boolean}
   * @memberof MonthPipe
   */
  private readonly toLocaleStringSupportsLocales: boolean;

  /**
   *Creates an instance of MonthPipe.
   * @param {string} localeId
   * @memberof MonthPipe
   */
  constructor(@Inject(LOCALE_ID) private localeId: string) {
    this.toLocaleStringSupportsLocales = this.toLocaleStringLocales();
  }

  /**
   *
   *
   * @param {*} value
   * @param {*} [locale=this.localeId]
   * @param {string} [format]
   * @returns
   * @memberof MonthPipe
   */
  transform(value: any, locale = this.localeId, format?: string) {
    if (!this.isValidDate(value)) { return null; }

    return this.toLocaleStringSupportsLocales && !format
      ? value.toLocaleString(locale, {
        year: 'numeric',
        month: 'long'
      })
      : formatDate(value, format || this.fallbackMonthFormat(locale), locale);
  }

  /**
   *
   *
   * @param {string} locale
   * @returns
   * @memberof MonthPipe
   */
  fallbackMonthFormat(locale: string) {
    return getLocaleDateFormat(locale!, FormatWidth.Long).replace(/\s?d+(\.|,|\sde)?/, '').trim();
  }

  /**
   *
   *
   * @param {*} [value]
   * @returns {value is Date}
   * @memberof MonthPipe
   */
  isValidDate(value?: any): value is Date {
    return value instanceof Date && typeof value.getTime === 'function' && !Number.isNaN(Number(value.getTime()));
  }

  /**
   *
   *
   * @returns
   * @memberof MonthPipe
   */
  toLocaleStringLocales() {
    try {
      new Date().toLocaleString('i');
    } catch (e) {
      return e instanceof RangeError;
    }
    return false;
  }
}
