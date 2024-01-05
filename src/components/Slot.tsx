import React, { memo, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { mergeClassNames, shuffle } from '../utils';
import styles from '../index.module.scss';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

interface Props {
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
  reverse?: boolean;
  sequentialAnimationMode: boolean;
  useMonospaceWidth: boolean;
  maxNumberWidth?: number;
  fontHeight: number;
}

function Slot({
  isNew,
  charClassName,
  numbersRef,
  active,
  isChanged,
  effectiveDuration,
  delay,
  value,
  startValue,
  disableStartValue,
  dummyList,
  hasSequentialDummyList,
  hasInfiniteList,
  valueClassName,
  reverse,
  sequentialAnimationMode,
  useMonospaceWidth,
  maxNumberWidth,
  fontHeight,
}: Props) {
  const [localActive, setLocalActive] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const prevValueRef = useRef<typeof value>();
  const valueRef = useRef(value);
  const itemRef = useRef<HTMLDivElement>(null);
  const [dummyListState, setDummyListState] = useState(
    hasSequentialDummyList ? dummyList : shuffle(dummyList),
  );
  // const [fontHeight, setFontHeight] = useState(0);
  const [didMount, setDidMount] = useState(false);
  const slotNumbersHeight = fontHeight * (dummyList.length + 1);

  useIsomorphicLayoutEffect(() => {
    setDidMount(true);
  }, []);

  // useIsomorphicLayoutEffect(() => {
  //   setFontHeight(itemRef.current?.offsetHeight ?? 0);
  // }, [didMount]);

  useEffect(() => {
    if (!active) {
      setLocalActive(active);
      return;
    }

    requestAnimationFrame(() => {
      setLocalActive(active);
    });
  }, [active]);

  useMemo(() => {
    if (disableStartValue) {
      prevValueRef.current = valueRef.current;
    }
  }, [disableStartValue]);

  useEffect(() => {
    if (!localActive) return;

    prevValueRef.current = valueRef.current;
    valueRef.current = value;

    setTimeout(
      () => setLocalValue(value),
      sequentialAnimationMode
        ? 0
        : (effectiveDuration * 1000 * 1.3) / dummyList.length + delay * 1000,
    );
  }, [localActive, value, effectiveDuration, delay, dummyList.length, sequentialAnimationMode]);

  useEffect(() => {
    setDummyListState(hasSequentialDummyList ? dummyList : shuffle(dummyList));
  }, [value, dummyList, hasSequentialDummyList]);

  const renderDummyList = () => {
    return dummyListState.map((dummyNumber, slotIndex) => (
      <span
        key={slotIndex}
        className={styles.num}
        aria-hidden="true"
        style={{ height: fontHeight }}
      >
        {dummyNumber}
      </span>
    ));
  };

  let topValue = reverse ? localValue : startValue ?? localValue;
  if (sequentialAnimationMode) {
    topValue = reverse ? localValue : startValue ?? prevValueRef.current ?? localValue;

    if (sequentialAnimationMode && isNew) {
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
        className={styles.numbers}
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
            <span className={styles.num} aria-hidden="true" style={{ height: fontHeight }}>
              {topValue}
            </span>
            {renderDummyList()}
            <span
              className={mergeClassNames(styles.num, valueClassName)}
              style={{ height: fontHeight }}
              ref={itemRef}
            >
              {bottomValue}
            </span>
            {hasInfiniteList ? renderDummyList() : null}
          </>
        ) : (
          <span className={styles.num} aria-hidden="true" style={{ height: fontHeight }}>
            {startValue ?? localValue}
          </span>
        )}
      </span>
    </span>
  );
}

export default memo(Slot);
