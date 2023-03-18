import React from 'react';
import CommonHighlighter from './components/CommonHighlighter';
import SlotCounter, { SlotCounterRef } from 'react-slot-counter';
import './App.css';

function App() {
  const [value, setValue] = React.useState(123456);
  const counterRef1 = React.useRef<SlotCounterRef>(null);
  const counterRef2 = React.useRef<SlotCounterRef>(null);
  const counterRef3 = React.useRef<SlotCounterRef>(null);
  const counterRef4 = React.useRef<SlotCounterRef>(null);
  const counterRef5 = React.useRef<SlotCounterRef>(null);

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
            <SlotCounter value={123456} />
          </div>
          <CommonHighlighter>{`<SlotCounter value={123456} />`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">
            <SlotCounter value="1,234,567" />
          </div>
          <CommonHighlighter>{`<SlotCounter value="1,234,567" />`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">
            <SlotCounter value="?????" />
          </div>
          <CommonHighlighter>
            {`<SlotCounter value="?????" />`}
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
          </div>
          <CommonHighlighter>
            {`<const [value, setValue] = useState(123456);

//...

<SlotCounter value={value} />
<button onClick={() => setValue(value + 1)}>
  +1
</button>`}
          </CommonHighlighter>
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
              containerClassName="slot-counter"
            />
            <button
              type="button"
              className="example-button"
              onClick={() => counterRef2.current?.startAnimation()}
            >
              ▶︎
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
              ▶︎
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
              ▶︎
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
              ▶︎
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
          <h3>Using the `ref` to Start Animation</h3>
          <h4>startAnimation</h4>
          <p>
            This method starts the animation of the `SlotCounter` component.
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
              start animation
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
  start animation
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
