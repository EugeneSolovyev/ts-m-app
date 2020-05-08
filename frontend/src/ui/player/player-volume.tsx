import React from 'react';
import { Popover, Icon } from 'antd';
import { Loop } from '@material-ui/icons';
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
			<Loop onClick={onToggleLoop} type='link' fontSize='small'>
				<Icon type='retweet' />
			</Loop>
		</AdditionalControlView>
	);
};

export default AdditionalControl;
