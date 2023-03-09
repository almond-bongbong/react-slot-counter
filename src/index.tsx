import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styles from './index.module.scss';
import { mergeClassNames, random, range } from './utils';

interface RefAttributes {
  reload: () => void;
}

interface Props {
  value: string | number;
  duration?: number;
  charClassName?: string;
}

const DUMMY_NUMBER_COUNT = 6;
const SEPARATOR = [',', '.'];

function SlotCounter(
  { value, duration = 0.6, charClassName }: Props,
  ref: React.Ref<RefAttributes>,
) {
  const [active, setActive] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [fontHeight, setFontHeight] = useState(0);
  const numbersRef = useRef<HTMLDivElement>(null);

  const reloadAnimation = useCallback(() => {
    setActive(false);
    setTimeout(() => setActive(true), 20);
  }, []);

  useEffect(() => {
    reloadAnimation();
    setTimeout(() => setLocalValue(value), 300);
  }, [value, reloadAnimation]);

  useImperativeHandle(ref, () => ({
    reload: reloadAnimation,
  }));

  useLayoutEffect(() => {
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
    <div className={mergeClassNames(styles.slot_wrap, active && styles.active)}>
      {localValue
        .toString()
        .split('')
        .map((v, i) => {
          if (SEPARATOR.includes(v)) {
            return (
              <span key={i} className={styles.dot}>
                {v}
              </span>
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
                      fontHeight * DUMMY_NUMBER_COUNT
                    }px)`,
                    transition: `transform ${duration}s ${
                      i * 0.1
                    }s ease-in-out`,
                  }),
                }}
              >
                {range(0, DUMMY_NUMBER_COUNT).map((slotIndex) => (
                  <div key={slotIndex} className={styles.num}>
                    {slotIndex === 0 ? v : random(1, 10)}
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

export default forwardRef(SlotCounter);
