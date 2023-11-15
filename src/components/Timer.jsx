import { useState, useEffect } from 'react';
import styles from './Timer.module.css';

const Timer = () => {
  const [initialTime, setInitialTime] = useState(180);
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isUserInputActive, setIsUserInputActive] = useState(false)

  useEffect(() => {
    let timer;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime === 0) {
            clearInterval(timer);

            setIsRunning(false);
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);

  }, [isRunning, time]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(initialTime);
    setIsUserInputActive(false)
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInitialTime(parseInt(inputValue, 10) || 0);
  };

  const displayUserInput = () => {
    setIsUserInputActive(true)
  }
  const hideUserInput = () => {
    setIsUserInputActive(false)
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formatNumber = (number) => (number < 10 ? `0${number}` : number);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(remainingSeconds)}`;
  };

  return (
    <div>
      {isUserInputActive && (
        <div>
          <input
            className={styles.userInput}
            type="number"
            placeholder="Enter time in seconds"
            value={initialTime}
            onChange={handleInputChange}
          />
          <button onClick={handleReset} className={styles.userInputSubmit}>Done</button>
          <div
            className={styles.userInputOverlay}
            onClick={hideUserInput}></div>
        </div>

      )}
      <p className={styles.timerDisplay} onClick={displayUserInput}>{formatTime(time)}</p>
      <div className={styles.btnContainer}>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
