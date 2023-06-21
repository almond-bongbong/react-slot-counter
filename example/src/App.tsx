import React from 'react';
import CommonHighlighter from './components/CommonHighlighter';
import SlotCounter, { SlotCounterRef } from 'react-slot-counter';
import item1 from './images/diamond.png';
import item2 from './images/apple.png';
import item3 from './images/cherries.png';
import item4 from './images/watermelon.png';
import item5 from './images/orange.png';
import item6 from './images/seven.png';
import './App.css';

function App() {
  const [value, setValue] = React.useState(123456);
  const [value2, setValue2] = React.useState(50);
  const slot1Ref = React.useRef<SlotCounterRef>(null);
  const slot2Ref = React.useRef<SlotCounterRef>(null);
  const slot3Ref = React.useRef<SlotCounterRef>(null);
  const slot4Ref = React.useRef<SlotCounterRef>(null);
  const slot5Ref = React.useRef<SlotCounterRef>(null);
  const counterRef1 = React.useRef<SlotCounterRef>(null);
  const counterRef2 = React.useRef<SlotCounterRef>(null);
  const counterRef3 = React.useRef<SlotCounterRef>(null);
  const counterRef4 = React.useRef<SlotCounterRef>(null);
  const counterRef5 = React.useRef<SlotCounterRef>(null);
  const counterRef6 = React.useRef<SlotCounterRef>(null);

  return (
    <div className="example">
      <div className="container">
        <h2>react slot counter</h2>
        <p className="description">
          This module uses React library to implement slot machine animations
          and display text.
        </p>

        <h3>Basic usage</h3>
        <p>It is possible to display numbers and strings.</p>
        <div className="example-area">
          <div className="playground">
            <SlotCounter ref={slot1Ref} value={123456} />
            <button
              type="button"
              className="example-button"
              onClick={() => slot1Ref.current?.startAnimation()}
            >
              play
            </button>
          </div>
          <CommonHighlighter>{`<SlotCounter value={123456} />`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">
            <SlotCounter ref={slot2Ref} value="1,234,567" />
            <button
              type="button"
              className="example-button"
              onClick={() => slot2Ref.current?.startAnimation()}
            >
              play
            </button>
          </div>
          <CommonHighlighter>{`<SlotCounter value="1,234,567" />`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">
            <SlotCounter ref={slot3Ref} value="?????" />
            <button
              type="button"
              className="example-button"
              onClick={() => slot3Ref.current?.startAnimation()}
            >
              play
            </button>
          </div>
          <CommonHighlighter>
            {`<SlotCounter value="?????" />`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">
            <SlotCounter
              ref={slot4Ref}
              value={[<span>1</span>, <span>2</span>, <span>3</span>]}
            />
            <button
              type="button"
              className="example-button"
              onClick={() => slot4Ref.current?.startAnimation()}
            >
              play
            </button>
          </div>
          <CommonHighlighter>
            {`<SlotCounter
  value={[
    <span>1</span>,
    <span>2</span>, 
    <span>3</span>,
  ]}
/>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Dynamic value</h3>
          <p>When the value changes, the animation will automatically start.</p>
          <div className="playground">
            <SlotCounter value={value} containerClassName="slot-counter" />
            <button
              className="example-button"
              onClick={() => setValue(value + 1)}
            >
              +1
            </button>
            <button
              className="example-button"
              onClick={() => setValue(value - 1)}
            >
              -1
            </button>
          </div>
          <CommonHighlighter>
            {`const [value, setValue] = useState(123456);

//...

<SlotCounter value={value} />
<button onClick={() => setValue(value + 1)}>
  +1
</button>
<button onClick={() => setValue(value - 1)}>
  -1
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">
            <SlotCounter value={value2} containerClassName="slot-counter" />
            <button
              className="example-button"
              onClick={() => setValue2((prev) => prev + 50)}
            >
              +50
            </button>
          </div>
        </div>

        <div className="example-area">
          <h3>Options</h3>
          <h4>duration (second)</h4>
          <p>It is possible to set the duration of the animation.</p>
          <div className="playground">
            <SlotCounter
              ref={counterRef2}
              value="36.5"
              duration={2}
              autoAnimationStart={false}
              containerClassName="slot-counter"
            />
            <button
              type="button"
              className="example-button"
              onClick={() => counterRef2.current?.startAnimation()}
            >
              play
            </button>
          </div>
          <CommonHighlighter>
            {`<SlotCounter value="36.5" duration={2} />`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h4>dummyCharacters</h4>
          <p>It is possible to set the dummy characters.</p>
          <div className="playground">
            <SlotCounter
              ref={counterRef3}
              value="SUCCESS"
              containerClassName="slot-counter"
              dummyCharacters={'SUCCESS'.split('')}
              duration={2}
            />
            <button
              type="button"
              className="example-button"
              onClick={() => counterRef3.current?.startAnimation()}
            >
              play
            </button>
          </div>
          <CommonHighlighter>
            {`<SlotCounter
  value="SUCCESS"
  dummyCharacters={'SUCCESS'.split('')}
  duration={2}
/>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">
            <SlotCounter
              ref={counterRef4}
              containerClassName="slot-counter"
              value={['🍎', '🍎️', '🍎']}
              dummyCharacters={['🍎', '🍇', '🍉', '🍓', '🍋', '🍑', '🍒']}
              duration={2}
            />
            <button
              type="button"
              className="example-button"
              onClick={() => counterRef4.current?.startAnimation()}
            >
              play
            </button>
          </div>
          <CommonHighlighter>
            {`<SlotCounter
  value={['🍎', '🍎️', '🍎']}
  dummyCharacters={['🍎', '🍇', '🍉', '🍓', '🍋', '🍑', '🍒']}
  duration={2}
/>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h4>charClassName / separatorClassName</h4>
          <p>
            It is possible to set the class name of the character and the
            separator.
          </p>
          <div className="playground">
            <SlotCounter
              ref={counterRef5}
              containerClassName="slot-counter"
              value="36.5"
              charClassName="char"
              separatorClassName="sep"
            />
            <button
              type="button"
              className="example-button"
              onClick={() => counterRef5.current?.startAnimation()}
            >
              play
            </button>
          </div>
          <div className="format">CSS</div>
          <CommonHighlighter language="css">
            {`.char {
  padding: 0 10px;
  background: #eee;
}
.char + .char {
  margin-left: 5px;
}
.sep {
  padding: 0 2px;
}`}
          </CommonHighlighter>
          <br />
          <div className="format">JSX</div>
          <CommonHighlighter>
            {`<SlotCounter
  value="36.5"
  charClassName="char"
  separatorClassName="sep"
/>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h4>startValue</h4>
          <p>
            This example demonstrates the usage of the "startValue" property to
            set the starting value of the slot counter animation. Here, we set
            the start value to "123" and the end value to "777". When the
            animation runs, you can see it starting from "123" and ending at
            "777". The animation is triggered each time the "play" button is
            clicked.
          </p>
          <div className="playground">
            <SlotCounter
              ref={counterRef6}
              startValue="123"
              value="777"
              charClassName="char"
              dummyCharacterCount={10}
              duration={3}
              autoAnimationStart={false}
            />
            <button
              type="button"
              className="example-button"
              onClick={() => counterRef6.current?.startAnimation()}
            >
              play
            </button>
          </div>
          <CommonHighlighter>
            {`<SlotCounter
  ref={counterRef6}
  startValue="123"
  value="777"
  charClassName="char"
  dummyCharacterCount={10}
  duration={3}
  autoAnimationStart={false}
/>

// ...

<button
  type="button"
  onClick={() => counterRef6.current?.startAnimation()}
>
  play
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">
            <SlotCounter
              ref={slot5Ref}
              value={[
                <img className="item" src={item6} alt="" />,
                <img className="item" src={item6} alt="" />,
                <img className="item" src={item6} alt="" />,
              ]}
              startValue={[
                <img className="item" src={item1} alt="" />,
                <img className="item" src={item2} alt="" />,
                <img className="item" src={item3} alt="" />,
              ]}
              dummyCharacters={[
                <img className="item" src={item1} alt="" />,
                <img className="item" src={item2} alt="" />,
                <img className="item" src={item3} alt="" />,
                <img className="item" src={item4} alt="" />,
                <img className="item" src={item5} alt="" />,
                <img className="item" src={item6} alt="" />,
              ]}
            />
            <button
              type="button"
              className="example-button"
              onClick={() => slot5Ref.current?.startAnimation()}
            >
              play
            </button>
          </div>
          <CommonHighlighter>
            {`<SlotCounter
  value={[
    <img className="item" src={item6} alt="" />,
    <img className="item" src={item6} alt="" />,
    <img className="item" src={item6} alt="" />,
  ]}
  startValue={[
    <img className="item" src={item1} alt="" />,
    <img className="item" src={item2} alt="" />,
    <img className="item" src={item3} alt="" />,
  ]}
  dummyCharacters={[
    <img className="item" src={item1} alt="" />,
    <img className="item" src={item2} alt="" />,
    <img className="item" src={item3} alt="" />,
    <img className="item" src={item4} alt="" />,
    <img className="item" src={item5} alt="" />,
    <img className="item" src={item6} alt="" />,
  ]}
/>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Using the `ref` to Start Animation</h3>
          <h4>startAnimation</h4>
          <p>
            This method starts the animation of the `SlotCounter` component with
            optional parameters.
          </p>
          <div className="playground">
            <SlotCounter
              ref={counterRef1}
              value="54321"
              containerClassName="slot-counter"
            />
            <button
              className="example-button"
              onClick={() => counterRef1.current?.startAnimation()}
            >
              start animation (default)
            </button>
            <button
              className="example-button"
              onClick={() =>
                counterRef1.current?.startAnimation({
                  duration: 3,
                  dummyCharacterCount: 10,
                  direction: 'top-down',
                })
              }
            >
              start animation (with options)
            </button>
          </div>
          <CommonHighlighter>
            {`const counterRef = useRef<SlotCounterRef>(null);

// ...

<SlotCounter
  ref={counterRef}
  value="54321"
  containerClassName="slot-counter"
/>

<button
  className="example-button"
  onClick={() => counterRef.current?.startAnimation()}
>
  start animation (default)
</button>

<button
  className="example-button"
  onClick={() => counterRef.current?.startAnimation({
    duration: 3,
    dummyCharacterCount: 10,
    direction: 'top-down',
  })}
>
  start animation (with options)
</button>`}
          </CommonHighlighter>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/almond-bongbong/react-slot-counter"
          >
            https://github.com/almond-bongbong/react-slot-counter
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
