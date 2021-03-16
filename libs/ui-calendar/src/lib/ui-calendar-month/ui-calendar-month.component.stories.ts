import { text, number, boolean } from '@storybook/addon-knobs';
import { UiCalendarMonthComponent } from './ui-calendar-month.component';

export default {
  title: 'UiCalendarMonthComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: UiCalendarMonthComponent,
  props: {
    selectedDate: text('selectedDate', null),
    min: text('min', null),
    locale: text('locale', null),
    activeDate: text('activeDate', null),
    month: text('month',  null),
  }
})
