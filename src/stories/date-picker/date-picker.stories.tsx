import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { DatePicker, DatePickerProps } from '../../components/date-picker';
import { Row } from '../../components/row';
import { Col } from '../../components/col';

export default {
  title: 'Elements/DatePicker',
  component: DatePicker,
} as Meta;

const Template: Story<DatePickerProps> = (args) => <>
  <Row>
    <Col span='2'>
      <DatePicker {...args} />
    </Col>
  </Row>
</>;

export const PickerDemo = Template.bind({});
PickerDemo.args = {
  color: 'primary',
  size: 'normal',
};
