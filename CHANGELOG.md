# 📜 Change Log for react-slot-counter

All notable changes to this project will be documented in this file.

## [2.2.1] - 2023-12-11

### Fixed

- Adjusted text alignment for counters to ensure consistent and visually appealing presentation across different usage scenarios.

## [2.2.0] - 2023-12-10

### Added
 
- Introduced `animateOnVisible` prop to trigger animations based on component visibility. This feature allows animations to start when the component is visible in the viewport, enhancing user engagement and interactivity. The `animateOnVisible` prop can be a boolean or an object with `rootMargin` and `triggerOnce` options for more precise control.

## [2.1.1] - 2023-11-19

### Fixed

- Corrected an issue where number change animations in `sequentialAnimationMode` were not functioning properly.

## [2.1.0] - 2023-11-11

### Fixed

- Resolved an issue where the startValueOnce prop was not functioning as expected.

### Improvements

- Enhanced the digit increase animation in sequentialAnimationMode for a smoother user experience.

## [2.0.3] - 2023-11-05

### Fixed

- Resolved `autoAnimationStart` not working when `startValue` is set.
- Ensured `startValue: 0` is properly recognized and handled.
- Refined the calculation logic for number interpolation in sequential mode.

## [2.0.2] - 2023-10-31

### Fixed

- Fixed the issue with measuring monospace width when using `valueClassName`.

## [2.0.1] - 2023-10-29

### Fixed

- Improved the unstable behavior of the `useMonospaceWidth` prop. Enhanced the `width` calculation logic and fixed issues related to web font download timing.
- Fixed an issue where the combination of `sequentialAnimationMode: true` and `autoAnimationStart: false` was not working as expected.
- Modified the initial animation behavior in `sequentialAnimationMode`.

## [2.0.0] - 2023-10-22

### Fixed

- Fix `autoAnimationStart` not working when using `startValue`.
- Define behavior and fix multiple bugs for `autoAnimationStart`, `startValue`, and `sequentialAnimationMode`.

## [1.15.0] - 2023-10-05

### Added

- Improved the animation in `sequentialAnimationMode`.

### Fixed

- Fixed a bug where numbers were duplicated in `sequentialAnimationMode`.

## [1.14.0] - 2023-09-28

### Added

- Added `refreshStyles` ref method to recalculate styles for scenarios where the font size changes or the window is resized.

## [1.13.1] - 2023-09-08

### Fixed

- Fixed direction 'top-down' behavior when both `startValue` and `value` are set.

## [1.13.0] - 2023-09-06

### Added

- Integrated Terser plugin into Rollup configuration for code minification and optimization.

## [1.12.0] - 2023-09-03

### Fixed

- StartValueOnce behavior issue in React Strict Mode.

### Changed

- Improve example code on ref example.
- Improve FOUC issue in SSR environment.

## [1.11.0] - 2023-07-06

### Added

- `debounceDelay` feature for debouncing animations.

## [1.10.0] - 2023-07-01

### Added

- `startValueOnce` feature for one-time animation start from `startValue`.

## [1.9.0] - 2023-07-01

### Added

- `sequentialAnimationMode` and `useMonospaceWidth` features.

## [1.8.0] - 2023-06-14

### Added

- Support for `JSX.Element` in `value` and `startValue` props.

## [1.7.0] - 2023-06-10

### Added

- `startValue` feature for initial animation start.

## [1.4.3] - 2023-04-25

### Added

- `valueClassName` customization.

## [1.4.2] - 2023-04-25

### Added

- `Infinite List Appearance` feature.
