import React from 'react';
import SlotCounter from 'react-slot-counter';
import './App.css';
import CommonHighlighter from './components/CommonHighlighter';

function App() {
  return (
    <div className="example">
      <div className="container">
        <h2>react slot counter</h2>
        <p>This module uses slot machine animations to display numbers.</p>

        <h3>Basic usage</h3>
        <div className="example-area">
          <div className="playground">
            <SlotCounter value={123456} />
          </div>
          <CommonHighlighter>{`<SlotCounter value={123456} />`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">todo</div>
          <CommonHighlighter>
            {`toast('Lorem ipsum dolor sit ...')`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">todo</div>
          <CommonHighlighter>{`toast(<><b style={{ color: 'skyblue' }}>Hello,</b> world</>`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Time</h3>
          <div className="playground">todo</div>
          <CommonHighlighter>
            {`toast('This message is displayed for 1 second.', 1000)`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">todo</div>
          <CommonHighlighter>
            {`toast('This message is displayed for 1 second.', {
  time: 1000,
})`}
          </CommonHighlighter>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/almond-bongbong/react-simple-toasts"
          >
            https://github.com/almond-bongbong
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
