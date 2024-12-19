import React, {
  forwardRef,
  memo,
  Ref,
  RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';
import styles from '../index.module.scss';
import { mergeClassNames, shuffle } from '../utils';

export interface Props {
  index: number;
  isNew?: boolean;
  charClassName?: string;
  numbersRef: RefObject<HTMLDivElement>;
  active: boolean;
  isChanged: boolean;
  effectiveDuration: number;
  delay: number;
  value: string | number | JSX.Element;
  startValue?: string | number | JSX.Element;
  disableStartValue?: boolean;
  dummyList: (string | number | JSX.Element)[];
  hasSequentialDummyList?: boolean;
  hasInfiniteList?: boolean;
  valueClassName?: string;
  numberSlotClassName?: string;
  numberClassName?: string;
  reverse?: boolean;
  sequentialAnimationMode: boolean;
  useMonospaceWidth: boolean;
  maxNumberWidth?: number;
  onFontHeightChange?: (fontHeight: number) => void;
  speed: number;
  duration: number;
}

export interface SlotRef {
  refreshStyles: () => void;
}

function Slot(
  {
    isNew,
    charClassName,
    numbersRef,
    active,
    isChanged,
    effectiveDuration,
    delay,
    duration,
    speed,
    value,
    startValue,
    disableStartValue,
    dummyList,
    hasSequentialDummyList,
    hasInfiniteList,
    valueClassName,
    numberSlotClassName,
    numberClassName,
    reverse,
    sequentialAnimationMode,
    useMonospaceWidth,
    maxNumberWidth,
    onFontHeightChange,
  }: Props,
  ref: Ref<SlotRef>,
) {
  const [localActive, setLocalActive] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const prevValueRef = useRef<typeof value>();
  const valueRef = useRef(value);
  const itemRef = useRef<HTMLDivElement>(null);
  const [fontHeight, setFontHeight] = useState(0);
  const [dummyListState, setDummyListState] = useState(
    hasSequentialDummyList ? dummyList : shuffle(dummyList),
  );
  const [didMount, setDidMount] = useState(false);
  const slotNumbersHeight = fontHeight * (dummyList.length + 1);

  useIsomorphicLayoutEffect(() => {
    setDidMount(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    setFontHeight(itemRef.current?.getBoundingClientRect().height ?? 0);
  }, [didMount]);

  useEffect(() => {
    if (!active) {
      setLocalActive(active);
      return;
    }

    requestAnimationFrame(() => {
      setLocalActive(active);
    });
  }, [active]);

  useEffect(() => {
    const numberElement = itemRef.current;

    if (!fontHeight || !numberElement || typeof ResizeObserver === 'undefined') {
      return;
    }

    // 1px is the threshold for the font height to be considered changed
    const THRESHOLD = 1;

    const handleResize: ResizeObserverCallback = (entries) => {
      // Change in height
      const height = entries[0].contentRect.height;

      if (Math.abs(fontHeight - height) > THRESHOLD) {
        onFontHeightChange?.(height);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(numberElement);

    return () => {
      observer.disconnect();
    };
  }, [fontHeight, onFontHeightChange]);

  useMemo(() => {
    if (disableStartValue) {
      prevValueRef.current = valueRef.current;
    }
  }, [disableStartValue]);

  useEffect(() => {
    if (!localActive) return;

    prevValueRef.current = valueRef.current;
    valueRef.current = value;

    // Do not clear timeout here because it top value is changed early
    setTimeout(
      () => setLocalValue(value),
      sequentialAnimationMode
        ? 0
        : (effectiveDuration * speed * duration * 1000) / dummyList.length + delay * 1000,
    );
  }, [
    localActive,
    value,
    effectiveDuration,
    delay,
    dummyList.length,
    sequentialAnimationMode,
    speed,
    duration,
  ]);

  useEffect(() => {
    setDummyListState(hasSequentialDummyList ? dummyList : shuffle(dummyList));
  }, [value, dummyList, hasSequentialDummyList]);

  useImperativeHandle(ref, () => ({
    // Refresh styles
    refreshStyles: () => {
      // Prevent animation from being triggered
      setLocalActive(true);

      // Update font height
      setFontHeight(itemRef.current?.getBoundingClientRect().height ?? 0);

      // Reset animation
      requestAnimationFrame(() => {
        setLocalActive(false);
      });
    },
  }));

  const renderDummyList = () => {
    return dummyListState.map((dummyNumber, slotIndex) => (
      <span
        key={slotIndex}
        className={mergeClassNames(styles.num, numberClassName)}
        aria-hidden="true"
      >
        {dummyNumber}
      </span>
    ));
  };

  let topValue = reverse ? localValue : startValue ?? localValue;
  if (sequentialAnimationMode) {
    topValue = reverse ? localValue : startValue ?? prevValueRef.current ?? localValue;

    if (sequentialAnimationMode && isNew && !reverse) {
      topValue = '';
    }
  }

  let bottomValue = reverse ? startValue ?? localValue : localValue;
  if (sequentialAnimationMode) {
    bottomValue = reverse ? startValue ?? prevValueRef.current ?? localValue : localValue;
  }

  return (
    <span
      className={mergeClassNames(styles.slot, charClassName)}
      style={{
        display: 'inline-block',
        width: didMount && useMonospaceWidth ? maxNumberWidth : undefined,
        height: didMount ? fontHeight : undefined,
      }}
    >
      <span
        ref={numbersRef}
        className={mergeClassNames(styles.numbers, numberSlotClassName)}
        style={{
          transition: 'none',
          transform: reverse ? `translateY(-${slotNumbersHeight}px)` : `translateY(0px)`,
          ...(localActive &&
            isChanged && {
              transform: reverse ? `translateY(0px)` : `translateY(-${slotNumbersHeight}px)`,
              transition: `transform ${effectiveDuration}s ${delay}s ease-in-out`,
            }),
        }}
      >
        {didMount ? (
          <>
            <span
              className={mergeClassNames(styles.num, numberClassName)}
              aria-hidden="true"
              style={{ height: fontHeight }}
            >
              {topValue}
            </span>
            {renderDummyList()}
            <span
              className={mergeClassNames(styles.num, numberClassName, valueClassName)}
              ref={itemRef}
            >
              {bottomValue}
            </span>
            {hasInfiniteList ? renderDummyList() : null}
          </>
        ) : (
          <span className={mergeClassNames(styles.num, numberClassName)} aria-hidden="true">
            {startValue ?? localValue}
          </span>
        )}
      </span>
    </span>
  );
}

export default memo(forwardRef(Slot));
