import React from 'react';
import 'bulma';
import { getDefaultGlobalSize, getDefaultGlobalColor, getClassNames } from '../../utils';

export type sizeTypes = 'small' | 'normal' | 'medium' | 'large';
export type MainColorTypes = 'primary' | 'info' | 'success' | 'warning' | 'danger' | '';
export type colorTypes  = 'white' | 'light' | 'dark' | 'black' | 'text' | 'link';
/*
* docs uses
* */
export interface ButtonProps {
  /**
   * 按钮背景颜色
   */
  color?: MainColorTypes | colorTypes;
  /**
   * 按钮大小
   */
  size?: sizeTypes;
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

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    light = false, outlined = false,
    inverted = false, rounded = false,
    loading = false, disabled = false,
    color = getDefaultGlobalColor(), size = getDefaultGlobalSize(),
    children,
    ...leftProps
  } = props;

  return (
    <button
      className={`button ${getClassNames({ light, outlined, inverted, rounded, loading, color, size })}`}
      disabled={disabled}
      {...leftProps}
    >
      { children }
    </button>
  );
};
