# react-slot-counter

`react-slot-counter` is a feature-rich React component that displays numbers and strings with an engaging slot machine animation effect.

[![NPM](https://img.shields.io/npm/v/react-slot-counter.svg)](https://www.npmjs.com/package/react-slot-counter)
![License](https://img.shields.io/npm/l/react-confetti-boom)
![Size](https://img.shields.io/bundlephobia/min/react-confetti-boom)

<p align="center">
    <a target="_blank" href="https://almond-bongbong.github.io/react-slot-counter/">
        <img src="https://github.com/almond-bongbong/react-slot-counter/raw/main/docs/preview.gif" />
    </a>
</p>

## Features

- Customize animation duration and other settings
- Animate only changed characters
- Control animation start with a ref
- Easily add custom styles to the characters and separators

## Installation

To install the package, run the following command:

```bash
npm install react-slot-counter
```

## Usage

Import `SlotCounter` and use it in your component. Here's a simple example:

```jsx
import React from 'react';
import SlotCounter from 'react-slot-counter';

function App() {
  return (
    <>
      <SlotCounter value={123456} />
      <SlotCounter value="1,234,567" />
      <SlotCounter value={['1', '2', '3', '4', '5', '6']} />
      <SlotCounter value="??????" />
      <SlotCounter value={36.5} duration={2} />
      <SlotCounter
        value={123456}
        charClassName="char"
        separatorClassName="sep"
      />
    </>
  );
}

export default App;
```

## Demo

For more examples of usage and available options, check out the [demo page](https://almond-bongbong.github.io/react-slot-counter/).

## Props

| Prop                | Type                               | Default                                | Description                                                                                                                          | Version |
| ------------------- | ---------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| value _(required)_  | `number` \| `string` \| `string[]` |                                        | The value to be displayed. It can be a number or a string with numbers and commas.                                                   |         |
| startValue          | `number` \| `string` \| `string[]` |                                        | The initial value to be displayed before the animation starts. It sets the beginning of the slot machine animation.                  | 1.7.0   |
| duration            | `number`                           | `0.7`                                  | The duration of the animation in seconds.                                                                                            |         |
| dummyCharacters     | `Array<string>`                    | Defaults to random numbers from 0 to 9 | An array of dummy characters to be used in the animation.                                                                            |         |
| dummyCharacterCount | `number`                           | `6`                                    | The number of dummy characters to be displayed in the animation before reaching the target character.                                |         |
| autoAnimationStart  | `boolean`                          | `true`                                 | Determines whether the animation should start automatically when the component is first mounted.                                     |         |
| animateUnchanged    | `boolean`                          | `false`                                | Determines whether to animate only the characters that have changed.                                                                 |         |
| hasInfiniteList     | `boolean`                          | `false`                                | Determines whether the list should appear as continuous, with the end of the target character seamlessly connected to the beginning. | 1.4.2   |
| containerClassName  | `string`                           |                                        | The class name of container.                                                                                                         |         |
| charClassName       | `string`                           |                                        | The class name of each character.                                                                                                    |         |
| separatorClassName  | `string`                           |                                        | The class name of the separator character (`.` or `,`).                                                                              |         |
| valueClassName      | `string`                           |                                        | The class name for the value of the slot, making it possible to customize the styling and visibility of the value.                   | 1.4.3   |

## Ref

You can access the SlotCounter component using a ref. This ref can be used to start the animation of the component.

| Method           | Description                          |
| ---------------- | ------------------------------------ |
| `startAnimation` | Start the animation of the component |

The `startAnimation` method accepts an optional object with the following properties:

- `duration`: The duration of the animation in seconds. Overrides the `duration` prop.
- `dummyCharacterCount`: The number of dummy characters to be displayed in the animation before reaching the target character. Overrides the `dummyCharacterCount` prop.
- `direction`: This option determines the direction of the slot machine animation. The accepted values are `bottom-top` and `top-bottom`. The default value is `bottom-top`. If `bottom-top` is chosen, the animation will start from the bottom and move towards the top. If `top-bottom` is chosen, the animation will start from the top and move downwards.

Example:

```jsx
import React, { useRef } from 'react';
import SlotCounter, { SlotCounterRef } from 'react-slot-counter';

function App() {
  const counterRef = useRef < SlotCounterRef > null;

  const handleStartClick = () => {
    counterRef.current?.startAnimation();
  };

  return (
    <div>
      <SlotCounter value={123456} ref={counterRef} />
      <button onClick={handleStartClick}>Start</button>
    </div>
  );
}

export default App;
```

## Contributing

Contributions, issues, and feature requests are welcome! If you'd like to contribute, please follow these steps:

1. Fork the project
2. Create a new branch for your feature or bugfix
3. Commit your changes
4. Push your changes to the branch
5. Open a pull request

Please also make sure to update tests as appropriate and follow the coding style of the project.

## License

This project is licensed under the MIT License
