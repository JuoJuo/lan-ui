import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { DatePicker, DatePickerProps } from '../../components/date-picker';

export default {
  title: 'Elements/DatePicker',
  component: DatePicker,
} as Meta;

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export const PickerDemo = Template.bind({});
PickerDemo.args = {
  color: 'primary',
  size: 'normal',
};
