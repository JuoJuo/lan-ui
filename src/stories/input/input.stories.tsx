import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Input, InputProps } from '../../components/input';
import { Row } from '../../components/row';
import { Col } from '../../components/col';

export default {
  title: 'Elements/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => {
  const [name, setName] = useState('');

  return (
    <>
      <Row>
        <Col span='6'>
          <Input {...args} placeholder='please enter username' value={name} onChange={setName}/>
        </Col>
      </Row>
    </>
  );
};

export const InputDemo = Template.bind({});

InputDemo.args = {
  color: '',
  size: 'normal',
  rounded: false,
  password: false,
};
