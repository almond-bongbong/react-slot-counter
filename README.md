# react-slot-counter

React component that uses slot machine animations to display numbers and strings.

<p align="center">
    <a target="_blank" href="https://almond-bongbong.github.io/react-slot-counter/">
        <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjdmZGFkMjdiYjI2ZTBhMTg3YWIxMGEyNDk5YzcyNTIzMzFmMDI4YyZjdD1n/EIO8W6Qeqn4eQxIOxh/giphy.gif" />
    </a>
</p>

## Installation

```bash
npm install react-slot-counter
```

## Usage

```jsx
import React from 'react';
import SlotCounter from 'react-slot-counter';

function App() {
  return (
    <div>
      <SlotCounter value={123456} />
      <SlotCounter value="1,234,567" />
      <SlotCounter value="??????" />
      <SlotCounter value={36.5} duration={2} />
      <SlotCounter
        value={123456}
        charClassName="char"
        separatorClassName="sep"
      />
    </div>
  );
}

export default App;
```

## Demo

Check out the [demo page](https://almond-bongbong.github.io/react-slot-counter/) for examples of usage and options.

## Props

| Prop               | Type                 | Default | Description                                                                                                                                                           |
| ------------------ | -------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value _(required)_ | `number` or `string` |         | The value to be displayed. It can be a number or a string with numbers and commas. If the string contains other characters, they will be displayed as question marks. |
| duration           | `number`             | `0.6`   | The duration of the animation in seconds.                                                                                                                             |
| charClassName      | `string`             |         | The class name of each character.                                                                                                                                     |
| separatorClassName | `string`             |         | The class name of the separator character (`.` or `,`).                                                                                                               |

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
  const counterRef = useRef <SlotCounterRef> null;

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

## License

This project is licensed under the MIT License
