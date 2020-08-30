import React, { HTMLAttributes, useMemo } from 'react';
import 'bulma';

export type gutterTypes = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type deviceTypes = 'desktop' | 'tablet' | 'mobile' ;
export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 列与列之间的间隔距离
   */
  gutter?: gutterTypes;
  /**
   * 电脑（1024），平板（768），手机（不变，永远百分比占宽）
   * desktop: 小于1024，column换行显示（如果写了is-4）,这个col就占对应比例，右边空着。没写就是占满整行
   * tablet, desktop: 小于768，column无条件占满整行
   */
  device?: deviceTypes;
}

export const Row: React.FC<RowProps> = (props) => {
  const { gutter = '0', device = 'mobile', children, ...leftProps } = props;

  const validGutter = useMemo(() => ['0', '1', '2', '3', '4', '5', '6', '7', '8'], []);

  let gutterClass = ['columns', `is-${device}`];

  if(validGutter.indexOf(gutter) !== -1) {
    gutterClass.push('is-variable', `is-${gutter}`);
  }

  return (
    <div
      className={`${gutterClass.join(' ')}`}
      {...leftProps}
    >
      { children }
    </div>
  );
};
