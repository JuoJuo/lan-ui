import React, { HTMLAttributes, useMemo } from 'react';
import 'bulma';

export type spanTypes = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' ;
export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 列的宽度
   */
  span?: spanTypes;
}

export const Col: React.FC<ColProps> = (props) => {
  const { span, children, ...leftProps } = props;

  const spanClassArr = ['column'];
  const validSpan = useMemo(() => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], []);

  if (validSpan.indexOf(span!) !== -1) {
    spanClassArr.push(`is-${span}`);
  }

  return (
    <div
      className={`${spanClassArr.join(' ')}`}
      {...leftProps}
    >
      { children }
    </div>
  );
};
