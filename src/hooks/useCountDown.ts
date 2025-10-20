import { useState, useEffect } from "react";

export const useCountDown = () => {
  const [rateRetryAfter, setRateRetryAfter] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (rateRetryAfter && rateRetryAfter > 0) {
      setCountdown(rateRetryAfter);

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setRateRetryAfter(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [rateRetryAfter]);

  const startCountdown = (retryAfter: number) => {
    setRateRetryAfter(retryAfter);
  };

  const isCountdownActive = rateRetryAfter !== null && countdown > 0;

  return {
    countdown,
    rateRetryAfter,
    isCountdownActive,
    startCountdown,
  };
};
