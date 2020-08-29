import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
// @ts-ignore
import { Button, ButtonProps } from '@/components/button';

export default {
  title: 'Elements/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const ButtonDemo = Template.bind({});

ButtonDemo.args = {
  color: '',
  size: 'normal',
  children: 'OK',
  rounded: false,
  loading: false,
  disabled: false,
  light: false,
  outlined: false,
  inverted: false,
};
