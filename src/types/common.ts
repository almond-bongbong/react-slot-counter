/**
 * The type of the value to be displayed.
 */
export type Value = string | number | string[] | JSX.Element[];

/**
 * The direction of the animation.
 */
export type Direction = 'bottom-up' | 'top-down';

/**
 * The options for the start animation.
 */
export type StartAnimationOptions = {
  duration?: number;
  dummyCharacterCount?: number;
  direction?: Direction;
};

/**
 * The ref of the SlotCounter component.
 */
export interface SlotCounterRef {
  startAnimation: (options?: StartAnimationOptions) => void;
  refreshStyles: () => void;
  reload: () => void;
}

/**
 * The options for the animate on visible.
 */
export interface AnimateOnVisibleOptions {
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * The props of the SlotCounter component.
 */
export interface Props {
  value: Value;
  startValue?: Value;
  startValueOnce?: boolean;
  duration?: number;
  speed?: number;
  delay?: number;
  dummyCharacters?: string[] | JSX.Element[];
  dummyCharacterCount?: number;
  autoAnimationStart?: boolean;
  animateUnchanged?: boolean;
  hasInfiniteList?: boolean;
  containerClassName?: string;
  charClassName?: string;
  separatorClassName?: string;
  valueClassName?: string;
  numberSlotClassName?: string;
  numberClassName?: string;
  sequentialAnimationMode?: boolean;
  useMonospaceWidth?: boolean;
  direction?: Direction;
  debounceDelay?: number;
  animateOnVisible?: boolean | AnimateOnVisibleOptions;
  startFromLastDigit?: boolean;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
  separatorCharacters?: string[];
  isSeparatorCharacter?: ((value: string | JSX.Element) => boolean) | null;
  slotPeek?: number;
}
