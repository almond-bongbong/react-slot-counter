import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './index.module.scss';
import { mergeClassNames, random, range, shuffle } from './utils';
import useIsomorphicLayoutEffect from './hooks/useIsomorphicLayoutEffect';

export interface SlotCounterRef {
  startAnimation: () => void;
}

interface Props {
  value: string | number | string[];
  duration?: number;
  dummyCharacters?: string[];
  dummyCharacterCount?: number;
  containerClassName?: string;
  charClassName?: string;
  separatorClassName?: string;
}

const SEPARATOR = [',', '.'];

function SlotCounter(
  {
    value,
    duration = 0.7,
    dummyCharacters,
    dummyCharacterCount = 6,
    containerClassName,
    charClassName,
    separatorClassName,
  }: Props,
  ref: React.Ref<SlotCounterRef>,
) {
  const [active, setActive] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [fontHeight, setFontHeight] = useState(0);
  const numbersRef = useRef<HTMLDivElement>(null);
  const dummyList = useMemo(
    () =>
      range(0, dummyCharacterCount - 1).map((i) => {
        if (!dummyCharacters) return random(0, 10);

        const index =
          i >= dummyCharacters.length ? random(0, dummyCharacters.length) : i;
        return dummyCharacters[index];
      }),
    [dummyCharacters, dummyCharacterCount],
  );

  const startAnimation = useCallback(() => {
    setActive(false);
    setTimeout(() => setActive(true), 20);
  }, []);

  useEffect(() => {
    startAnimation();
    setTimeout(() => setLocalValue(value), value.toString().length * 100);
  }, [value, startAnimation]);

  useImperativeHandle(ref, () => ({
    startAnimation,
  }));

  useIsomorphicLayoutEffect(() => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.innerHTML = '0';
    if (!numbersRef.current) return;

    numbersRef.current.appendChild(div);
    const height = div.offsetHeight;
    numbersRef.current.removeChild(div);
    setFontHeight(height);
  }, []);

  return (
    <div
      className={mergeClassNames(
        containerClassName,
        styles.slot_wrap,
        active && styles.active,
      )}
    >
      {(Array.isArray(localValue)
        ? localValue
        : localValue.toString().split('')
      ).map((v, i) => {
        if (SEPARATOR.includes(v)) {
          return (
            <div
              key={i}
              className={mergeClassNames(styles.separator, separatorClassName)}
            >
              {v}
            </div>
          );
        }

        return (
          <div
            key={i}
            className={mergeClassNames(styles.slot, charClassName)}
            style={{ height: fontHeight }}
          >
            <div
              ref={numbersRef}
              className={styles.numbers}
              style={{
                transition: 'none',
                ...(active && {
                  transform: `translateY(-${
                    fontHeight * (dummyList.length + 1)
                  }px)`,
                  transition: `transform ${duration}s ${i * 0.1}s ease-in-out`,
                }),
              }}
            >
              <div className={styles.num} aria-hidden="true">
                {v}
              </div>
              {shuffle(dummyList).map((dummyNumber, slotIndex) => (
                <div key={slotIndex} className={styles.num} aria-hidden="true">
                  {dummyNumber}
                </div>
              ))}
              <div className={styles.num}>{v}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(forwardRef(SlotCounter));
