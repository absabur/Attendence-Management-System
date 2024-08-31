import React, { useEffect, useState } from "react";
import "./MechanicalClock.css"; // We'll create this CSS file next

const MechanicalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const hour = time.getHours() % 12;
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourDeg = (hour + minute / 60) * 30; // 360 / 12
  const minuteDeg = (minute + second / 60) * 6; // 360 / 60
  const secondDeg = second * 6; // 360 / 60

  return (
    <div className="clock-container">
      <div className="clock">
        <div
          className="hand hour-hand"
          style={{ transform: `rotate(${hourDeg}deg)` }}
        />
        <div
          className="hand minute-hand"
          style={{ transform: `rotate(${minuteDeg}deg)` }}
        />
        <div
          className="hand second-hand"
          style={{ transform: `rotate(${secondDeg}deg)` }}
        />
        <div className="center-point" />
        <div className="clock-face">
          {[...Array(12).keys()].map((num) => (
            <div key={num} className={`number number-${num + 1}`}>
              {num + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MechanicalClock;
