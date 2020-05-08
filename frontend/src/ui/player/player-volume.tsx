import React from 'react';
import { Popover, Icon } from 'antd';
import LoopIcon from '@material-ui/icons/Loop';
import { VolumeSlider, AdditionalControlView } from './styles';

interface IAdditionalControlProps {
	volume: number;
	loop?: boolean;
	onChange(value: any): void;
	onToggleLoop(): void;
}

const AdditionalControl = ({
	volume,
	onChange,
	loop = false,
	onToggleLoop,
}: IAdditionalControlProps) => {
	return (
		<AdditionalControlView loop={loop}>
			<Popover
				content={<VolumeSlider vertical value={volume} onChange={onChange} />}>
				<Icon type='sound' />
			</Popover>
			<LoopIcon onClick={onToggleLoop} type='link' fontSize='inherit'>
				<Icon type='retweet' />
			</LoopIcon>
		</AdditionalControlView>
	);
};

export default AdditionalControl;
