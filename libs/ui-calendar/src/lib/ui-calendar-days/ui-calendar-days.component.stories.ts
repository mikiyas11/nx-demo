import { text, number, boolean } from '@storybook/addon-knobs';
import { UiCalendarDaysComponent } from './ui-calendar-days.component';

export default {
  title: 'UiCalendarDaysComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: UiCalendarDaysComponent,
  props: {
    locale: text('locale', ''),
  }
})