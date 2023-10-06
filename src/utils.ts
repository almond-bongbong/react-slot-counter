import { Value } from './types/common';

export const mergeClassNames = (...args: (string | null | undefined)[]) =>
  args.filter(Boolean).join(' ');

export const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push(i);
  }
  return result;
};

export const generateCyclicRange = (start: number, end: number) => {
  const result = [];
  let num = start;
  while (num !== end) {
    result.push(num);
    num += 1;
    if (num === 10) num = 0;
  }
  return result;
};

export const random = (min: number, max: number) => {
  const r = Math.random() * (max - min);
  return Math.floor(r + min);
};

export const shuffle = (arr: (number | string | JSX.Element)[]) => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const toNumeric = (value: string | string[] | number) => {
  if (typeof value === 'number') return value;

  const str = Array.isArray(value) ? value.join('') : value;
  return str.replace(/[,.]/g, '');
};

export const isNumeric = (value: Value): value is string | string[] | number =>
  typeof value !== 'object' && !Number.isNaN(toNumeric(value));

export const isJSXElement = (value: string | number | JSX.Element): value is JSX.Element =>
  typeof value === 'object';

export const isJSXElementArray = (value: Value): value is JSX.Element[] =>
  Array.isArray(value) && isJSXElement(value[0]);
