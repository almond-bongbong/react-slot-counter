export type Value = string | number | string[] | JSX.Element[];

export type Direction = 'bottom-up' | 'top-down';

export type StartAnimationOptions = {
  duration?: number;
  dummyCharacterCount?: number;
  direction?: Direction;
};

export interface SlotCounterRef {
  startAnimation: (options?: StartAnimationOptions) => void;
  refreshStyles: () => void;
}
