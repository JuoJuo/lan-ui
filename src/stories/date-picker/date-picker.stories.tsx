import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { DatePicker, DatePickerProps } from '../../components/date-picker';
import { Row } from '../../components/row';
import { Col } from '../../components/col';

export default {
  title: 'Elements/DatePicker',
  component: DatePicker,
} as Meta;

const Template: Story<DatePickerProps> = () => {
  const [v, setV] = useState(new Date());

  return <>
    <Row>
      <Col span='2'>
        <DatePicker date={v} onChange={ newDate => setV(newDate)}/>
      </Col>
    </Row>
  </>
};

export const PickerDemo = Template.bind({});
PickerDemo.args = {};
