import React, { memo, RefObject, useEffect, useRef, useState } from 'react';
import { mergeClassNames, shuffle } from '../utils';
import styles from '../index.module.scss';

interface Props {
  charClassName?: string;
  fontHeight: number;
  numbersRef: RefObject<HTMLDivElement>;
  active: boolean;
  isChanged: boolean;
  slotNumbersHeight: number;
  effectiveDuration: number;
  delay: number;
  value: string | number;
  dummyList: (string | number)[];
}

function Slot({
  charClassName,
  fontHeight,
  numbersRef,
  active,
  isChanged,
  slotNumbersHeight,
  effectiveDuration,
  delay,
  value,
  dummyList,
}: Props) {
  const [localActive, setLocalActive] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const prevValueRef = useRef<typeof value>();
  const valueRef = useRef(value);
  const [dummyListState, setDummyListState] = useState(shuffle(dummyList));

  useEffect(() => {
    if (active) {
      setTimeout(() => setLocalActive(active), 20);
    } else {
      setLocalActive(active);
    }
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
          ...(localActive &&
            isChanged && {
              transform: `translateY(-${slotNumbersHeight}px)`,
              transition: `transform ${effectiveDuration}s ${delay}s ease-in-out`,
            }),
        }}
      >
        <div className={styles.num} aria-hidden="true">
          {localValue}
        </div>
        {dummyListState.map((dummyNumber, slotIndex) => (
          <div key={slotIndex} className={styles.num} aria-hidden="true">
            {dummyNumber}
          </div>
        ))}
        <div className={styles.num}>{localValue}</div>
      </div>
    </div>
  );
}

export default memo(Slot);
