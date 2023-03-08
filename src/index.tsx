import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
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

  const fontHeight = useMemo(() => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.top = '0';
    div.style.left = '0';
    div.innerHTML = '0';
    document.body.appendChild(div);
    const height = div.offsetHeight;
    document.body.removeChild(div);
    return height;
  }, []);

  const numStyle = {
    height: fontHeight,
    lineHeight: `${fontHeight}px`,
  };

  return (
    <div className={mergeClassNames(styles.slot_wrap, active && styles.active)}>
      {localValue
        .toString()
        .split('')
        .map((v, i) => {
          if (SEPARATOR.includes(v)) {
            return (
              <span
                key={i}
                className={styles.dot}
                style={{ lineHeight: `${fontHeight}px` }}
              >
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
                  <div key={slotIndex} className={styles.num} style={numStyle}>
                    {slotIndex === 0 ? v : random(1, 10)}
                  </div>
                ))}
                <div className={styles.num} style={numStyle}>
                  {v}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default forwardRef(SlotCounter);
