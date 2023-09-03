'use client';

import React from 'react';
import SlotCounter, { SlotCounterRef } from 'react-slot-counter';

const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function App() {
  const [value1, setValue1] = React.useState(123);
  const [value2, setValue2] = React.useState(0);
  const [value3, setValue3] = React.useState(random(100, 999));
  const slot1Ref = React.useRef<SlotCounterRef>(null);
  const slot2Ref = React.useRef<SlotCounterRef>(null);
  const slot3Ref = React.useRef<SlotCounterRef>(null);
  const slot4Ref = React.useRef<SlotCounterRef>(null);
  const slot5Ref = React.useRef<SlotCounterRef>(null);
  const counterRef1 = React.useRef<SlotCounterRef>(null);
  const counterRef2 = React.useRef<SlotCounterRef>(null);
  const counterRef3 = React.useRef<SlotCounterRef>(null);
  const counterRef5 = React.useRef<SlotCounterRef>(null);
  const counterRef6 = React.useRef<SlotCounterRef>(null);

  return (
    <div className="example">
      <div className="container">
        <h2>Make Fun with React Slot Counter! 🎰</h2>

        <p className="description">
          Step into the exciting world of animations with our easy-to-use and customizable module.
          Let's spice up your application with slot machine style counters! 🎊
        </p>

        <h3>🚀 Get Started!</h3>
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
        </div>

        <div className="example-area">
          <h3>🎈 Dynamic Value: Let's Go With the Flow!</h3>
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
        </div>

        <div className="example-area">
          <h3>⏱️ Options: Customize to Your Heart's Content!</h3>
          <h4>Duration: Because Time Matters!</h4>
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
        </div>

        <div className="example-area">
          <h4>Dummy Characters: Play with Surprises!</h4>
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
        </div>

        <div className="example-area">
          <h4>CharClassName / SeparatorClassName: Dress Up Your Characters!</h4>
          <p>
            Customize the style of your characters and separators with unique class names. It's like
            a fashion show for your digits! Let's dress up and hit the play button!
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
          <div className="format">CSS</div>

          <br />
          <div className="format">JSX</div>
        </div>

        <div className="example-area">
          <h4>StartValue: The Power of Setting the Initial State</h4>
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
        </div>

        <div className="example-area">
          <h4>StartValueOnce: One-Time Flashback</h4>
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
        </div>

        <div className="example-area">
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() => slot5Ref.current?.startAnimation()}
            >
              Play
            </button>
          </div>
        </div>

        <div className="example-area">
          <h4>SequentialAnimationMode: For the Logical Minds!</h4>
          <p>
            Want your animation to make sense and be sequential? With{' '}
            <code className="my-code">sequentialAnimationMode</code> property, each step in the
            animation follows the previous one. No more random jumps, just clean logical
            transitions.
            <span className="thanks">
              A big shout out to @Konstantin9658 for this amazing suggestion!
            </span>
          </p>

          <h4>UseMonospaceWidth: Keep It Uniform!</h4>
          <p>
            Ever dreamed of having all your numbers occupy the same horizontal space? Set the{' '}
            <code className="my-code">useMonospaceWidth</code> property to true and voilà! It's like
            dressing your numbers in a monospace suit, perfect for when the width of the digits is
            crucial, such as in a slot machine or counter animation. If you prefer a more casual
            look, set it to false (the default value) and let each digit show off its unique width
            based on the chosen font.
            <br />
            <br />
            Keep in mind, this stylish prop is only applicable when numeric characters are the stars
            of your show. If you're using non-numeric characters or images, the effect might be less
            noticeable or not applicable at all. So, let's keep it uniform and enjoy the ride!
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
        </div>

        <div className="example-area">
          <h3>🎮 Take the Control with `ref`</h3>
          <h4>🕹️ StartAnimation: Command your Animation!</h4>
          <p>
            With the power of <code className="my-code">startAnimation</code> method and{' '}
            <code className="my-code">ref</code>, you are the true commander of your slot counter
            animation. Initiate the animation whenever you want and even define the parameters of
            the animation. Ready? Hit "Start Animation"! 🚀
          </p>
          <div className="playground">
            <SlotCounter
              useMonospaceWidth
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
        </div>
      </div>
    </div>
  );
}

export default App;
