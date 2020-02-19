import React from 'react';
import { Popover, Icon, Button } from 'antd';
import { VolumeSlider, AdditionalControlView } from './styles';

interface IAdditionalControlProps {
	volume: number;
    loop?: boolean;
	onChange(value: any): void;
    onToggleLoop(): void;
}

const AdditionalControl = ({ volume, onChange, loop = false, onToggleLoop }: IAdditionalControlProps) => {
	return (
		<AdditionalControlView loop={loop}>
			<Popover content={<VolumeSlider vertical value={volume} onChange={onChange} />}>
				<Icon type="sound" />
			</Popover>
			<Button onClick={onToggleLoop} type="link">
                <Icon type="retweet" />
            </Button>
		</AdditionalControlView>
	);
};

export default AdditionalControl;
