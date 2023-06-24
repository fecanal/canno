import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Canvas as Piano } from './compnents/Canvas'
function App() {
  const [playing,setPlaying] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
      
        <img src={logo} className="App-logo" alt="logo" />
        <h2>卡农</h2>
        <Piano playing={playing} />
        <br/>
        <button
          target="_blank"
          id="button"
          rel="noopener noreferrer"
          onClick={async () => {
            setPlaying(true)
            console.log('start to play ~');
          }}
        >
          开始
        </button>
      </header>

    </div>
  );
}

export default App;
