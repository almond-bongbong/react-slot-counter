# react-slot-counter

`react-slot-counter` is a React component that uses slot machine animations to display numbers and strings.

[![NPM](https://img.shields.io/npm/v/react-slot-counter.svg)](https://www.npmjs.com/package/react-slot-counter)

<p align="center">
    <a target="_blank" href="https://almond-bongbong.github.io/react-slot-counter/">
        <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjdmZGFkMjdiYjI2ZTBhMTg3YWIxMGEyNDk5YzcyNTIzMzFmMDI4YyZjdD1n/EIO8W6Qeqn4eQxIOxh/giphy.gif" />
    </a>
</p>

## Installation

To install the package, run the following command:

```bash
npm install react-slot-counter
```

## Usage

Import SlotCounter and use it in your component. Here's a simple example:

```jsx
import React from 'react';
import SlotCounter from 'react-slot-counter';

function App() {
  return (
    <>
      <SlotCounter value={123456} />
      <SlotCounter value="1,234,567" />
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

| Prop                | Type                 | Default                                | Description                                                                                           |
| ------------------- | -------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| value _(required)_  | `number` or `string` |                                        | The value to be displayed. It can be a number or a string with numbers and commas.                    |
| duration            | `number`             | `0.7`                                  | The duration of the animation in seconds.                                                             |
| dummyCharacters     | `Array<string>`      | Defaults to random numbers from 0 to 9 | An array of dummy characters to be used in the animation.                                             |
| dummyCharacterCount | `number`             | `6`                                    | The number of dummy characters to be displayed in the animation before reaching the target character. |
| containerClassName  | `string`             |                                        | The class name of container.                                                                          |
| charClassName       | `string`             |                                        | The class name of each character.                                                                     |
| separatorClassName  | `string`             |                                        | The class name of the separator character (`.` or `,`).                                               |

## Ref

You can access the SlotCounter component using a ref. This ref can be used to start the animation of the component.

| Method           | Description                          |
| ---------------- | ------------------------------------ |
| `startAnimation` | Start the animation of the component |

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

Contributions, issues and feature requests are welcome!

## License

This project is licensed under the MIT License
