import React, { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [lap, setLap] = useState([]);

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [running]);

  function handleStart() {
    setRunning(true);
  }

  function handleStop() {
    setRunning(false);
  }

  function handleReset() {
    setLap([]);
    setTime(0);
    setRunning(false);
  }

  function handleLap() {
    setLap((prevLap) => [...prevLap, time]);
  }
  // every seconds have 1000 miliseconds ,therefore 60seconds *have(60*1000=>60000) and 1mint = 60seconds therefore, 1mint = 60000miliseconds and we suppose we have 65 seconds so it means 1mint 5seconds so for it we are diveding
  //first converts remaing time into miliseconds then into seconds by dividing by 1000;

  //   function timeFormat(time) {
  //     let minutes = Math.floor(time / 60000)
  //       .toString()
  //       .padStart(2, "0");
  //     let seconds = Math.floor((time % 60000) / 1000)
  //       .toString()
  //       .padStart(2, "0");
  //     let centiseconds = Math.floor((time % 1000) / 10)
  //       .toString()
  //       .padStart(2, "0");
  //     return `${minutes}:${seconds}:${centiseconds}`;
  //   }
  const timeFormat = (time) => {
    const minutes = Math.floor((time / 6000) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time / 100) % 60)
      .toString()
      .padStart(2, "0");
    const milliseconds = (time % 100).toString().padStart(2, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div>
      <h2>Timer</h2>
      <p>Time:{timeFormat(time)}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleLap}>Lap</button>
      <button onClick={handleReset}>Reset</button>
      <ul>
        {lap.map((l, index) => (
          <li key={index}>{timeFormat(l)}</li>
        ))}
      </ul>
    </div>
  );
}
