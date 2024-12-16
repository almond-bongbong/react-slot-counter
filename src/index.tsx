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
import Slot, { SlotRef } from './components/Slot';
import useDebounce from './hooks/useDebounce';
import useIsomorphicLayoutEffect from './hooks/useIsomorphicLayoutEffect';
import useValueChangeEffect from './hooks/useValueChangeEffect';
import styles from './index.module.scss';
import { Direction, SlotCounterRef, StartAnimationOptions, Value } from './types/common';
import {
  debounce,
  generateCyclicRange,
  isJSXElementArray,
  isNumeric,
  isSeparatorCharacter,
  mergeClassNames,
  random,
  range,
  toNumeric,
} from './utils';

interface AnimateOnVisibleOptions {
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface Props {
  value: Value;
  startValue?: Value;
  startValueOnce?: boolean;
  duration?: number;
  speed?: number;
  delay?: number;
  dummyCharacters?: string[] | JSX.Element[];
  dummyCharacterCount?: number;
  autoAnimationStart?: boolean;
  animateUnchanged?: boolean;
  hasInfiniteList?: boolean;
  containerClassName?: string;
  charClassName?: string;
  separatorClassName?: string;
  valueClassName?: string;
  numberSlotClassName?: string;
  numberClassName?: string;
  sequentialAnimationMode?: boolean;
  useMonospaceWidth?: boolean;
  direction?: Direction;
  debounceDelay?: number;
  animateOnVisible?: boolean | AnimateOnVisibleOptions;
  startFromLastDigit?: boolean;
}

function SlotCounter(
  {
    value: _value,
    startValue,
    startValueOnce = false,
    duration = 0.7,
    speed = 1.4,
    delay,
    dummyCharacters,
    dummyCharacterCount = 6,
    autoAnimationStart: _autoAnimationStart = true,
    containerClassName,
    charClassName,
    separatorClassName,
    valueClassName,
    numberSlotClassName,
    numberClassName,
    animateUnchanged = false,
    hasInfiniteList = false,
    sequentialAnimationMode = false,
    useMonospaceWidth = false,
    direction,
    debounceDelay,
    animateOnVisible,
    startFromLastDigit = false,
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
  const slotCounterRef = useRef<HTMLSpanElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const startValueRef = useRef(startValue);
  const slotRefList = useRef<SlotRef[]>([]);

  const hasAnimateOnVisible = useMemo(() => {
    if (typeof animateOnVisible === 'boolean') return animateOnVisible;
    if (typeof animateOnVisible === 'object') return true;
    return undefined;
  }, [animateOnVisible]);
  const animateOnVisibleRootMargin = useMemo(
    () => (typeof animateOnVisible === 'object' ? animateOnVisible.rootMargin : undefined),
    [animateOnVisible],
  );
  const animateOnVisibleTriggerOnce = useMemo(
    () => (typeof animateOnVisible === 'object' ? animateOnVisible.triggerOnce : undefined),
    [animateOnVisible],
  );
  const animateOnVisibleReadyRef = useRef(true);

  const autoAnimationStart = hasAnimateOnVisible ? false : _autoAnimationStart;
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

  /**
   * Detect max number width
   */
  const detectMaxNumberWidth = useCallback(() => {
    const numbersElement = numbersRef.current;

    if (!numbersElement) {
      return;
    }

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
  }, [valueClassName]);

  /**
   * Call detectMaxNumberWidth when component mounted
   */
  useIsomorphicLayoutEffect(() => {
    detectMaxNumberWidth();
    document.fonts?.ready.then(() => {
      detectMaxNumberWidth();
    });
  }, []);

  /**
   * Generate dummy list
   */
  useEffect(() => {
    setDummyList(
      range(0, effectiveDummyCharacterCount * duration * speed - 1).map((i) => {
        if (!dummyCharacters) return random(0, 10);

        const index = i >= dummyCharacters.length ? random(0, dummyCharacters.length) : i;
        return dummyCharacters[index];
      }),
    );
  }, [dummyCharacters, effectiveDummyCharacterCount, speed, duration]);

  /**
   * Update valueRef and prevValueRef when value is changed
   */
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
  if (!startFromLastDigit) isChangedValueIndexList.reverse();

  /**
   * Calculate interval for each slot
   */
  const calculatedInterval = useMemo(() => {
    const MAX_INTERVAL = 0.1;
    if (delay) {
      return delay;
    }
    return Math.min(MAX_INTERVAL, effectiveDuration / valueList.length);
  }, [effectiveDuration, valueList.length, delay]);

  /**
   * Start animation
   */
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

  /**
   * Get sequential dummy list
   */
  const getSequentialDummyList = useCallback(
    (index: number) => {
      const prevValue = displayStartValue ? startValue : prevValueRef.current;
      if (prevValue == null || !isNumeric(prevValue) || !isNumeric(value)) {
        return [];
      }

      const prevValueLength = prevValue.toString().length;
      const valueLength = value.toString().length;

      // check if value digit is increasing
      const isDigitIncreasing = prevValueLength < valueLength;

      // diff between prevValue and value length
      const diff = Math.abs(prevValueLength - valueLength);

      // prevValue to number without separator
      const prevNumValue = Number(toNumeric(prevValue.toString()));

      // value to number without separator
      const numValue = Number(toNumeric(value.toString()));
      const prevDigit = Number(
        prevNumValue.toString()[isDigitIncreasing ? -diff + index : diff + index] || 0,
      );
      const currentDigit = Number(numValue.toString()[index] || 0);

      if (currentDigit === prevDigit) return [];

      const isIncreasing = prevNumValue < numValue;

      const dummyList = isIncreasing
        ? generateCyclicRange((prevDigit + 1) % 10, currentDigit)
        : generateCyclicRange((currentDigit + 1) % 10, prevDigit);

      const effectiveDirection = startAnimationOptionsRef.current?.direction ?? direction;

      // reverse dummy list if direction is bottom-up and value is decreasing
      if (effectiveDirection === 'bottom-up' && !isIncreasing) {
        return dummyList.reverse();
      }

      return dummyList;
    },
    [displayStartValue, value, startValue, direction],
  );

  /**
   * Refresh styles
   */
  const refreshStyles = useCallback(() => {
    slotRefList.current.forEach((ref) => {
      ref.refreshStyles();
    });

    detectMaxNumberWidth();
  }, [detectMaxNumberWidth]);

  /**
   * Start animation when value is changed
   */
  useEffect(() => {
    if (!isDidMountRef.current && prevValueRef.current == null) return;
    if (!isDidMountRef.current && startValueRef.current != null) return;
    if (!isDidMountRef.current && !autoAnimationStart) return;

    startAnimation();
  }, [serializedValue, startAnimation, autoAnimationStart]);

  /**
   * Start animation when autoAnimationStart is changed
   */
  useEffect(() => {
    if (autoAnimationStart) startAnimation();
  }, [autoAnimationStart, startAnimation]);

  /**
   * Set isDidMount to true when component mounted
   */
  useEffect(() => {
    requestAnimationFrame(() => {
      isDidMountRef.current = true;
    });
  }, []);

  /**
   * Ref forwarding
   */
  useImperativeHandle(ref, () => ({
    startAnimation: startAnimationAll,
    refreshStyles,
    reload: () => setKey((prev) => prev + 1),
  }));

  const renderValueList =
    startValue != null && !autoAnimationStart && animationCountRef.current === 0
      ? startValueList || []
      : valueList;
  const startValueLengthDiff = (startValueList?.length || 0) - renderValueList.length;
  const { getPrevDependencies, setPrevDependenciesToSameAsCurrent } =
    useValueChangeEffect(renderValueList);
  const diffValueListCount = renderValueList.length - getPrevDependencies().length;

  const startAnimationAll = useCallback(
    (options?: StartAnimationOptions) => {
      if (startValue != null && !startValueOnce) prevValueRef.current = undefined;
      startAnimationOptionsRef.current = options;
      startAnimation();
      setPrevDependenciesToSameAsCurrent();
    },
    [startValue, startValueOnce, startAnimation, setPrevDependenciesToSameAsCurrent],
  );

  const handleFontHeightChange = useMemo(
    () =>
      debounce(() => {
        refreshStyles();
      }, 0),
    [refreshStyles],
  );

  useEffect(() => {
    if (!hasAnimateOnVisible || !slotCounterRef.current) {
      return;
    }

    const animateStartObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry.isIntersecting || !animateOnVisibleReadyRef.current) {
          return;
        }

        startAnimationAll();
        animateOnVisibleReadyRef.current = false;

        if (animateOnVisibleTriggerOnce) {
          animateStartObserver.disconnect();
          visibleOnViewportObserver.disconnect();
        }
      },
      {
        rootMargin: animateOnVisibleRootMargin,
        threshold: 1,
      },
    );
    const visibleOnViewportObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry.isIntersecting) {
          animateOnVisibleReadyRef.current = true;
        }
      },
      {
        threshold: 0,
      },
    );

    animateStartObserver.observe(slotCounterRef.current);
    visibleOnViewportObserver.observe(slotCounterRef.current);

    return () => {
      animateStartObserver.disconnect();
      visibleOnViewportObserver.disconnect();
    };
  }, [
    hasAnimateOnVisible,
    animateOnVisibleRootMargin,
    animateOnVisibleTriggerOnce,
    startAnimationAll,
  ]);

  const isChangedValueIndexListWithoutSeparator = isChangedValueIndexList.filter(
    (i) => !isSeparatorCharacter(renderValueList[i]),
  );

  let noSeparatorValueIndex = -1;

  return (
    <span
      key={key}
      ref={slotCounterRef}
      className={mergeClassNames(containerClassName, styles.slot_wrap)}
    >
      {renderValueList.map((v, i) => {
        const isChanged = isChangedValueIndexList.includes(i);
        const delay =
          (isChanged ? isChangedValueIndexListWithoutSeparator.indexOf(i) : 0) * calculatedInterval;
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

        // Separator check
        const isSeparator = isSeparatorCharacter(v);

        // Separator rendering
        if (isSeparator) {
          return (
            <span
              key={valueRefList.length - i - 1}
              className={mergeClassNames(styles.separator, separatorClassName)}
            >
              {v}
            </span>
          );
        }

        const hasSequentialDummyList =
          sequentialAnimationMode && (!autoAnimationStart || animationExecuteCountRef.current > 1);
        noSeparatorValueIndex += 1;

        return (
          <Slot
            key={renderValueList.length - i - 1}
            index={i}
            isNew={diffValueListCount > 0 && i < diffValueListCount}
            maxNumberWidth={maxNumberWidth}
            numbersRef={numbersRef}
            active={active}
            isChanged={isChanged}
            charClassName={charClassName}
            effectiveDuration={effectiveDuration}
            delay={delay}
            value={v}
            startValue={!disableStartValue ? startValueList?.[i + startValueLengthDiff] : undefined}
            disableStartValue={disableStartValue}
            dummyList={
              hasSequentialDummyList ? getSequentialDummyList(noSeparatorValueIndex) : dummyList
            }
            hasSequentialDummyList={hasSequentialDummyList}
            hasInfiniteList={hasInfiniteList}
            valueClassName={valueClassName}
            numberSlotClassName={numberSlotClassName}
            numberClassName={numberClassName}
            reverse={reverseAnimation}
            sequentialAnimationMode={sequentialAnimationMode}
            useMonospaceWidth={useMonospaceWidth}
            onFontHeightChange={handleFontHeightChange}
            speed={speed}
            duration={duration}
            ref={(ref) => {
              if (ref) slotRefList.current.push(ref);
            }}
          />
        );
      })}
    </span>
  );
}

export default memo(forwardRef(SlotCounter));
export type { SlotCounterRef, StartAnimationOptions };
