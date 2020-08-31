import React, { useState } from 'react';
import 'bulma';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

type treeDataType = {
  value: string,
  id?: string,
  children?: Array<treeDataType>,
  level?: number,
  expand?: boolean,
  parent?: treeDataType | null,
};

function flatten(list: Array<treeDataType> = [], level: number = 1, parent: treeDataType['parent'] = null, defaultExpand = true): Array<treeDataType> {
  const rs: Array<treeDataType> = [];

  function inner_flatten(list: Array<treeDataType>, level: number, parent:treeDataType['parent'], defaultExpand:boolean) {
    if (!list) return;

    list.forEach((item, i) => {
      item.level = level;
      item.parent = parent;
      item.expand = i === 0 ? true : defaultExpand;
      item.id = item.id ? item.id : uuidv4();

      rs.push(item);

      inner_flatten(item.children!, level + 1, item, defaultExpand);
    });
  }

  inner_flatten(list, level, parent, defaultExpand);

  return rs;
}

function reverseChildExpand(children: treeDataType['children'] = []) {
  debugger
  if (children.length === 0) return;

  children.forEach((data: treeDataType) => {
    data.expand = false;
    reverseChildExpand(data.children);
  })
}

export interface TreeProps {
  /**
   * 树的源数据
   */
  treeData: Array<treeDataType>;
}

export const Tree: React.FC<TreeProps> = (props) => {
  const { treeData = [] } = props;

  const [flattenedData , setFlattenedData] = useState(flatten(treeData));

  const handleClick = (item: treeDataType) => {
    reverseChildExpand(item.children);
    setFlattenedData([...flattenedData]);
    console.log(flattenedData);
  };

  console.log('render');
  return <>
    <ul>
      {
        flattenedData.map((item) => (
          <li
            key={item.id}
            onClick={ () => handleClick(item)}
            className='is-light test'
            style={{
              paddingLeft: `${20 * item.level!}px`,
              cursor: "pointer",
            }}
          >
            { item.value }
          </li>
        ))
      }
    </ul>
  </>;
};
