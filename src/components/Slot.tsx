import React, { memo, RefObject, useEffect, useRef, useState } from 'react';
import { mergeClassNames, shuffle } from '../utils';
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
}: Props) {
  const [localActive, setLocalActive] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const prevValueRef = useRef<typeof value>();
  const valueRef = useRef(value);
  const itemRef = useRef<HTMLDivElement>(null);
  const [dummyListState, setDummyListState] = useState(shuffle(dummyList));
  const [fontHeight, setFontHeight] = useState(0);
  const slotNumbersHeight = fontHeight * (dummyList.length + 1);

  useIsomorphicLayoutEffect(() => {
    setFontHeight(itemRef.current?.offsetHeight ?? 0);
  }, []);

  useEffect(() => {
    setLocalActive(active);
  }, [active]);

  useEffect(() => {
    if (!localActive) return;

    prevValueRef.current = valueRef.current;
    valueRef.current = value;

    setTimeout(
      () => setLocalValue(value),
      (effectiveDuration * 1000 * 1.3) / dummyList.length + delay * 1000,
    );
  }, [localActive, value, effectiveDuration, delay, dummyList.length]);

  useEffect(() => {
    setDummyListState(shuffle(dummyList));
  }, [value, dummyList]);

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
      style={{ height: fontHeight }}
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
        <div className={styles.num} aria-hidden="true">
          {startValue ?? localValue}
        </div>
        {renderDummyList()}
        <div
          className={mergeClassNames(styles.num, valueClassName)}
          ref={itemRef}
        >
          {localValue}
        </div>
        {hasInfiniteList ? renderDummyList() : null}
      </div>
    </div>
  );
}

export default memo(Slot);
