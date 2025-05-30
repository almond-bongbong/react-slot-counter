# 📜 Change Log for react-slot-counter

All notable changes to this project will be documented in this file.

_Dates are in UTC._

## 3.3.1

_2025-03-13_

### Added

- Added IntersectionObserver-based visibility detection and style refresh functionality [#82](https://github.com/almond-bongbong/react-slot-counter/pull/82) [@almond-bongbong](https://github.com/almond-bongbong)
  - Automatically refreshes styles when component becomes visible
  - Improves layout stability in dynamic environments
  - Maintains compatibility with browsers that don't support IntersectionObserver

## 3.3.0

_2025-03-12_

### Added

- Global CSS Class Names: Added consistent global class names for better styling customization [#80](https://github.com/almond-bongbong/react-slot-counter/pull/80) [@almond-bongbong](https://github.com/almond-bongbong)
  - `slot-counter`: Root container class
  - `slot-counter-separator`: Separator element class
  - `slot-counter-item`: Individual slot item class
  - `slot-counter-item-numbers`: Numbers container class
  - `slot-counter-item-number`: Individual number class
  - `slot-counter-item-number-value`: Value number class
- Slot Peek Effect: Added `slotPeek` prop for authentic slot machine visual effect [#81](https://github.com/almond-bongbong/react-slot-counter/pull/81) [@almond-bongbong](https://github.com/almond-bongbong)
  - Enables partial visibility of adjacent numbers in the slot
  - Creates more realistic slot machine appearance

## 3.2.0

_2025-02-07_

### Added

- Separator Customization: Added new props to customize separator behavior [#45](https://github.com/almond-bongbong/react-slot-counter/pull/45) [@almond-bongbong](https://github.com/almond-bongbong)
  - `separatorCharacters`: Allows specifying custom separator characters (e.g., `[':']` for time format)
  - `isSeparatorCharacter`: Provides complete control over separator logic with a custom function
  - Added ability to disable separators completely by setting `isSeparatorCharacter` to null

## 3.1.0

_2025-01-15_

### Added

- Animation Lifecycle Events: Added `onAnimationStart` and `onAnimationEnd` callback props to track animation states. These callbacks allow you to execute code when animations begin and complete. [#75](https://github.com/almond-bongbong/react-slot-counter/pull/75) [@almond-bongbong](https://github.com/almond-bongbong)
  - `onAnimationStart`: Triggered when the slot counter animation begins
  - `onAnimationEnd`: Triggered when the slot counter animation completes

## 3.0.5

_2025-01-11_

### Fixed

- Compatibility Issue: Resolved a SyntaxError: Unexpected identifier 'assert' caused by the removal of import assertions in Node.js. The import method for package.json in rollup.config.mjs has been updated to ensure compatibility across Node.js versions. [#66](https://github.com/almond-bongbong/react-slot-counter/pull/66) [@synps](https://github.com/synps)
- Build Failure: Addressed a Rollup build failure due to a missing tslib module. The tslib dependency has been added to the project to ensure successful builds. [#68](https://github.com/almond-bongbong/react-slot-counter/pull/68) [@synps](https://github.com/synps)
- Copy-Paste Issue: Fixed an issue where hidden text with aria-hidden="true" was unexpectedly included in copied content. This ensures that only visible text is copied, improving user experience. [#70](https://github.com/almond-bongbong/react-slot-counter/pull/70) [@synps](https://github.com/synps)

## 3.0.4

_2024-12-19_

### Fixed

- Fixed an issue where sequential animations would terminate prematurely before completing the full transition sequence. This ensures animations run to completion in `sequentialAnimationMode`.

## 3.0.3

_2024-12-18_

### Fixed

- Fixed an issue where `sequentialAnimationMode` did not properly transition from `startValue` to `value`.
- Resolved a problem where CSS transitions would not trigger correctly on low-performance devices, improving overall performance.

## 3.0.2

_2024-12-04_

### Added

- Added `reload` ref method to force re-render the SlotCounter component. This provides more control over component rendering and helps handle dynamic style updates.

- Added `startFromLastDigit` prop to start animation from the last digit. [#50](https://github.com/almond-bongbong/react-slot-counter/pull/50) [@vh-x](https://github.com/vh-x)

### Fixed

- Fixed an issue where animations would unnecessarily trigger during window resize events, improving stability and user experience. [#61](https://github.com/almond-bongbong/react-slot-counter/pull/61)

## 3.0.1

_2024-07-20_

### Fixed

- Fixed an issue where the delay was incorrectly calculated by not excluding separator characters. [#55](https://github.com/almond-bongbong/react-slot-counter/pull/55)
- Fixed an issue where the ResizeObserver would enter an infinite loop when browser zoom was applied. [#56](https://github.com/almond-bongbong/react-slot-counter/pull/56)

## 3.0.0

_2024-06-27_

### Added

- New Prop: `speed`: Adjust animation speed more intuitively with the new `speed` prop. [#41](https://github.com/almond-bongbong/react-slot-counter/pull/41) [@tuanngocptn](https://github.com/tuanngocptn) [@baronha](https://github.com/baronha)
- New Prop: `delay`: Each column's animation start can now be delayed using the `delay` prop. [#41](https://github.com/almond-bongbong/react-slot-counter/pull/41) [@tuanngocptn](https://github.com/tuanngocptn) [@baronha](https://github.com/baronha)

## 2.3.3

_2024-05-26_

### Added

- Enhanced the logic for checking separators in the `SlotCounter` component. The separator check now includes NBSP and additional whitespace characters, ensuring a more comprehensive and accurate check.

## 2.3.2

_2024-05-17_

### Fixed

- Fixed a bug in `sequentialAnimationMode` where the first digit was being displayed as a blank space when the number of digits increased and the number decreased. This fix ensures that the correct number is displayed in all situations.

## 2.3.1

_2024-04-27_

### Fixed

- Fixed an issue where the font width was incorrectly calculated when using `useMonospaceWidth`.

## 2.3.0

_2024-04-26_

### Added

- Introduced `numberSlotClassName` and `numberClassName` props for more customization options. These props allow you to set the class name for the number slot and the number, respectively, enabling you to customize their styling.
- Implemented the ResizeObserver API to detect changes in font size. This enhancement provides a better experience in responsive services by ensuring that the counter adapts to changes in font size.

## 2.2.5

_2024-01-09_

### Fixed

- Fixed an error caused by inaccurate font height calculation.

## 2.2.4

_2024-01-05_

### Fixed

- Refined font height calculation logic for more accurate and visually pleasing displays.

## 2.2.3

_2023-12-25_

### Fixed

- Fixed a bug in `sequentialAnimationMode` for handling decimal numbers. In this update, I addressed an issue where decimal numbers were not processed correctly in `sequentialAnimationMode`.

## 2.2.1

_2023-12-11_

### Fixed

- Adjusted text alignment for counters to ensure consistent and visually appealing presentation across different usage scenarios.

## 2.2.0

_2023-12-10_

### Added

- Introduced `animateOnVisible` prop to trigger animations based on component visibility. This feature allows animations to start when the component is visible in the viewport, enhancing user engagement and interactivity. The `animateOnVisible` prop can be a boolean or an object with `rootMargin` and `triggerOnce` options for more precise control.

## 2.1.1

_2023-11-19_

### Fixed

- Corrected an issue where number change animations in `sequentialAnimationMode` were not functioning properly.

## 2.1.0

_2023-11-11_

### Fixed

- Resolved an issue where the startValueOnce prop was not functioning as expected.

### Improvements

- Enhanced the digit increase animation in sequentialAnimationMode for a smoother user experience.

## 2.0.3

_2023-11-05_

### Fixed

- Resolved `autoAnimationStart` not working when `startValue` is set.
- Ensured `startValue: 0` is properly recognized and handled.
- Refined the calculation logic for number interpolation in sequential mode.

## 2.0.2

_2023-10-31_

### Fixed

- Fixed the issue with measuring monospace width when using `valueClassName`.

## 2.0.1

_2023-10-29_

### Fixed

- Improved the unstable behavior of the `useMonospaceWidth` prop. Enhanced the `width` calculation logic and fixed issues related to web font download timing.
- Fixed an issue where the combination of `sequentialAnimationMode: true` and `autoAnimationStart: false` was not working as expected.
- Modified the initial animation behavior in `sequentialAnimationMode`.

## 2.0.0

_2023-10-22_

### Fixed

- Fix `autoAnimationStart` not working when using `startValue`.
- Define behavior and fix multiple bugs for `autoAnimationStart`, `startValue`, and `sequentialAnimationMode`.

## 1.15.0

_2023-10-05_

### Added

- Improved the animation in `sequentialAnimationMode`.

### Fixed

- Fixed a bug where numbers were duplicated in `sequentialAnimationMode`.

## 1.14.0

_2023-09-28_

### Added

- Added `refreshStyles` ref method to recalculate styles for scenarios where the font size changes or the window is resized.

## 1.13.1

_2023-09-08_

### Fixed

- Fixed direction 'top-down' behavior when both `startValue` and `value` are set.

## 1.13.0

_2023-09-06_

### Added

- Integrated Terser plugin into Rollup configuration for code minification and optimization.

## 1.12.0

_2023-09-03_

### Fixed

- StartValueOnce behavior issue in React Strict Mode.

### Changed

- Improve example code on ref example.
- Improve FOUC issue in SSR environment.

## 1.11.0

_2023-07-06_

### Added

- `debounceDelay` feature for debouncing animations.

## 1.10.0

_2023-07-01_

### Added

- `startValueOnce` feature for one-time animation start from `startValue`.

## 1.9.0

_2023-07-01_

### Added

- `sequentialAnimationMode` and `useMonospaceWidth` features.

## 1.8.0

_2023-06-14_

### Added

- Support for `JSX.Element` in `value` and `startValue` props.

## 1.7.0

_2023-06-10_

### Added

- `startValue` feature for initial animation start.

## 1.4.3

_2023-04-25_

### Added

- `valueClassName` customization.

## 1.4.2

_2023-04-25_

### Added

- `Infinite List Appearance` feature.
