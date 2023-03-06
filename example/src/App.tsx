import React from 'react';
import SlotCounter from 'react-slot-counter';
import './App.css';

function App() {
  return (
    <div className="app">
      <span>hello</span>
      <div>
        <SlotCounter value={12312412} />
      </div>
      <div>
        <SlotCounter value="12412,21" />
      </div>
    </div>
  );
}

export default App;
