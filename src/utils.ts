export const mergeClassNames = (...args: (any | null | undefined)[]) =>
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
