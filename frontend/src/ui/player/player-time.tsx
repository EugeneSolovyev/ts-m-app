import React from 'react'
import { Slider } from '@material-ui/core';
import { addSeconds, format } from 'date-fns'
interface IPlayerTimeProps {
    currentTime: number;
    duration: number;
    onHandleChangeTime(event: object, value: any): void;
}

const DEFAULT_TIME: string = '00:00'


const formattedTime = (seconds: number): string => {
  try {
    const helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, 'mm:ss');
  } catch (e) {
      return DEFAULT_TIME;
  }
}

export default ({ currentTime, duration, onHandleChangeTime }: IPlayerTimeProps) => (
    <div className="play-control">
        <span className="time">{formattedTime(currentTime)}</span>
        <span className="fullTime">{formattedTime(duration)}</span>
        <Slider color="secondary" value={currentTime} min={0} max={duration} onChange={onHandleChangeTime} aria-labelledby="continuous-slider" />
    </div>
)