import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Upload, UploadProps } from '../../components/upload';
import { CancelTokenSource } from "axios";

export default {
  title: 'Elements/Upload',
  component: Upload,
} as Meta;

const Template: Story<UploadProps> = (args) => {
  const onChange = (e, fileList) => {
    console.log('onChange', fileList);
  };

  const onClick = (e) => {
    console.log('onClick');
  };

  const onProgress = (percentage: number, file: File, source: CancelTokenSource) => {
    console.log(percentage);
  };

  const onSuccess = (file) => {
    console.log('onSuccess', file);
  };

  const onError = (file) => {
    console.log('onError', file);
  };

  const config = {
    url: "http://localhost/upload",
  };

  return <>
    <Upload
      config={config}
      onError={onError}
      onSuccess={onSuccess}
      onChange={onChange}
      onClick={onClick}
      onProgress={onProgress}/>
  </>
};

export const Primary = Template.bind({});
Primary.args = {};
