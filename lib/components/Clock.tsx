import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    updateClock();
    const timerId = setInterval(updateClock, 60000); // Update every minute

    return () => clearInterval(timerId);
  }, []);

  return <>{time}</>;
};

export default Clock;
