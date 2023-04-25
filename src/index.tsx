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
import { mergeClassNames, random, range } from './utils';
import useIsomorphicLayoutEffect from './hooks/useIsomorphicLayoutEffect';
import styles from './index.module.scss';
import Slot from './components/Slot';

interface Props {
  value: string | number | string[];
  duration?: number;
  dummyCharacters?: string[];
  dummyCharacterCount?: number;
  autoAnimationStart?: boolean;
  containerClassName?: string;
  charClassName?: string;
  separatorClassName?: string;
  animateUnchanged?: boolean;
  hasInfiniteList?: boolean;
}

export interface SlotCounterRef {
  startAnimation: (options?: {
    duration?: number;
    dummyCharacterCount?: number;
  }) => void;
}

type StartAnimationOptions = Parameters<SlotCounterRef['startAnimation']>[0];

const SEPARATOR = [',', '.', ' '];

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
    animateUnchanged = false,
    hasInfiniteList = false,
  }: Props,
  ref: React.Ref<SlotCounterRef>,
) {
  const serializedValue = useMemo(() => JSON.stringify(value), [value]);
  const [active, setActive] = useState(false);
  const [fontHeight, setFontHeight] = useState(0);
  const startAnimationOptionsRef = useRef<StartAnimationOptions>();
  const numbersRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value);
  const prevValueRef = useRef<Props['value']>();

  const effectiveDummyCharacterCount =
    startAnimationOptionsRef.current?.dummyCharacterCount ??
    dummyCharacterCount;
  const effectiveDuration =
    startAnimationOptionsRef.current?.duration ?? duration;

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

  useMemo(() => {
    if (valueRef.current === value) return;
    prevValueRef.current = valueRef.current;
    valueRef.current = value;
  }, [value]);

  const prevValueRefList = Array.isArray(prevValueRef.current)
    ? prevValueRef.current
    : prevValueRef.current?.toString().split('') ?? [];
  const valueRefList = Array.isArray(valueRef.current)
    ? valueRef.current
    : valueRef.current?.toString().split('') ?? [];

  const valueList = useMemo(
    () => (Array.isArray(value) ? value : value.toString().split('')),
    [value],
  );

  const isChangedValueLength = prevValueRefList.length !== valueRefList.length;
  const isChangedValueIndexList: number[] = [];
  valueRefList.forEach((v, i) => {
    const targetIndex = valueRefList.length - i - 1;
    if (
      valueRefList[targetIndex] !== prevValueRefList[targetIndex] ||
      isChangedValueLength ||
      animateUnchanged
    ) {
      isChangedValueIndexList.push(targetIndex);
    }
  });
  isChangedValueIndexList.reverse();

  const calculatedInterval = useMemo(() => {
    const MAX_INTERVAL = 0.1;
    return Math.min(MAX_INTERVAL, effectiveDuration / valueList.length);
  }, [effectiveDuration, valueList.length]);

  const startAnimation = useCallback(() => {
    setActive(false);
    setTimeout(() => setActive(true), 20);
  }, []);

  const startAnimationAll = useCallback(
    (options?: StartAnimationOptions) => {
      prevValueRef.current = undefined;
      startAnimationOptionsRef.current = options;
      startAnimation();
    },
    [startAnimation],
  );

  useEffect(() => {
    if (!autoAnimationStart) return;
    startAnimation();
  }, [autoAnimationStart, serializedValue, startAnimation]);

  useImperativeHandle(ref, () => ({
    startAnimation: startAnimationAll,
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
    <div className={mergeClassNames(containerClassName, styles.slot_wrap)}>
      {valueList.map((v, i) => {
        const isChanged = isChangedValueIndexList.includes(i);
        const delay =
          (isChanged ? isChangedValueIndexList.indexOf(i) : 0) *
          calculatedInterval;
        const slotNumbersHeight = fontHeight * (dummyList.length + 1);

        if (SEPARATOR.includes(v)) {
          return (
            <div
              key={valueRefList.length - i - 1}
              className={mergeClassNames(styles.separator, separatorClassName)}
            >
              {v}
            </div>
          );
        }

        return (
          <Slot
            key={valueRefList.length - i - 1}
            fontHeight={fontHeight}
            numbersRef={numbersRef}
            active={active}
            isChanged={isChanged}
            charClassName={charClassName}
            slotNumbersHeight={slotNumbersHeight}
            effectiveDuration={effectiveDuration}
            delay={delay}
            value={v}
            dummyList={dummyList}
            hasInfiniteList={hasInfiniteList}
          />
        );
      })}
    </div>
  );
}

export default memo(forwardRef(SlotCounter));
