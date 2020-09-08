import React, { useEffect, useState, useRef, MutableRefObject } from 'react';
import 'bulma';
import { Input } from '../input';
import "./index.css";

export interface DatePickerProps {
  /**
   * 当前选择的日期
   */
  date: Date;
  /**
   * 日期改变的时候触发
   */
  onChange: (string) => void;
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
  let arr: Array<Date> = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start + i * 60 * 60 * 24 * 1000);
    arr.push(d);
  }
  let k = -1;
  return Array.from({ length: 6 }, () => {
    k++;
    return arr.slice(k * 7, (k + 1) * 7);
  });
};

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { onChange, date } = props;

  // const [date, setDate] = useState(value);
  const [isPanelShow, switchPanelShow] = useState(false);
  const ref: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>();
  useClickOutside(ref, () => switchPanelShow(false));

  const handleClick = () => {
    switchPanelShow(true);
  };

  function onDateChange(d) {
    onChange(d);
  }

  const handleDayChange = (checkedDate) => {
    onDateChange(checkedDate);
    switchPanelShow(false);
  };

  const yearMonthChange = (d, type) => {
    switch (type) {
      case '-year':
        d.setFullYear(d.getFullYear() - 1);
        break;
      case '-month':
        d.setMonth(d.getMonth() - 1);
        break;
      case '+year':
        d.setFullYear(d.getFullYear() + 1);
        break;
      case '+month':
        d.setMonth(d.getMonth() + 1);
        break;
      default: return;
    }

    onDateChange(new Date(d));
  };

  const renderPanel = () => {
    const year = date.getFullYear();
    const month = date.getMonth();

    if (isPanelShow) {
      const rangeDate = getDateData(year, month);

      return <>
        <article className="panel is-primary abs-layout is-size-7 w-100-p">
          <p className="p-10 panel-heading is-flex space-between">
            <span className="toolbar">
              <span className="has-text-white" onClick={() => yearMonthChange(date, '-year')}>-年</span>
              <span className="has-text-white" onClick={() => yearMonthChange(date, '-month')}>-月</span>
            </span>


            <span>{`${year}年${month + 1}月`}</span>

            <span className="toolbar">
              <span className="has-text-white" onClick={() => yearMonthChange(date, '+month')}>+月</span>
              <span className="has-text-white" onClick={() => yearMonthChange(date, '+year')}>+年</span>
            </span>

          </p>
          <div className="panel-block is-fullwidth">
            <table className="table is-bordered is-fullwidth">
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
              <tbody className="cursor-td">
              {rangeDate.map((v, index) => (
                <tr key={index}>
                  {v.map((dateItem, i) => (
                    <td
                      className={dateItem.getMonth() !== month ? 'has-text-grey': ''}
                      key={i}
                      onClick={() => handleDayChange(dateItem)}>
                      {dateItem.getDate()}
                    </td>
                  ))}
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </article>
      </>;
    }
  };

  return (
    <div ref={ref} className="is-relative">
      <Input
        value={getDateText(date)}
        onClick={handleClick}
        placeholder="选择日期"
      >

      </Input>
      { renderPanel() }
    </div>
  );
};


function getDateText(date) {
  const mm = uniLength(String(date.getMonth() + 1));
  const dd = uniLength(String(date.getDate()));

  return `${date.getFullYear()}-${mm}-${dd}`;
}

function uniLength(str) {
  return str.padStart(2, 0);
}
