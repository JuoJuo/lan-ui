import React, { HTMLAttributes } from 'react';
import 'bulma';
import { MainColorTypes, sizeTypes } from "../button";
import { getClassNames, getDefaultGlobalSize, getDefaultGlobalColor } from "../../utils";

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  /**
   * input边框的颜色
   */
  color?: MainColorTypes;
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
   * input类型,是否是password，默认是text
   */
  password?: boolean;
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    color = getDefaultGlobalColor(), size = getDefaultGlobalSize(),
    rounded = false,
    loading = false,
    disabled = false,
    password = false,
    ...leftProps
  } = props;

  if (loading) {
    return (
      <div className={`control ${getClassNames({ loading, size })}`}>
        <input
          className={`input ${getClassNames({ color, size, rounded })}`}
          disabled={disabled}
          type={ password ? 'password' : 'text'}
          {...leftProps}
        />
      </div>
    );
  }

  return (
    <input
      className={`input ${getClassNames({ color, size, rounded })}`}
      disabled={disabled}
      type={ password ? 'password' : 'text'}
      {...leftProps}
    />
  );
};
