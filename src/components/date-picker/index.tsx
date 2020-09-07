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

const getDateData = function(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  let weekDay = firstDay.getDay(); //周日，0，周六 6
  weekDay = weekDay === 0 ? 7 : weekDay;
  let start = firstDay.getTime() - weekDay * 60 * 60 * 24 * 1000;
  let arr: number[] = [];
  for (let i = 0; i < 42; i++) {
    arr.push(new Date(start + i * 60 * 60 * 24 * 1000).getDate());
  }
  let k = -1;
  return Array.from({ length: 6 }, () => {
    k++;
    return arr.slice(k * 7, (k + 1) * 7);
  });
};
getDateData(2020, 8)

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
      const dayData = getDateData(new Date().getFullYear(), new Date().getMonth());

      return <>
        <div style={{backgroundColor: 'red', transition: 'all 2000 cubic-bezier(0.23, 1, 0.32, 1)'}}>
          <h1>标题</h1>

          <table>
            <thead>
              <tr>
                <th>日</th>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
              </tr>
            </thead>
            <tbody>
              {dayData.map((v, index) => (
                <tr key={index}>
                  {v.map((k, i) => (
                    <td key={i}>{k}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
