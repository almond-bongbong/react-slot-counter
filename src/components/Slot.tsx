import React, { memo, RefObject, useEffect, useRef, useState } from 'react';
import { isNumeric, mergeClassNames, range, shuffle } from '../utils';
import styles from '../index.module.scss';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

interface Props {
  charClassName?: string;
  numbersRef: RefObject<HTMLDivElement>;
  active: boolean;
  isChanged: boolean;
  effectiveDuration: number;
  delay: number;
  value: string | number | JSX.Element;
  startValue?: string | number | JSX.Element;
  dummyList: (string | number | JSX.Element)[];
  hasInfiniteList?: boolean;
  valueClassName?: string;
  reverse?: boolean;
  sequentialAnimationMode: boolean;
  useMonospaceWidth: boolean;
}

function Slot({
  charClassName,
  numbersRef,
  active,
  isChanged,
  effectiveDuration,
  delay,
  value,
  startValue,
  dummyList,
  hasInfiniteList,
  valueClassName,
  reverse,
  sequentialAnimationMode,
  useMonospaceWidth,
}: Props) {
  const [localActive, setLocalActive] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const prevValueRef = useRef<typeof value>();
  const valueRef = useRef(value);
  const itemRef = useRef<HTMLDivElement>(null);
  const [dummyListState, setDummyListState] = useState(
    sequentialAnimationMode ? dummyList : shuffle(dummyList),
  );
  const [fontHeight, setFontHeight] = useState(0);
  const [maxNumberWidth, setMaxNumberWidth] = useState(0);
  const slotNumbersHeight = fontHeight * (dummyList.length + 1);
  const isNumericValue = typeof value !== 'object' && isNumeric(value);

  useIsomorphicLayoutEffect(() => {
    setFontHeight(itemRef.current?.offsetHeight ?? 0);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!isNumericValue || !useMonospaceWidth) return;

    const widthList = range(0, 10).map((i) => {
      const testElement = document.createElement('div');
      testElement.style.position = 'absolute';
      testElement.style.top = '0';
      testElement.style.left = '-9999px';
      testElement.style.visibility = 'hidden';
      testElement.textContent = i.toString();
      itemRef.current?.appendChild(testElement);
      const width = testElement.getBoundingClientRect().width;
      itemRef.current?.removeChild(testElement);
      return width;
    });
    const maxWidth = Math.max(...widthList);
    setMaxNumberWidth(maxWidth);
  }, [isNumericValue, useMonospaceWidth]);

  useEffect(() => {
    setLocalActive(active);
  }, [active]);

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
  }, [
    localActive,
    value,
    effectiveDuration,
    delay,
    dummyList.length,
    sequentialAnimationMode,
  ]);

  useEffect(() => {
    setDummyListState(sequentialAnimationMode ? dummyList : shuffle(dummyList));
  }, [value, dummyList, sequentialAnimationMode]);

  const renderDummyList = () => {
    return dummyListState.map((dummyNumber, slotIndex) => (
      <div key={slotIndex} className={styles.num} aria-hidden="true">
        {dummyNumber}
      </div>
    ));
  };

  return (
    <div
      className={mergeClassNames(styles.slot, charClassName)}
      style={{
        width: useMonospaceWidth ? maxNumberWidth : undefined,
        height: fontHeight,
      }}
    >
      <div
        ref={numbersRef}
        className={styles.numbers}
        style={{
          transition: 'none',
          transform: reverse
            ? `translateY(-${slotNumbersHeight}px)`
            : `translateY(0px)`,
          ...(localActive &&
            isChanged && {
              transform: reverse
                ? `translateY(0px)`
                : `translateY(-${slotNumbersHeight}px)`,
              transition: `transform ${effectiveDuration}s ${delay}s ease-in-out`,
            }),
        }}
      >
        <div
          className={styles.num}
          aria-hidden="true"
          style={{ height: fontHeight }}
        >
          {sequentialAnimationMode &&
            (reverse ? localValue : prevValueRef.current)}
          {!sequentialAnimationMode && (startValue ?? localValue)}
        </div>
        {renderDummyList()}
        <div
          className={mergeClassNames(styles.num, valueClassName)}
          ref={itemRef}
        >
          {!sequentialAnimationMode && localValue}
          {sequentialAnimationMode &&
            (reverse ? prevValueRef.current : localValue)}
        </div>
        {hasInfiniteList ? renderDummyList() : null}
      </div>
    </div>
  );
}

export default memo(Slot);
