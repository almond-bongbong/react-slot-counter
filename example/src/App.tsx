import React from 'react';
import CommonHighlighter from './components/CommonHighlighter';
import SlotCounter from 'react-slot-counter';
import './App.css';
import { SlotCounterRef } from '../../src';

function App() {
  const [value, setValue] = React.useState(123456);
  const counterRef = React.useRef<SlotCounterRef>(null);

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
            <SlotCounter value="??????" />
          </div>
          <CommonHighlighter>
            {`<SlotCounter value="??????" />`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Dynamic value</h3>
          <p>The animation will start when the value changes.</p>
          <div className="playground">
            <SlotCounter value={value} />
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
          <h3>Using the `ref` to Start Animation</h3>
          <h4>startAnimation</h4>
          <p>
            This method starts the animation of the `SlotCounter` component.
          </p>
          <div className="playground">
            <SlotCounter ref={counterRef} value="54321" />
            <button
              className="example-button"
              onClick={() => counterRef.current?.startAnimation()}
            >
              start animation
            </button>
          </div>
        </div>

        <div className="example-area">
          <h3>Options</h3>
          <h4>duration (second)</h4>
          <p>It is possible to set the duration of the animation.</p>
          <div className="playground">
            <SlotCounter value="36.5" duration={2} />
          </div>
          <CommonHighlighter>
            {`<SlotCounter value="36.5" duration={2} />`}
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
              value="36.5"
              charClassName="char"
              separatorClassName="sep"
            />
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
