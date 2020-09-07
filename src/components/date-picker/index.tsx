import React, { useEffect, useState, useRef, useMemo } from 'react';
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
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    window.addEventListener("click", listener);

    return () => window.removeEventListener("click", listener);
  }, [ref, handler]);
}

export function useStateAnimation(parentSetState: (v: boolean) => void, delay: number = 300): [boolean, (v: boolean) => void, () => void] {
  const [state, setState] = useState(true);
  const [innerClose, unmount] = useMemo(() => {
    let timer: number;
    let innerclose = (v: boolean) => {
      setState(v);
      timer = window.setTimeout(() => {
        parentSetState(v);
        setState(true);
      }, 0);
    };
    let unmount = () => window.clearTimeout(timer);
    return [innerclose, unmount];
  }, [setState, parentSetState, delay]);

  return [state, innerClose, unmount];
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const [state, setState] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleClick = () => {
    setShow(true);
  };

  const ref = useRef<HTMLDivElement>(null);

  const [st, setst, unmount] = useStateAnimation(setShow, 200);
  useClickOutside(ref, () => setst(false));
  const render = useMemo(() => {
    if (!show) {
      unmount();
      return null;
    }

    return <>
      <div style={{backgroundColor: 'red', transition: 'all 2000 cubic-bezier(0.23, 1, 0.32, 1)'}}>
        我是弹框
      </div>
    </>;
  }, [show, unmount, st]);

  return (
    <div ref={ref}>
      <Input>

      </Input>
      {/*<input*/}
        {/*value={state}*/}
        {/*onChange={handleChange}*/}
        {/*onClick={handleClick}*/}
      {/*></input>*/}
      {render}
    </div>
  );
};
