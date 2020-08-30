import React, { HTMLAttributes, ReactNode } from 'react';
import 'bulma';
import { Button } from '../button';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 弹窗左侧标题，可以使用customTitle自定义
   */
  title?: string;
  /**
   * 自定义顶部title区域
   */
  customTitle ?: ReactNode;
  /**
   * 自定义顶部footer按钮区域
   */
  customFooter ?: ReactNode;
  /**
   * 默认弹窗是隐藏的，设为true为显示
   */
  visible?: boolean;
  /**
   * 点击确认的事件回调
   */
  onOk: React.MouseEventHandler<HTMLElement>;
  /**
   * 点击取消的事件回调
   */
  onCancel: React.MouseEventHandler<HTMLElement>;
}

function getVisibalClass(visible: boolean): string {
  return visible ? 'is-active' : '';
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { title, visible = false, onOk, onCancel, customTitle, customFooter, children } = props;

  const visibleClass = getVisibalClass(visible);

  return (
    <div className={`modal ${visibleClass}`}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        {
          customTitle ? customTitle : <>
            <header className='modal-card-head'>
              <p className='modal-card-title'>{ title }</p>
              <button className='delete' onClick={onCancel}></button>
            </header>
          </>
        }
        <section className='modal-card-body'>
          { children }
        </section>

        {
          customFooter ? customFooter : <>
            <footer className='modal-card-foot'>
              <Button onClick={onOk}>Cancel</Button>
              <Button color='info' onClick={onCancel}>Save changes</Button>
            </footer>
          </>
        }
      </div>
    </div>
  );
};
