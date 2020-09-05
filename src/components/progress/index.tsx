import React from 'react';
import 'bulma';
import { MainColorTypes, sizeTypes } from "../button";
import { getClassNames, getDefaultGlobalColor, getDefaultGlobalSize } from "../../utils";
import './index.css';

export interface ProgressProps {
  /**
  * input边框的颜色
  */
  color?: MainColorTypes;
  /**
  * 按钮大小
  */
  size?: sizeTypes;
  /**
   * 同于显示的进度值
   */
  percent?: number;
}

export const Progress: React.FC<ProgressProps> = (props) => {
  const {
    color = getDefaultGlobalColor(), size = getDefaultGlobalSize(),
    percent = 0,
  } = props;

  return (
    <div className="is-relative flex">
      <progress
        max="100"
        value={percent}
        className={`mb-0 progress ${getClassNames({ color, size })}`}
      ></progress>
      <span className="absolute">{ `${percent}%` }</span>
    </div>
  );
};
