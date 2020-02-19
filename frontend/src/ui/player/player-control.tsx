import React from 'react';
import { Button, Icon } from 'antd';

interface IPlayerControlProps {
	onTogglePlay(): void;
	onClickPrevious?(): void;
	onClickNext(): void;
	isPlaying: boolean;
}

export default ({ onTogglePlay, onClickNext, onClickPrevious, isPlaying }: IPlayerControlProps) => (
	<div className="control">
		{onClickPrevious && (
			<Button type="link" htmlType="button" onClick={onClickPrevious}>
				<Icon type="step-backward" />
			</Button>
		)}
		<Button type="link" htmlType="button" onClick={onTogglePlay}>
			<Icon type={isPlaying ? 'pause' : 'caret-right'} />
		</Button>
		<Button type="link" htmlType="button" onClick={onClickNext}>
			<Icon type="step-forward" />
		</Button>
	</div>
);
