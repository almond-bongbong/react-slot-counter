export type Value = string | number | string[] | JSX.Element[];

export type StartAnimationOptions = {
  duration?: number;
  dummyCharacterCount?: number;
  direction?: 'bottom-up' | 'top-down';
};

export interface SlotCounterRef {
  startAnimation: (options?: StartAnimationOptions) => void;
}
