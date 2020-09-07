import React, { useEffect, useState, useRef, useMemo, MutableRefObject } from 'react';
import 'bulma';
import { MainColorTypes, sizeTypes } from "../button";
import { Input } from '../input';
import { getClassNames, getDefaultGlobalSize } from "../../utils";

export interface DatePickerProps {
  /**
   * input边框的颜色
   */
  color?: MainColorTypes;
  /**
   * 按钮大小
   */
  size?: sizeTypes;
}

export function useClickOutside(ref: React.RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    window.addEventListener("click", listener);

    return () => window.removeEventListener("click", listener);
  }, [ref, handler]);
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const [date, setDate] = useState('');
  const [isPanelShow, switchPanelShow] = useState(false);
  const ref: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>();
  useClickOutside(ref, () => switchPanelShow(false));

  const handleClick = () => {
    switchPanelShow(true);
  };

  const renderPanel = () => {
    if (isPanelShow) {
      return <>
        <div style={{backgroundColor: 'red', transition: 'all 2000 cubic-bezier(0.23, 1, 0.32, 1)'}}>
          我是弹框
        </div>
      </>;
    }
  };

  return (
    <div ref={ref}>
      <Input
        value={date}
        onClick={handleClick}
      >

      </Input>
      { renderPanel() }
    </div>
  );
};
