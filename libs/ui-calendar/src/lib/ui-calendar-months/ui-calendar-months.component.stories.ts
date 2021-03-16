import { text, number, boolean, date } from '@storybook/addon-knobs';
import { UiCalendarMonthsComponent } from './ui-calendar-months.component';

export default {
  title: 'UiCalendarMonthsComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: UiCalendarMonthsComponent,
  props: {
    month: date('month', new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())),
    activeMonth: date('activeMonth', new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())),
    showMonthStepper: boolean('showMonthStepper', true),
    monthAndYearFormat: text('monthAndYearFormat', ''),
    locale: text('locale', ''),
  }
})
