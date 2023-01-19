import React from "react";
import { useDateCountdown } from "./useDateCountdown";

type TimerProps = {
  eventDate: string;
};

export default function Timer({ eventDate }: TimerProps) {
  const countdown = useDateCountdown(eventDate);
  const activeCountdown = `Only ${countdown.days} 
  day${parseInt(countdown.days) !== 1 ? "s" : ""} ${countdown.hours} 
  hour${parseInt(countdown.hours) !== 1 ? "s" : ""} ${countdown.minutes} 
  minute${parseInt(countdown.minutes) !== 1 ? "s" : ""} ${countdown.seconds} second${parseInt(countdown.seconds) !== 1 ? "s" : ""} left`;

  return countdown.loading ? null : <div> {countdown.active ? activeCountdown : "You can no longer register for this event"}</div>;
}
