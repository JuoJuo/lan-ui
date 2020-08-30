import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Row } from '../../components/row';
import { Col, ColProps } from '../../components/col';

export default {
  title: 'Elements/Col',
  component: Col,
} as Meta;

const colStyles = {
  backgroundColor: '#00d1b2',
  borderRadius: '4px',
  padding: '1.25rem 0',
  color: '#fff',
  textAlign: 'center',
} as React.CSSProperties;

const Template: Story<ColProps> = (args) => (
  <Row >
    <Col {...args}>
      <p style={colStyles}>{args.span}</p>
    </Col>
  </Row>
);

export const ColDemo = Template.bind({});

ColDemo.args = {
  span: '1',
};
