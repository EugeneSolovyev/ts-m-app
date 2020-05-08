import React from 'react';
import { Slider } from 'antd';
import { addSeconds, format } from 'date-fns';
import CurrentTrack from '../../components/current-track/index';

interface IPlayerTimeProps {
	currentTime: number;
	duration: number;
	onHandleChangeTime(value: any): void;
}

const DEFAULT_TIME: string = '00:00';

const formattedTime = (seconds: number): string => {
	try {
		const helperDate = addSeconds(new Date(0), seconds);
		return format(helperDate, 'mm:ss');
	} catch (e) {
		return DEFAULT_TIME;
	}
};

export default ({
	currentTime,
	duration,
	onHandleChangeTime,
}: IPlayerTimeProps) => (
	<div className='play-control'>
		<span className='time'>{formattedTime(currentTime)}</span>
		<CurrentTrack />
		<span className='time'>{formattedTime(duration)}</span>
		<Slider
			value={currentTime}
			min={0}
			max={duration}
			onChange={onHandleChangeTime}
			tooltipVisible={false}
		/>
	</div>
);
