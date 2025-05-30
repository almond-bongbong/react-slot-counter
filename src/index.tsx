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
import { Props, SlotCounterRef, StartAnimationOptions } from './types/common';
import {
  debounce,
  isSeparatorCharacter as defaultIsSeparatorCharacter,
  generateCyclicRange,
  isJSXElementArray,
  isNumeric,
  mergeClassNames,
  random,
  range,
  toNumeric,
} from './utils';
import { CLASS_NAMES } from 'constants';

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
    onAnimationStart,
    onAnimationEnd,
    separatorCharacters,
    isSeparatorCharacter = defaultIsSeparatorCharacter,
    slotPeek,
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
   * Callback Events ref for preventing unnecessary re-renders by avoiding dependency array
   */
  const eventCallbackRef = useRef({
    onAnimationStart: onAnimationStart,
    onAnimationEnd: onAnimationEnd,
  });
  eventCallbackRef.current = {
    onAnimationStart: onAnimationStart,
    onAnimationEnd: onAnimationEnd,
  };

  /**
   * Animation start and end event
   */
  const isAnimatingRef = useRef(false);

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

  // Calculate isChangedValueLength
  const isChangedValueLength = prevValueRefList.length !== valueRefList.length;

  // Calculate isChangedValueIndexList
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

  // Reverse the isChangedValueIndexList if startFromLastDigit is false
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
   * Handle transition end
   */
  const handleTransitionEnd = useCallback(() => {
    eventCallbackRef.current.onAnimationEnd?.();
    isAnimatingRef.current = false;
    numbersRef.current?.removeEventListener('transitionend', handleTransitionEnd);
  }, []);

  /**
   * Start animation
   */
  const startAnimation = useCallback(() => {
    if (animationTimerRef.current) {
      window.cancelAnimationFrame(animationTimerRef.current);
    }

    // If animation is already started, call onAnimationEnd immediately
    if (isAnimatingRef.current) {
      handleTransitionEnd();
    }

    isAnimatingRef.current = true;

    // If animation is not started, add event listener
    numbersRef.current?.addEventListener('transitionend', handleTransitionEnd);

    // Call onAnimationStart callback
    eventCallbackRef.current.onAnimationStart?.();

    // Set active to false and increment animation count
    setActive(false);
    animationCountRef.current = animationExecuteCountRef.current;
    animationCountRef.current += 1;

    window.requestAnimationFrame(() => {
      // Force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const width = numbersRef.current?.offsetWidth;

      animationTimerRef.current = requestAnimationFrame(() => {
        animationExecuteCountRef.current += 1;
        setActive(true);
      });
    });
  }, [handleTransitionEnd]);

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

  // Render value list
  const renderValueList =
    startValue != null && !autoAnimationStart && animationCountRef.current === 0
      ? startValueList || []
      : valueList;

  // Calculate start value length difference
  const startValueLengthDiff = (startValueList?.length || 0) - renderValueList.length;

  // Get previous dependencies
  const { getPrevDependencies, setPrevDependenciesToSameAsCurrent } =
    useValueChangeEffect(renderValueList);

  // Calculate difference between render value list and previous dependencies
  const diffValueListCount = renderValueList.length - getPrevDependencies().length;

  /**
   * Start animation all
   */
  const startAnimationAll = useCallback(
    (options?: StartAnimationOptions) => {
      if (startValue != null && !startValueOnce) prevValueRef.current = undefined;
      startAnimationOptionsRef.current = options;
      startAnimation();
      setPrevDependenciesToSameAsCurrent();
    },
    [startValue, startValueOnce, startAnimation, setPrevDependenciesToSameAsCurrent],
  );

  /**
   * Handle font height change
   */
  const handleFontHeightChange = useMemo(
    () =>
      debounce(() => {
        refreshStyles();
      }, 0),
    [refreshStyles],
  );

  /**
   * Handle display change
   */
  useEffect(() => {
    const slotCounterElement = slotCounterRef.current;

    // If slotCounterElement is not found
    // or IntersectionObserver is not supported, return
    if (!slotCounterElement || !window.IntersectionObserver) return;

    // Create IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        refreshStyles();
      }
    });

    // Observe slotCounterElement
    observer.observe(slotCounterRef.current);

    // Disconnect observer when component unmounts
    return () => observer.disconnect();
  }, [refreshStyles]);

  /**
   * Handle animate on visible
   */
  useEffect(() => {
    // If animateOnVisible is not enabled
    // or slotCounterRef is not found
    // or IntersectionObserver is not supported, return
    if (!hasAnimateOnVisible || !slotCounterRef.current || !window.IntersectionObserver) {
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

  /**
   * Check if the value is a separator character
   * @param value - The value to check
   * @returns true if the value is a separator character, false otherwise
   */
  const checkSeparator = (value: string | JSX.Element) => {
    // If separatorCharacters is provided, check if the value is in the separatorCharacters array
    if (separatorCharacters && typeof value === 'string') {
      return separatorCharacters.includes(value);
    }

    // If isSeparatorCharacter is null, return false (no separator)
    if (isSeparatorCharacter === null) {
      return false;
    }

    // If isSeparatorCharacter is provided or defaultIsSeparatorCharacter, use that to check if the value is a separator character
    return isSeparatorCharacter(value);
  };

  const isChangedValueIndexListWithoutSeparator = isChangedValueIndexList.filter(
    (i) => !checkSeparator(renderValueList[i]),
  );

  let noSeparatorValueIndex = -1;

  return (
    <span
      key={key}
      ref={slotCounterRef}
      className={mergeClassNames(containerClassName, styles.slot_wrap, CLASS_NAMES.SLOT_COUNTER)}
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
        const isSeparator = checkSeparator(v);

        // Separator rendering
        if (isSeparator) {
          return (
            <span
              key={valueRefList.length - i - 1}
              className={mergeClassNames(
                styles.separator,
                separatorClassName,
                CLASS_NAMES.SLOT_COUNTER_ITEM,
                CLASS_NAMES.SLOT_COUNTER_SEPARATOR,
              )}
            >
              {v}
            </span>
          );
        }

        // Calculate hasSequentialDummyList
        const hasSequentialDummyList =
          sequentialAnimationMode && (!autoAnimationStart || animationExecuteCountRef.current > 1);

        // Increment noSeparatorValueIndex
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
            slotPeek={slotPeek}
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

type SlotCounterProps = Props;
export type { SlotCounterRef, StartAnimationOptions, SlotCounterProps };
