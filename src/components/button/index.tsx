import React from 'react';
import './index.sass';

export interface ButtonProps {
  /**
   * 按钮背景颜色
   */
  color?: 'white' | 'light' | 'dark' | 'black' | 'text' | 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
  /**
   * 按钮大小
   */
  size?: 'small' | 'normal' | 'medium' | 'large';
  /**
   * 圆角按钮
   */
  rounded?: boolean;
  /**
   * 加载中
   */
  loading?: boolean;
  /**
   * 按钮禁用
   */
  disabled?: boolean;
  /**
   * 使背景颜色变淡
   */
  light?: boolean;
  /**
   * 是否显示外边框
   */
  outlined?: boolean;
  /**
   * 是否背景与字体颜色交换
   */
  inverted?: boolean;
  /**
   * 点击事件
   */
  onClick?: () => void;
}

function addPrefix(str: string, prefix = 'is',): string {
  return `${prefix}-${str}`;
}

const getClassNames = ({ light, outlined, inverted, rounded, loading, disabled, color, size}: Partial<ButtonProps>) => {
  const str = ['button'];

  if (light) {
    str.push(addPrefix('light'));
  }

  if (outlined) {
    str.push(addPrefix('outlined'));
  }

  if (inverted) {
    str.push(addPrefix('inverted'));
  }

  if (rounded) {
    str.push(addPrefix('rounded'));
  }

  if (loading) {
    str.push(addPrefix('loading'));
  }

  str.push(addPrefix(color!));
  str.push(addPrefix(size!));

  return str.join(' ');
};

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    light = false, outlined = false,
    inverted = false, rounded = false,
    loading = false, disabled = false,
    color = 'primary', size = 'normal',
    children,
    ...leftProps
  } = props;

  return (
    <button
      className={getClassNames({ light, outlined, inverted, rounded, loading, color, size})}
      disabled={disabled}
      {...leftProps}
    >
      { children }
    </button>
  );
};
