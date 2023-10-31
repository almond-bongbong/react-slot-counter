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
import {
  generateCyclicRange,
  isJSXElement,
  isJSXElementArray,
  isNumeric,
  mergeClassNames,
  random,
  range,
  toNumeric,
} from './utils';
import styles from './index.module.scss';
import Slot from './components/Slot';
import { Direction, SlotCounterRef, StartAnimationOptions, Value } from './types/common';
import useDebounce from './hooks/useDebounce';
import useIsomorphicLayoutEffect from './hooks/useIsomorphicLayoutEffect';

interface Props {
  value: Value;
  startValue?: Value;
  startValueOnce?: boolean;
  duration?: number;
  dummyCharacters?: string[] | JSX.Element[];
  dummyCharacterCount?: number;
  autoAnimationStart?: boolean;
  animateUnchanged?: boolean;
  hasInfiniteList?: boolean;
  containerClassName?: string;
  charClassName?: string;
  separatorClassName?: string;
  valueClassName?: string;
  sequentialAnimationMode?: boolean;
  useMonospaceWidth?: boolean;
  direction?: Direction;
  debounceDelay?: number;
}

const SEPARATOR = [',', '.', ' '];

function SlotCounter(
  {
    value: _value,
    startValue,
    startValueOnce = false,
    duration = 0.7,
    dummyCharacters,
    dummyCharacterCount = 6,
    autoAnimationStart = true,
    containerClassName,
    charClassName,
    separatorClassName,
    animateUnchanged = false,
    hasInfiniteList = false,
    valueClassName,
    sequentialAnimationMode = false,
    useMonospaceWidth = false,
    direction,
    debounceDelay,
  }: Props,
  ref: React.Ref<SlotCounterRef>,
) {
  const value = useDebounce(_value, debounceDelay ?? 0);
  const serializedValue = useMemo(
    () =>
      isJSXElementArray(value)
        ? ''
        : typeof value === 'object'
        ? JSON.stringify(value)
        : value.toString(),
    [value],
  );
  const [active, setActive] = useState(false);
  const startAnimationOptionsRef = useRef<StartAnimationOptions>();
  const numbersRef = useRef<HTMLDivElement>(null);
  const startValueRef = useRef(startValue);
  const valueRef = useRef(startValue != null && !autoAnimationStart ? startValue : value);
  const prevValueRef = useRef<Props['value'] | undefined>(startValue);
  const animationCountRef = useRef(0);
  const animationExecuteCountRef = useRef(0);
  const [dummyList, setDummyList] = useState<(string | number | JSX.Element)[]>([]);
  const animationTimerRef = useRef<number>();
  const [key, setKey] = useState(0);
  const [maxNumberWidth, setMaxNumberWidth] = useState<number>();
  const isDidMountRef = useRef(false);
  const displayStartValue =
    startValue != null && (startValueOnce ? animationCountRef.current < 1 : true);

  const effectiveDummyCharacterCount =
    startAnimationOptionsRef.current?.dummyCharacterCount ?? dummyCharacterCount;
  const effectiveDuration = startAnimationOptionsRef.current?.duration ?? duration;

  useIsomorphicLayoutEffect(() => {
    const numbersElement = numbersRef.current;
    if (!numbersElement || !useMonospaceWidth) return;

    const detectMaxNumberWidth = () => {
      const widthList = range(0, 10).map((i) => {
        const testElement = document.createElement('span');
        testElement.className = valueClassName ?? '';
        testElement.style.position = 'absolute';
        testElement.style.top = '0';
        testElement.style.left = '-9999px';
        testElement.style.visibility = 'hidden';
        testElement.textContent = i.toString();
        numbersElement.appendChild(testElement);
        const width = testElement.getBoundingClientRect().width;
        numbersElement.removeChild(testElement);
        return width;
      });
      const maxWidth = Math.max(...widthList);
      setMaxNumberWidth(maxWidth);
    };

    detectMaxNumberWidth();
    document.fonts?.ready.then(() => {
      detectMaxNumberWidth();
    });
  }, []);

  useEffect(() => {
    setDummyList(
      range(0, effectiveDummyCharacterCount - 1).map((i) => {
        if (!dummyCharacters) return random(0, 10);

        const index = i >= dummyCharacters.length ? random(0, dummyCharacters.length) : i;
        return dummyCharacters[index];
      }),
    );
  }, [dummyCharacters, effectiveDummyCharacterCount]);

  if (valueRef.current !== value && isDidMountRef.current && animationExecuteCountRef.current > 0) {
    prevValueRef.current = valueRef.current;
    valueRef.current = value;
  }

  const prevValueRefList = Array.isArray(prevValueRef.current)
    ? prevValueRef.current
    : prevValueRef.current?.toString().split('') ?? [];
  const valueRefList = Array.isArray(valueRef.current)
    ? valueRef.current
    : valueRef.current?.toString().split('') ?? [];
  const startValueRefList = Array.isArray(startValueRef.current)
    ? startValueRef.current
    : startValueRef.current?.toString().split('') ?? [];

  const valueList = useMemo(
    () => (Array.isArray(value) ? value : value?.toString().split('')),
    [value],
  );
  const startValueList = useMemo(
    () => (Array.isArray(startValue) ? startValue : startValue?.toString().split('')),
    [startValue],
  );

  const isChangedValueLength = prevValueRefList.length !== valueRefList.length;
  const isChangedValueIndexList: number[] = [];
  valueRefList.forEach((_, i) => {
    const targetIndex = valueRefList.length - i - 1;
    const prev = displayStartValue ? startValueRefList : prevValueRefList;

    if (
      valueRefList[targetIndex] !== prev[targetIndex] ||
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
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    setActive(false);
    animationCountRef.current = animationExecuteCountRef.current;
    animationCountRef.current += 1;

    animationTimerRef.current = setTimeout(() => {
      animationExecuteCountRef.current += 1;
      setActive(true);
    }, 20);
  }, []);

  const startAnimationAll = useCallback(
    (options?: StartAnimationOptions) => {
      if (startValue != null && !startValueOnce) prevValueRef.current = undefined;
      startAnimationOptionsRef.current = options;
      startAnimation();
    },
    [startValue, startValueOnce, startAnimation],
  );

  const getSequentialDummyList = useCallback(
    (index: number) => {
      const prevValue = displayStartValue ? startValue : prevValueRef.current;
      if (prevValue == null || !isNumeric(prevValue) || !isNumeric(value)) {
        return [];
      }

      const prevNumValue = Number(toNumeric(prevValue));
      const numValue = Number(toNumeric(value));
      const prevDigit = Number(prevNumValue.toString()[index] || 0);
      const currentDigit = Number(numValue.toString()[index] || 0);

      const dummyList =
        prevNumValue < numValue
          ? generateCyclicRange((prevDigit + 1) % 10, currentDigit)
          : generateCyclicRange((currentDigit + 1) % 10, prevDigit);

      return dummyList;
    },
    [displayStartValue, value, startValue],
  );

  const refreshStyles = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!isDidMountRef.current && prevValueRef.current == null) return;
    if (!isDidMountRef.current && startValueRef.current) return;

    startAnimation();
  }, [serializedValue, startAnimation]);

  useEffect(() => {
    if (autoAnimationStart) startAnimation();
  }, [autoAnimationStart, startAnimation]);

  useEffect(() => {
    requestAnimationFrame(() => {
      isDidMountRef.current = true;
    });
  }, []);

  useImperativeHandle(ref, () => ({
    startAnimation: startAnimationAll,
    refreshStyles,
  }));

  const renderValueList =
    startValue && !autoAnimationStart && animationCountRef.current === 0
      ? startValueList || []
      : valueList;
  const startValueLengthDiff = (startValueList?.length || 0) - renderValueList.length;

  let noSeparatorValueIndex = -1;

  return (
    <span key={key} className={mergeClassNames(containerClassName, styles.slot_wrap)}>
      {renderValueList.map((v, i) => {
        const isChanged = isChangedValueIndexList.includes(i);
        const delay = (isChanged ? isChangedValueIndexList.indexOf(i) : 0) * calculatedInterval;
        const prevValue = prevValueRef.current;
        const disableStartValue =
          startValue != null && (startValueOnce ? animationCountRef.current > 1 : false);
        const isDecrease =
          value != null &&
          prevValue != null &&
          isNumeric(value) &&
          isNumeric(prevValue) &&
          toNumeric(value) < toNumeric(prevValue);

        let reverseAnimation = isDecrease;
        if (startAnimationOptionsRef.current?.direction)
          reverseAnimation = startAnimationOptionsRef.current?.direction === 'top-down';
        if (direction) reverseAnimation = direction === 'top-down';

        if (!isJSXElement(v) && SEPARATOR.includes(v)) {
          return (
            <span
              key={valueRefList.length - i - 1}
              className={mergeClassNames(styles.separator, separatorClassName)}
            >
              {v}
            </span>
          );
        }

        noSeparatorValueIndex += 1;

        return (
          <Slot
            key={valueRefList.length - i - 1}
            maxNumberWidth={maxNumberWidth}
            numbersRef={numbersRef}
            active={active}
            isChanged={isChanged}
            charClassName={charClassName}
            effectiveDuration={effectiveDuration}
            delay={delay}
            value={v}
            startValue={!disableStartValue ? startValueList?.[i - startValueLengthDiff] : undefined}
            dummyList={
              sequentialAnimationMode &&
              (!autoAnimationStart || animationExecuteCountRef.current > 1)
                ? getSequentialDummyList(noSeparatorValueIndex)
                : dummyList
            }
            hasInfiniteList={hasInfiniteList}
            valueClassName={valueClassName}
            reverse={reverseAnimation}
            sequentialAnimationMode={sequentialAnimationMode}
            useMonospaceWidth={useMonospaceWidth}
          />
        );
      })}
    </span>
  );
}

export default memo(forwardRef(SlotCounter));
export type { SlotCounterRef, StartAnimationOptions };
