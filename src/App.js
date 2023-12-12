import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  // const [initialMinutes, setInitialMinutes] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (totalSeconds === 0) {
      clearInterval(interval);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  // makeing constants
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setTotalSeconds((prevSeconds) => prevSeconds || inputMinutes * 60);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setInputMinutes(0);
    setRemainingSeconds(0);
  };

  const handlePause = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setInputMinutes(parseInt(value, 10));
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="countdown-container">
      <h1>Countdown Timer</h1>
      <div>
        <label htmlFor="minutes">Minutes: </label>
        <input type="number" id="minutes"
          value={isRunning ? Math.floor(totalSeconds / 60) : inputMinutes}
          onChange={handleChange} disabled={isRunning}
        />
      </div>
      <div>

        <p>Time Remaining: {formatTime(isRunning ? totalSeconds : remainingSeconds)}</p>
      </div>
      <div>
        {isRunning ? (
          <button onClick={handlePause}>
            <FontAwesomeIcon icon={faPause} />
          </button>
        ) : (
          <button onClick={handleStart}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
        <button onClick={handleReset}>
          <FontAwesomeIcon icon={faUndo} /></button>
      </div>
    </div>
  );
};

export default App;
