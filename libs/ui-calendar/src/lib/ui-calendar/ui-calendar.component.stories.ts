import { text, number, boolean, date } from '@storybook/addon-knobs';
import { UiCalendarComponent } from './ui-calendar.component';

export default {
  title: 'UiCalendarComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: UiCalendarComponent,
  props: {
    locale: text('locale', ''),
    numberOfMonths: text('numberOfMonths', ''),
    firstMonth: text('firstMonth', ''),
    value: date('value', new Date()),
    format: text('format', 'DD-MM-YYYY'),
    min: date('min', null),
    monthAndYearFormat: text('monthAndYearFormat', ''),
    firstDayOfWeek: text('firstDayOfWeek', ''),
  }
})
