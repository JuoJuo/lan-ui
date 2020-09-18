import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Pagination, PaginationProps } from '../../components/pagination';

export default {
    title: 'Elements/Pagination',
    component: Pagination,
} as Meta;

const Template: Story<PaginationProps> = (args) => {
    const onChange = (pageNo) => {
        console.log(pageNo);
    };

    return <>
        <Pagination total={100} pageNo={3} pageSize={10} onChange={onChange} />
    </>
};

export const Primary = Template.bind({});
Primary.args = {};
