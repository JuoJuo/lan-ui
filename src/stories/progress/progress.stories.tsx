import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Progress, ProgressProps } from '../../components/progress';
import { Row } from '../../components/row';
import { Col } from '../../components/col';

export default {
  title: 'Elements/Progress',
  component: Progress,
} as Meta;

const Template: Story<ProgressProps> = (args) => <>
  <Row>
    <Col span="2"><Progress {...args} ></Progress></Col>
    <Col span="3"><Progress {...args} color="link"></Progress></Col>
  </Row>

  <Row>
    <Col span="4"><Progress {...args} color="success"></Progress></Col>
    <Col span="5"><Progress {...args} color="warning"></Progress></Col>
  </Row>

  <Row>
    <Col span="6"><Progress {...args} color="danger"></Progress></Col>
    <Col span="2"><Progress {...args} color="info"></Progress></Col>
  </Row>
</>;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  size: 'normal',
  percent: 80,
};
