import React, { useState, useCallback } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Modal, ModalProps } from '../../components/modal';
import { Button } from '../../components/button';

export default {
  title: 'Elements/Modal',
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args) => {

  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const onOk = useCallback(() => {
    setVisible(false);
  }, []);
  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);

  return <>
    <Button onClick={handleClick}>打开弹窗</Button>
    <Modal {...args} visible={visible} onOk={onOk} onCancel={onCancel}>
      <div>
        我是内容区域
      </div>
    </Modal>
  </>;
};

export const ModalDemo = Template.bind({});
ModalDemo.args = {
  title: 'modal title',
  visible: false,
  onOk: () => {},
  onCancel: () => {},
};


const Template2: Story<ModalProps> = ({ customTitle }) => {

  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const onOk = useCallback(() => {
    setVisible(false);
  }, []);
  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);

  return <>
    <Button onClick={handleClick}>自定义HeaderTitle</Button>
    <Modal customTitle={customTitle} visible={visible} onOk={onOk} onCancel={onCancel}>
      <div>
        我是内容区域
      </div>
    </Modal>
  </>;
};
export const CustomTitle = Template2.bind({});

CustomTitle.args = {
  visible: false,
  customTitle: (<header className="modal-card-head">
    <p className="modal-card-title">title随便改
      <Button>test</Button>
    </p>
    <button className="delete"></button>
  </header>),
  onOk: () => {},
  onCancel: () => {},
};


const Template3: Story<ModalProps> = ({ customFooter }) => {

  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const onOk = useCallback(() => {
    setVisible(false);
  }, []);
  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);

  return <>
    <Button onClick={handleClick}>自定义Footer</Button>
    <Modal customFooter={customFooter} visible={visible} onOk={onOk} onCancel={onCancel}>
      <div>
        我是内容区域
      </div>
    </Modal>
  </>;
};
export const CustomFooter = Template3.bind({});

CustomFooter.args = {
  visible: false,
  title: '测试title',
  customFooter: (
    <footer className='modal-card-foot'>
      <Button style={{marginRight: '100px'}}>ok1</Button>
      <Button color='info'>ok2</Button>
      <Button color='info'>ok3</Button>
    </footer>
  ),
  onOk: () => {},
  onCancel: () => {},
};
