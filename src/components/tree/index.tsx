import React, { useMemo, useState } from 'react';
import 'bulma';
import { v4 as uuidv4 } from 'uuid';
import './index.css';
import { cloneDeep } from '../../utils';

type treeDataType = {
  value: string,
  id?: string,
  children?: Array<treeDataType>,
  level?: number,
  expand?: boolean,
  visible?: boolean,
  parent?: treeDataType | null,
};

function flatten(list: Array<treeDataType> = [], level: number = 1, parent: treeDataType['parent'] = null, defaultExpand = true, visible = true): Array<treeDataType> {
  const rs: Array<treeDataType> = [];

  function inner_flatten(list: Array<treeDataType>, level: number, parent:treeDataType['parent'], defaultExpand:boolean) {
    if (!list) return;

    list.forEach((item, i) => {
      item.level = level;
      item.parent = parent;
      item.visible = visible;
      item.expand = i === 0 ? true : defaultExpand;
      item.id = item.id ? item.id : uuidv4();

      rs.push(item);

      inner_flatten(item.children!, level + 1, item, defaultExpand);
    });
  }

  inner_flatten(list, level, parent, defaultExpand);

  return rs;
}

function reverseChildExpand(item : treeDataType){
  if (item.children && item.children.length !== 0) {
    item.expand = !item.expand;
  }

  function _fn(rowData: treeDataType) {
    const { children = [] } = rowData;
    if (children.length === 0) return;

    children.forEach((data: treeDataType) => {
      data.visible = item.expand;
      _fn(data);
    })
  }

  _fn(item);
}

export interface TreeProps {
  /**
   * 树的源数据
   */
  treeData: Array<treeDataType>;
}

export const Tree: React.FC<TreeProps> = (props) => {
  const { treeData = [] } = props;

  const flattenedData = useMemo(() => {
    const mTreeData = cloneDeep(treeData);
    return flatten(mTreeData);
  }, [treeData]);

  const updateComponent = useState(0)[1];

  const handleClick = (item: treeDataType) => {
    reverseChildExpand(item);
    updateComponent(n => n + 1);
  };

  return <>
    <ul className="user-select-none">
      {
        flattenedData
          .filter(({ visible }) => visible)
          .map((item) => (
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
