import { sizeTypes, ButtonProps, MainColorTypes, colorTypes } from "../components/button";

let defaultSize: sizeTypes = 'normal';
type defaultColorTypes = MainColorTypes | colorTypes;
let defaultColor: defaultColorTypes = '';

export function getDefaultGlobalSize(): sizeTypes{
  return defaultSize;
}

export function setDefaultGlobalSize(size: sizeTypes) {
  defaultSize = size;
}

export function getDefaultGlobalColor(): defaultColorTypes{
  return defaultColor;
}

export function setDefaultGlobalColor(color: MainColorTypes | colorTypes) {
  defaultColor = color;
}

function addPrefix(str: string, prefix = 'is',): string {
  return `${prefix}-${str}`;
}

export function cloneDeep(obj: any){
  if(obj === null) return null;
  if(typeof obj !== 'object') return obj;
  if(obj instanceof RegExp) return new RegExp(obj);
  if(obj instanceof Date) return new Date(obj);

  let newObj = new obj.constructor();
  for(let key in obj) {
    newObj[key] = cloneDeep(obj[key])
  }
  return newObj;
}

export const getClassNames = ({ light, outlined, inverted, rounded, loading, color, size}: Partial<ButtonProps>) => {
  const str = [];

  if (light) {
    str.push(addPrefix('light'));
  }

  if (outlined) {
    str.push(addPrefix('outlined'));
  }

  if (inverted) {
    str.push(addPrefix('inverted'));
  }

  if (rounded) {
    str.push(addPrefix('rounded'));
  }

  if (loading) {
    str.push(addPrefix('loading'));
  }

  if (!!color) {
    str.push(addPrefix(color!));
  }

  if (size) {
    str.push(addPrefix(size!));
  }

  return str.join(' ');
};
