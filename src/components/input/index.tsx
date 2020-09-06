import React, { HTMLAttributes, MutableRefObject, useCallback, useMemo, useRef } from 'react';
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
  /**
   * input框输入的值
   */
  value?: string;
  /**
   * input的change事件
   */
  onChange?: (string) => void;
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    color = getDefaultGlobalColor(), size = getDefaultGlobalSize(),
    rounded = false,
    loading = false,
    disabled = false,
    password = false,
    value = '',
    onChange = (string) => {},
  } = props;

  const inputRef: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>();

  const getInputJSX = () => {

    function _onChange() {
      debugger
      onChange(inputRef.current.value);
    }

    return <input
      className={`input ${getClassNames({ color, size, rounded })}`}
      disabled={disabled}
      type={ password ? 'password' : 'text'}
      value={value}
      onChange={_onChange}
      ref={inputRef}
    />
  };


  const getInputRefCallBack = useCallback(getInputJSX, []);

  const inputJsx = useMemo(() => getInputRefCallBack(),
    [color, size, rounded, loading, disabled, password, value, onChange]);

  if (loading) {
    return (
      <div className={`control ${getClassNames({ loading, size })}`}>
        {inputJsx}
      </div>
    );
  }

  return inputJsx;
};
