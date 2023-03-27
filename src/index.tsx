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

interface Props {
  value: string | number | string[];
  duration?: number;
  dummyCharacters?: string[];
  dummyCharacterCount?: number;
  autoAnimationStart?: boolean;
  containerClassName?: string;
  charClassName?: string;
  separatorClassName?: string;
}

export interface SlotCounterRef {
  startAnimation: (options?: {
    duration?: number;
    dummyCharacterCount?: number;
  }) => void;
}

type StartAnimationOptions = Parameters<SlotCounterRef['startAnimation']>[0];

const SEPARATOR = [',', '.'];

function SlotCounter(
  {
    value,
    duration = 0.7,
    dummyCharacters,
    dummyCharacterCount = 6,
    autoAnimationStart = true,
    containerClassName,
    charClassName,
    separatorClassName,
  }: Props,
  ref: React.Ref<SlotCounterRef>,
) {
  const [active, setActive] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [fontHeight, setFontHeight] = useState(0);
  const [startAnimationOptions, setStartAnimationOptions] =
    useState<StartAnimationOptions>();
  const numbersRef = useRef<HTMLDivElement>(null);
  const effectiveDummyCharacterCount = useMemo(
    () => startAnimationOptions?.dummyCharacterCount ?? dummyCharacterCount,
    [startAnimationOptions?.dummyCharacterCount, dummyCharacterCount],
  );
  const effectiveDuration = useMemo(
    () => startAnimationOptions?.duration ?? duration,
    [startAnimationOptions?.duration, duration],
  );
  const dummyList = useMemo(
    () =>
      range(0, effectiveDummyCharacterCount - 1).map((i) => {
        if (!dummyCharacters) return random(0, 10);

        const index =
          i >= dummyCharacters.length ? random(0, dummyCharacters.length) : i;
        return dummyCharacters[index];
      }),
    [dummyCharacters, effectiveDummyCharacterCount],
  );
  const valueList = useMemo(
    () =>
      Array.isArray(localValue) ? localValue : localValue.toString().split(''),
    [localValue],
  );
  const calculatedInterval = useMemo(() => {
    const MAX_INTERVAL = 0.1;
    return Math.min(MAX_INTERVAL, effectiveDuration / valueList.length);
  }, [effectiveDuration, valueList.length]);

  const startAnimation = useCallback((options?: StartAnimationOptions) => {
    setStartAnimationOptions(options);
    setActive(false);
    setTimeout(() => setActive(true), 20);
  }, []);

  useEffect(() => {
    if (!autoAnimationStart) {
      setLocalValue(value);
      return;
    }

    startAnimation();
    setTimeout(() => setLocalValue(value), value.toString().length * 100);
  }, [autoAnimationStart, value, startAnimation]);

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
      {valueList.map((v, i) => {
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
                  transition: `transform ${effectiveDuration}s ${
                    i * calculatedInterval
                  }s ease-in-out`,
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
