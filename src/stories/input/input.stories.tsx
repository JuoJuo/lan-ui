import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Input, InputProps } from '../../components/input';

export default {
  title: 'Elements/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const InputDemo = Template.bind({});

InputDemo.args = {
  color: '',
  size: 'normal',
  rounded: false,
};
