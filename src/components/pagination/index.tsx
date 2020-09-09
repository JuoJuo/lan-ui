import React, { useMemo } from 'react';
import 'bulma';

export interface PaginationProps {
  /**
  * 总条数
  */
  total?: number;
  /**
  * 每页多少条
  */
  pageSize?: number;
  /**
  * 当前多少页
  */
  pageNo?: number;
}

function calcPage(total, pageNo, pageSize) {
  const pageCountMore = total % pageSize;
  const totalPage = pageCountMore === 0 ? total / pageSize : total / pageSize + 1;

  let arr = [];
  if (totalPage < 8) {
    for(let i = 0; i < total; i++) {
      arr.push(i + 1);
    }
  } else {
    const middlePageNo = totalPage / 2;

    if (pageNo - 2 === 1) {
      for (let i = 0; i < pageNo; i++) {
        arr = [...arr, i + 1];
      }
    } else if (pageNo - 2 < 1) {
      for (let i = 0; i < pageNo; i++) {
        arr = [...arr, i + 1, null];
      }
    }else {
      arr = [1, null, pageNo - 2, pageNo - 1, pageNo];
    }

    if (pageNo + 2 >= totalPage) {
      for (let i = pageNo; i < totalPage; i++) {
        arr = [...arr, pageNo + 1];
      }
    } else {
      arr = [...arr, middlePageNo + 1 , middlePageNo + 2, null, totalPage];
    }
  }

  return arr;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { total = 0, pageSize = 10, pageNo = 1 } = props;

  const arr = useMemo(() => calcPage(total, pageNo, pageSize), [total, pageNo, pageSize]);

  return <>
    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
      <a className="pagination-previous">Previous</a>
      <a className="pagination-next">Next page</a>
      <ul className="pagination-list">
        {
          arr.map((i) => {
            let temp = <li key={i}>
              <a className={`pagination-link ${i === pageNo ? 'is-current' : ''}`}>{i}</a>
            </li>;

            if (i === null) {
              temp = <li key={i}><span className="pagination-ellipsis">&hellip;</span></li>
            }

            return temp;
          })
        }
      </ul>
    </nav>
  </>;
};
