import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Row, RowProps } from '../../components/row';
import { Col } from '../../components/col';

export default {
  title: 'Elements/Row',
  component: Row,
} as Meta;

const colStyles = {
  backgroundColor: '#00d1b2',
  borderRadius: '4px',
  padding: '1.25rem 0',
  color: '#fff',
  textAlign: 'center',
} as React.CSSProperties;

const Template: Story<RowProps> = (args) => (
  <Row {...args}>
    <Col span='3'>
      <p style={colStyles}>3份</p>
    </Col>
    <Col span='9'>
      <p style={colStyles}>9份</p>
    </Col>
  </Row>
);

export const RowDemo = Template.bind({});

RowDemo.args = {
  gutter: '1',
  device: 'mobile',
};
