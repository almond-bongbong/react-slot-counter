import React from 'react';
import CommonHighlighter from './components/CommonHighlighter';
import SlotCounter, { SlotCounterRef } from 'react-slot-counter';
import item1 from './images/diamond.png';
import item2 from './images/apple.png';
import item3 from './images/cherries.png';
import item4 from './images/watermelon.png';
import item5 from './images/orange.png';
import item6 from './images/seven.png';
import githubIcon from './images/common/github-icon.png';
import './App.css';

const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function App() {
  const [value1, setValue1] = React.useState(123);
  const [value2, setValue2] = React.useState(0);
  const [value3, setValue3] = React.useState(random(100, 999));
  const [value4, setValue4] = React.useState(0);
  const slot1Ref = React.useRef<SlotCounterRef>(null);
  const slot2Ref = React.useRef<SlotCounterRef>(null);
  const slot3Ref = React.useRef<SlotCounterRef>(null);
  const slot4Ref = React.useRef<SlotCounterRef>(null);
  const slot5Ref = React.useRef<SlotCounterRef>(null);
  const slot6Ref = React.useRef<SlotCounterRef>(null);
  const counterRef1 = React.useRef<SlotCounterRef>(null);
  const counterRef2 = React.useRef<SlotCounterRef>(null);
  const counterRef3 = React.useRef<SlotCounterRef>(null);
  const counterRef5 = React.useRef<SlotCounterRef>(null);
  const counterRef6 = React.useRef<SlotCounterRef>(null);
  const counterRef7 = React.useRef<SlotCounterRef>(null);
  const counterRef8 = React.useRef<SlotCounterRef>(null);

  return (
    <div className="example">
      <div className="container">
        <h2>Make Fun with React Slot Counter! 🎰</h2>

        <p className="description">
          Make your app more engaging with our easy and fun slot machine style counter! 🎊
        </p>

        <div className="index-section">
          <h3>📑 Table of Contents</h3>
          <ul>
            <li>
              <a href="#basic-usage">Basic Usage</a>
            </li>
            <li>
              <a href="#dynamic-value">Dynamic Value</a>
            </li>
            <li>
              <a href="#options">Options</a>
              <ul>
                <li>
                  <a href="#duration">Duration</a>
                </li>
                <li>
                  <a href="#speed">Speed</a>
                </li>
                <li>
                  <a href="#delay">Delay</a>
                </li>
                <li>
                  <a href="#dummy-characters">Dummy Characters</a>
                </li>
                <li>
                  <a href="#class-names">Class Names</a>
                </li>
                <li>
                  <a href="#start-value">Start Value</a>
                </li>
                <li>
                  <a href="#sequential-animation">Sequential Animation</a>
                </li>
                <li>
                  <a href="#monospace-width">Monospace Width</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#animate-visible">Animate on Visible</a>
            </li>
            <li>
              <a href="#slot-peek">Slot Peek</a>
            </li>
            <li>
              <a href="#ref-section">Ref Methods</a>
            </li>
          </ul>
        </div>

        <div className="divider" />

        <h3 id="basic-usage">🚀 Get Started!</h3>
        <p>Displaying numbers and strings have never been more fun! 😄</p>

        <div className="example-area">
          <div className="playground">
            <SlotCounter ref={slot1Ref} value={123456} />
            <button
              type="button"
              className="example-button"
              onClick={() => slot1Ref.current?.startAnimation()}
            >
              Play
            </button>
          </div>
          <CommonHighlighter>{`<SlotCounter value={123456} />`}</CommonHighlighter>

          <p className="info">
            * Curious about how the Play button works? You can check it out in the{' '}
            <a href="#ref-section">ref section</a> below.
          </p>
        </div>

        <div className="example-area">
          <div className="playground">
            <SlotCounter ref={slot2Ref} value="1,234,567" />
            <button
              type="button"
              className="example-button"
              onClick={() => slot2Ref.current?.startAnimation()}
            >
              Play
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
              Play
            </button>
          </div>
          <CommonHighlighter>{`<SlotCounter value="?????" />`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">
            <SlotCounter ref={slot4Ref} value={[<span>1</span>, <span>2</span>, <span>3</span>]} />
            <button
              type="button"
              className="example-button"
              onClick={() => slot4Ref.current?.startAnimation()}
            >
              Play
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

        <div className="divider" />

        <div className="example-area">
          <h3 id="dynamic-value">🎈 Dynamic Value: Let's Go With the Flow!</h3>
          <p>
            Life is dynamic and so are our animations! Whenever the value changes, our slot counter
            instantly springs into action with a fun animation. Join the fun and see it for
            yourself!
          </p>
          <div className="playground">
            <SlotCounter value={value1} containerClassName="slot-counter" />
            <button className="example-button" onClick={() => setValue1(value1 + 1)}>
              +1
            </button>
            <button className="example-button" onClick={() => setValue1(value1 + 5)}>
              +5
            </button>
            <button className="example-button" onClick={() => setValue1(value1 - 1)}>
              -1
            </button>
            <button className="example-button" onClick={() => setValue1(value1 - 5)}>
              -5
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

        <div className="divider" />

        <div className="example-area">
          <h3 id="options">⏱️ Options: Customize to Your Heart's Content!</h3>
          <h4 id="duration">
            <em>Duration</em>: Because Time Matters!
          </h4>
          <p>
            Love slow and smooth transitions or a quick flip? We've got you covered! Set the
            duration of your animation and watch your counters roll at your pace. Give it a try!
          </p>

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
              Play
            </button>
          </div>
          <CommonHighlighter>{`<SlotCounter value="36.5" duration={2} />`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <h4 id="speed">
            <em>Speed</em>: Control the pace!
          </h4>
          <p>
            Is the speed too slow? Or maybe too fast? With the speed attribute, this is no longer a
            concern!
          </p>

          <div className="playground">
            <SlotCounter
              ref={counterRef7}
              value="87.15"
              speed={10}
              containerClassName="slot-counter"
            />
            <button
              type="button"
              className="example-button"
              onClick={() => counterRef7.current?.startAnimation()}
            >
              Play
            </button>
          </div>
          <CommonHighlighter>{`<SlotCounter value="87.15" speed={10} />`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <h4 id="delay">
            <em>Delay</em>: Wait a minute!
          </h4>
          <p>
            Want to delay the animation of the characters? Simply set the delay attribute and let
            the magic unfold.
          </p>

          <div className="playground">
            <SlotCounter
              ref={counterRef8}
              value="35.99"
              delay={1}
              containerClassName="slot-counter"
            />
            <button
              type="button"
              className="example-button"
              onClick={() => counterRef8.current?.startAnimation()}
            >
              Play
            </button>
          </div>
          <CommonHighlighter>{`<SlotCounter value="35.99" delay={1} />`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <h4 id="dummy-characters">
            <em>Dummy Characters</em>: Play with Surprises!
          </h4>
          <p>
            Why limit yourself to 0-9 when you can choose any character to be your placeholder? Set
            your dummy characters and add a touch of surprise to your slot counters. Let's play with
            the unexpected!
          </p>

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
              Play
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
          <h4 id="class-names">
            <em>ClassName</em>: Dress Up Your Characters!
          </h4>
          <p>
            Customize the style of your characters and separators with unique class names. It's like
            a fashion show for your digits! Let's dress up and hit the play button! You can use
            <ul>
              <li>
                <code className="my-code">containerClassName</code>: Style the entire container
              </li>
              <li>
                <code className="my-code">charClassName</code>: Style individual numbers/characters
              </li>
              <li>
                <code className="my-code">separatorClassName</code>: Style separators (commas, dots)
              </li>
              <li>
                <code className="my-code">valueClassName</code>: Style the entire value display area
              </li>
              <li>
                <code className="my-code">numberSlotClassName</code>: Style the number slot area
              </li>
              <li>
                <code className="my-code">numberClassName</code>: Style the numbers themselves
              </li>
            </ul>
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
              Play
            </button>
          </div>
          <CommonHighlighter language="css">
            {`// CSS

.char {
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
          <CommonHighlighter>
            {`// JSX

<SlotCounter
  value="36.5"
  charClassName="char"
  separatorClassName="sep"
/>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h4 id="start-value">
            <em>StartValue</em>: The Power of Setting the Initial State
          </h4>
          <p>
            Get a control over the beginning of your slot animation! With{' '}
            <code className="my-code">startValue</code> property, you can set the starting point for
            your animation, and witness the magical transition from the start value to the final
            value. It's time for a test run, hit that "Play" button! 🕹️
          </p>
          <div className="playground">
            <SlotCounter
              ref={counterRef6}
              startValue={123}
              value={777}
              animateUnchanged
              direction="bottom-up"
              autoAnimationStart={false}
            />
            <button
              type="button"
              className="example-button"
              onClick={() => counterRef6.current?.startAnimation()}
            >
              Play
            </button>
          </div>
          <CommonHighlighter>
            {`<SlotCounter
  ref={counterRef}
  startValue={123}
  value={777}
  animateUnchanged
  direction="bottom-up"
  autoAnimationStart={false}
/>

// ...

<button
  type="button"
  className="example-button"
  onClick={() => counterRef.current?.startAnimation()}
>
  Play
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h4>
            <em>StartValueOnce</em>: One-Time Flashback
          </h4>
          <p>
            Ever wanted to kick-off your animation from a particular value only for the first time
            and then let it animate from the last value onwards? Meet our new property{' '}
            <code className="my-code">startValueOnce</code>. Just set{' '}
            <code className="my-code">startValueOnce</code> to true, and your animation will start
            with the <code className="my-code">startValue</code> for the first render. For
            subsequent animations, it starts from the last value. It's like having a flashback
            before getting on with the present!
          </p>
          <div className="playground">
            <SlotCounter
              startValue={123}
              startValueOnce
              value={value3}
              animateUnchanged
              direction="bottom-up"
              autoAnimationStart={false}
            />
            <button
              type="button"
              className="example-button"
              onClick={() => setValue3(random(100, 999))}
            >
              Play
            </button>
          </div>
          <CommonHighlighter>
            {`<SlotCounter
  startValue={123}
  startValueOnce
  value={value}
  animateUnchanged
  direction="bottom-up"
  autoAnimationStart={false}
/>

// ...

<button
  type="button"
  className="example-button"
  onClick={() => setValue(random(100, 999))}
>
  Play
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <div className="playground">
            <SlotCounter
              ref={slot5Ref}
              startValueOnce
              autoAnimationStart={false}
              startValue={[
                <img className="item" src={item1} alt="" />,
                <img className="item" src={item2} alt="" />,
                <img className="item" src={item3} alt="" />,
              ]}
              value={[
                <img className="item" src={item6} alt="" />,
                <img className="item" src={item6} alt="" />,
                <img className="item" src={item6} alt="" />,
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
              Play
            </button>
          </div>
          <CommonHighlighter>
            {`<SlotCounter
  startValueOnce
  autoAnimationStart={false}
  startValue={[
    <img className="item" src={item1} alt="" />,
    <img className="item" src={item2} alt="" />,
    <img className="item" src={item3} alt="" />,
  ]}
  value={[
    <img className="item" src={item6} alt="" />,
    <img className="item" src={item6} alt="" />,
    <img className="item" src={item6} alt="" />,
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
          <h4 id="sequential-animation">
            <em>SequentialAnimationMode</em>: Show Sequential Number Changes!
          </h4>
          <p>
            Want to show all intermediate numbers when a value increases or decreases? Use the{' '}
            <code className="my-code">sequentialAnimationMode</code> property. For example, when
            changing from 1 to 3, the animation will show 1 → 2 → 3 in sequence. When decreasing, it
            will show 3 → 2 → 1 in reverse order.
          </p>

          <div className="playground">
            <SlotCounter value={value2} sequentialAnimationMode useMonospaceWidth />
            <button type="button" className="example-button" onClick={() => setValue2(value2 + 1)}>
              +1
            </button>
            <button type="button" className="example-button" onClick={() => setValue2(value2 + 5)}>
              +5
            </button>
            <button
              type="button"
              className="example-button"
              onClick={() => setValue2(Math.max(value2 - 1, 0))}
            >
              -1
            </button>
            <button
              type="button"
              className="example-button"
              onClick={() => setValue2(Math.max(value2 - 5, 0))}
            >
              -5
            </button>
          </div>
          <CommonHighlighter>{`<SlotCounter
  value={value}
  sequentialAnimationMode
/>`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <h4 id="monospace-width">
            <em>UseMonospaceWidth</em>: Keep It Uniform!
          </h4>
          <p>
            Ever dreamed of having all your numbers occupy the same horizontal space? Set the{' '}
            <code className="my-code">useMonospaceWidth</code> property to true and voilà! It's like
            dressing your numbers in a monospace suit, perfect for when the width of the digits is
            crucial, such as in a slot machine or counter animation. If you prefer a more casual
            look, set it to false (the default value) and let each digit show off its unique width
            based on the chosen font.
          </p>

          <div className="playground">
            <SlotCounter value={value4} sequentialAnimationMode useMonospaceWidth />
            <button type="button" className="example-button" onClick={() => setValue4(value4 + 1)}>
              +1
            </button>
            <button type="button" className="example-button" onClick={() => setValue4(value4 + 5)}>
              +5
            </button>
            <button
              type="button"
              className="example-button"
              onClick={() => setValue4(Math.max(value4 - 1, 0))}
            >
              -1
            </button>
            <button
              type="button"
              className="example-button"
              onClick={() => setValue4(Math.max(value4 - 5, 0))}
            >
              -5
            </button>
          </div>
          <CommonHighlighter>{`<SlotCounter
  value={value}
  useMonospaceWidth
/>`}</CommonHighlighter>
        </div>

        <div className="divider" />

        <div className="example-area">
          <h3 id="animate-visible">✨ Animate on Visible: Make a Grand Entrance!</h3>
          <p>
            Want to make a big impact the moment your counter comes into view? Say no more! With the{' '}
            <code className="my-code">animateOnVisible</code> property, your slot counter will only
            start animating when it enters the viewport. And yes, you have the power to customize it
            further!
          </p>
          <p>
            Use a simple boolean for basic functionality, or get creative with an object that
            includes <code className="my-code">rootMargin</code> to set the margins around the
            component. Just like the IntersectionObserver's rootMargin option, it helps in
            triggering the animation relative to the viewport. And don't forget{' '}
            <code className="my-code">triggerOnce</code> to decide if the animation should play once
            or every time it comes into view. The stage is yours!
          </p>
          <div className="playground">
            <SlotCounter
              value="54321"
              containerClassName="slot-counter"
              animateOnVisible={{ triggerOnce: false, rootMargin: '0px 0px -100px 0px' }}
            />
          </div>
          <CommonHighlighter>
            {`<SlotCounter
  value="54321"
  animateOnVisible={{ triggerOnce: false, rootMargin: '0px 0px -100px 0px' }}
/>`}
          </CommonHighlighter>
        </div>

        <div className="divider" />

        <div id="slot-peek-section" className="example-area">
          <h3 id="slot-peek">👀 Slot Peek: Take a Sneak Peek!</h3>
          <p>
            Add excitement to your slot animations! The <code className="my-code">slotPeek</code>{' '}
            property reveals a glimpse of the previous and next numbers, just like a real slot
            machine. Simply set the peek height in pixels to control how much of the adjacent
            numbers show through.
          </p>

          <p>
            By adjusting the <code className="my-code">line-height</code> value appropriately, you
            can perfectly control the spacing between the visible numbers above and below. Give it a
            spin! 🎰✨
          </p>

          <div className="example-area">
            <div className="playground" style={{ lineHeight: '1' }}>
              <SlotCounter
                ref={slot6Ref}
                startValue={412}
                startValueOnce
                autoAnimationStart={false}
                value="777"
                duration={3}
                slotPeek={30}
              />
              <button
                type="button"
                className="example-button"
                onClick={() => slot6Ref.current?.startAnimation()}
              >
                Play
              </button>
            </div>
            <CommonHighlighter>{`<div style={{ lineHeight: '1' }}>
  <SlotCounter 
    startValue={412}
    startValueOnce
    autoAnimationStart={false}
    value="777"
    duration={3}
    slotPeek={30}
  />
</div>`}</CommonHighlighter>
          </div>
        </div>

        <div className="divider" />

        <div id="ref-section" className="example-area">
          <h3>🎮 Take the Control with `ref`</h3>
          <h4>StartAnimation: Command your Animation!</h4>
          <p>
            With the power of <code className="my-code">startAnimation</code> method and{' '}
            <code className="my-code">ref</code>, you are the true commander of your slot counter
            animation. Initiate the animation whenever you want and even define the parameters of
            the animation. Ready? Hit "Start Animation"! 🚀
          </p>
          <div className="playground">
            <SlotCounter
              ref={counterRef1}
              value="54321"
              useMonospaceWidth
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
  useMonospaceWidth
/>

<button onClick={() => counterRef.current?.startAnimation()}>
  start animation (default)
</button>

<button onClick={() => {
  counterRef.current?.startAnimation({
    duration: 3,
    dummyCharacterCount: 10,
    direction: 'top-down',
  });
}}>
  start animation (with options)
</button>`}
          </CommonHighlighter>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <span>Enjoying React Slot Counter? </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/almond-bongbong/react-slot-counter"
          >
            Show your love with a star! ⭐
          </a>

          <a
            className="github-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/almond-bongbong/react-slot-counter"
          >
            <img src={githubIcon} alt="Github icon" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
