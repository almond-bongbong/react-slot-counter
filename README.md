# React Slot Counter 🎰 - Make Your UI Count! ✨

> 🚀 Elevate Your UI with Dynamic, Eye-Catching Counters - React Slot Counter

Make Your Numbers Pop 🌟: Simple and Dynamic Counters for Your UI

[![NPM](https://img.shields.io/npm/v/react-slot-counter.svg)](https://www.npmjs.com/package/react-slot-counter)
![License](https://img.shields.io/npm/l/react-confetti-boom)
![Size](https://img.shields.io/bundlephobia/min/react-confetti-boom)
![NPM Downloads](https://img.shields.io/npm/dw/react-slot-counter.svg)
<br>
[![Deploy to GitHub Pages](https://github.com/almond-bongbong/react-slot-counter/actions/workflows/deploy_to_github_pages.yml/badge.svg)](https://github.com/almond-bongbong/react-slot-counter/actions/workflows/deploy_to_github_pages.yml)

<p align="center">
    <a target="_blank" href="https://almond-bongbong.github.io/react-slot-counter/">
        <img src="https://github.com/almond-bongbong/react-slot-counter/raw/main/docs/preview.gif" />
    </a>
</p>

## 💡 Why React Slot Counter?

React Slot Counter is your go-to solution for adding animated, interactive counters to your web applications. With customizable animations, diverse input compatibility, and easy integration, it's designed to make your numbers not just visible but visually striking.

## 🌟 Key Features

- **Versatile Inputs**: Beyond numbers—strings, JSX elements, and more.
- **Animation on Demand**: Updates animate only the changed elements.
- **Sequential Animation**: For that extra touch of order and purpose.
- **Total Customizability**: Tailor the look and feel to fit your app perfectly.

## 📦 Quick Installation

```bash
npm install react-slot-counter
```

## 🛠 Easy Usage

Import `SlotCounter` and use it in your component. Here's a simple example:

```jsx
import React from 'react';
import SlotCounter from 'react-slot-counter';

function App() {
  return (
    <>
      <SlotCounter value={123456} />
      <SlotCounter value={36.5} />
      <SlotCounter value="1,234,567" />
      <SlotCounter value={['1', '2', '3', '4', '5', '6']} />
      <SlotCounter value="??????" />
    </>
  );
}

export default App;
```

## 🎥 Live Demo

Explore more at the [demo page](https://almond-bongbong.github.io/react-slot-counter/).

## 📝 Comprehensive Props

Detailed props for customizing SlotCounter to fit your UI needs:

- **value** (required): Display numbers, strings, or JSX elements.
- **duration**: Control the speed of the animation.
- **animateUnchanged**: Choose to animate all or only changed characters.
- And many more!

<details>
  <summary>See full props list</summary>

| Prop                    | Type                                                    | Default                                              | Description                                                                                                                                                                                                                                                                          |
| ----------------------- | ------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| value _(required)_      | `number` \| `string` \| `string[]` \| `JSX.Element[]`   |                                                      | The value to be displayed. It can be a number or a string with numbers and commas.                                                                                                                                                                                                   |
| startValue              | `number` \| `string` \| `string[]` \| `JSX.Element[]`   |                                                      | The initial value to be displayed before the animation starts. It sets the beginning of the slot machine animation.                                                                                                                                                                  |
| startValueOnce          | `boolean`                                               | `false`                                              | If set to true, the animation starts from the `startValue` only for the first render. For subsequent animations, it starts from the last value.                                                                                                                                      |
| duration                | `number`                                                | `0.7`                                                | The duration of the animation in seconds.                                                                                                                                                                                                                                            |
| dummyCharacters         | `string[]` \| `JSX.Element[]`                           | Defaults to random numbers from 0 to 9               | An array of dummy characters to be used in the animation.                                                                                                                                                                                                                            |
| dummyCharacterCount     | `number`                                                | `6`                                                  | The number of dummy characters to be displayed in the animation before reaching the target character.                                                                                                                                                                                |
| autoAnimationStart      | `boolean`                                               | `true`                                               | Determines whether the animation should start automatically when the component is first mounted.                                                                                                                                                                                     |
| animateUnchanged        | `boolean`                                               | `false`                                              | Determines whether to animate only the characters that have changed.                                                                                                                                                                                                                 |
| hasInfiniteList         | `boolean`                                               | `false`                                              | Determines whether the list should appear as continuous, with the end of the target character seamlessly connected to the beginning.                                                                                                                                                 |
| containerClassName      | `string`                                                |                                                      | The class name of container.                                                                                                                                                                                                                                                         |
| charClassName           | `string`                                                |                                                      | The class name of each character.                                                                                                                                                                                                                                                    |
| separatorClassName      | `string`                                                |                                                      | The class name of the separator character (`.` or `,`).                                                                                                                                                                                                                              |
| valueClassName          | `string`                                                |                                                      | The class name for the value of the slot, making it possible to customize the styling and visibility of the value.                                                                                                                                                                   |
| numberSlotClassName     | `string`                                                |                                                      | The class name for the number slot, allowing you to customize the styling of the number slot.                                                                                                                                                                                        |
| numberClassName         | `string`                                                |                                                      | The class name for the number, allowing you to customize the styling of the number.                                                                                                                                                                                                  |
| sequentialAnimationMode | `boolean`                                               | `false`                                              | Determines if the animation should increment or decrement sequentially from the startValue to value instead of random animation.                                                                                                                                                     |
| useMonospaceWidth       | `boolean`                                               | `false`                                              | Ensures that all numeric characters occupy the same horizontal space, just like they would in a monospace font.                                                                                                                                                                      |
| direction               | `'bottom-top'` \| `'top-bottom'`                        | `'bottom-top'`                                       | Sets the direction of the slot machine animation. Accepted values are `'bottom-top'` and `'top-bottom'`.                                                                                                                                                                             |
| debounceDelay           | `number`                                                | `0`                                                  | Specifies the delay in milliseconds for debouncing animations. When the value changes rapidly, it allows the animation to execute smoothly.                                                                                                                                          |
| animateOnVisible        | `boolean` \| `rootMargin: string, triggerOnce: boolean` | `false` \| `rootMargin: '0px'`, `triggerOnce: false` | Activates the animation when the component is visible in the viewport. rootMargin sets the margin around the viewport for triggering the animation, while triggerOnce determines if the animation should occur only once (true) or every time the component becomes visible (false). |

</details>

## 🤖 Advanced Ref Usage

Manipulate the behavior with refreshStyles and startAnimation methods.

<details>
  <summary>Learn more</summary>

| Method           | Type                          | Description                                                                                                                                                                    |
| ---------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `refreshStyles`  | `() => void`                  | Recalculates the styles for the SlotCounter component. Useful for scenarios where the font size changes or the window is resized, forcing a re-render to apply the new styles. |
| `startAnimation` | `(options?: Options) => void` | Initiates the animation of the component with optional customization parameters.                                                                                               |

### Options for `startAnimation` Method

| Property              | Type     | Optional | Default        | Description                                                                                                                                      |
| --------------------- | -------- | -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `duration`            | `number` | Yes      | None           | A number representing the duration of the animation in seconds. Overrides the `duration` prop if provided.                                       |
| `dummyCharacterCount` | `number` | Yes      | None           | A number indicating how many dummy characters should be shown before the target character. Overrides the `dummyCharacterCount` prop if provided. |
| `direction`           | `string` | Yes      | `'bottom-top'` | Sets the direction of the slot machine animation. Accepted values: `'bottom-top'`, `'top-bottom'`. Overrides the `direction` prop if provided.   |

Ref Example:

```jsx
import React, { useRef } from 'react';
import SlotCounter from 'react-slot-counter';

function App() {
  const counterRef = useRef(null);

  const handleStartClick = () => {
    counterRef.current?.startAnimation();
  };

  return (
    <>
      <SlotCounter value={123456} ref={counterRef} />
      <button onClick={handleStartClick}>Start</button>
    </>
  );
}

export default App;
```

</details>

## 📜 Stay Updated

Check out our [CHANGELOG.md](./CHANGELOG.md) for the latest updates.

## 👨‍💻 Join the Community

Your contributions are welcome! Let's make this project even better together.

## ❤️ Like Our Work?

Support us with a star ⭐ on GitHub!

## 📄 License

This project is proudly licensed under the MIT License.
