export const mergeClassNames = (...args: (string | null | undefined)[]) =>
  args.filter(Boolean).join(' ');

export const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push(i);
  }
  return result;
};

export const random = (min: number, max: number) => {
  const r = Math.random() * (max - min);
  return Math.floor(r + min);
};

export const shuffle = (arr: (number | string)[]) => {
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

export const isNumeric = (value: string | string[] | number) =>
  !Number.isNaN(toNumeric(value));
