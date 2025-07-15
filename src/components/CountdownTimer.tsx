import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string; // Format: "YYYY-MM-DD"
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeBoxStyle = "bg-foldams-red bg-opacity-90 rounded-lg p-2 md:p-4 text-center flex-1";
  const timeNumberStyle = "text-2xl md:text-3xl lg:text-4xl font-bold";
  const timeLabelStyle = "text-xs uppercase tracking-wider";

  return (
    <div className="flex justify-center items-center w-full mx-auto max-w-md">
      <div className="grid grid-cols-4 gap-2 md:gap-3 w-full">
        <div className={timeBoxStyle}>
          <div className={timeNumberStyle}>{timeLeft.days}</div>
          <div className={timeLabelStyle}>Days</div>
        </div>
        <div className={timeBoxStyle}>
          <div className={timeNumberStyle}>{timeLeft.hours}</div>
          <div className={timeLabelStyle}>Hours</div>
        </div>
        <div className={timeBoxStyle}>
          <div className={timeNumberStyle}>{timeLeft.minutes}</div>
          <div className={timeLabelStyle}>Minutes</div>
        </div>
        <div className={timeBoxStyle}>
          <div className={timeNumberStyle}>{timeLeft.seconds}</div>
          <div className={timeLabelStyle}>Seconds</div>
        </div>
      </div>
    </div>
  );
}