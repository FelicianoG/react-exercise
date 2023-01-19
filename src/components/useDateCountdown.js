import { useState, useEffect, useCallback } from "react";

export function useDateCountdown(date) {
  const countDownDate = new Date(date).getTime();
  const [dateObj, setDateObj] = useState({ loading: true, active: true, days: "00", hours: "00", minutes: "00", seconds: "00" });

  const startInterval = useCallback(
    () =>
      setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setDateObj((prev) => {
          return {
            ...prev,
            loading: false,
            days,
            hours,
            minutes,
            seconds,
          };
        });

        if (distance < 0) {
          clearInterval(startInterval);
          setDateObj((prev) => {
            return { ...prev, loading: false, active: false };
          });
        }
      }, 1000),
    [countDownDate]
  );

  useEffect(() => {
    startInterval();
    return clearInterval(startInterval);
  }, [startInterval]);
  return dateObj;
}
