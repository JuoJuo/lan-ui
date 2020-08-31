import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Tree, TreeProps } from '../../components/tree';

export default {
  title: 'Elements/Tree',
  component: Tree,
} as Meta;

const Template: Story<TreeProps> = (args) => <Tree {...args} />;

export const TreeDemo = Template.bind({});

const data = [
  {
    value: 'xxx',
    children: [
      {
        value: 'xxx--1',
        children: [
          {
            value: 'xxx--1--1',
          },
        ],
      },
      {
        value: 'xxx--2',
        children: [],
      }
    ],
  },
  {
    value: 'yyy',
    children: [],
  },
  {
    value: 'zzz',
    children: [
      {
        value: 'zzz-001',
        children: [],
      },
    ],
  },
];
TreeDemo.args = {
  treeData: data,
};
