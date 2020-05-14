import React, { useCallback } from 'react';
import { Icon, Button } from 'antd';
import { IAudio } from '../../reducers/reducers.d';
import { ContentCover } from './styles';

interface ICardProps extends IAudio {
	onAddToFavorite(track_id: string | number): void;
	onRemoveFromFavorite(track_id: string | number): void;
	onClickPlay(track_id: string | number): void;
}

export default ({
	track_id,
	title,
	author,
	cover_id,
	onAddToFavorite,
	onRemoveFromFavorite,
	onClickPlay,
}: ICardProps) => {
	const handleClickAdd = useCallback(() => onAddToFavorite(track_id), [track_id, onAddToFavorite]);
	const handleClickRemove = useCallback(() => onRemoveFromFavorite(track_id), [
		track_id,
		onRemoveFromFavorite,
	]);
	// const handleClickPlay = useCallback(() => onClickPlay(track_id), [ track_id, onClickPlay ]);

	return (
		<ContentCover image={`http://5.101.51.243:8080/music-service/file/${cover_id}`}>
			<div className='hoverable'>
				<Button type='link' htmlType='button' onClick={handleClickAdd}>
					<Icon type='plus' />
				</Button>
				<Button type='link' htmlType='button'>
					<Icon type='heart' />
				</Button>
				<Button type='link' htmlType='button' onClick={handleClickRemove}>
					<Icon type='minus' />
				</Button>
			</div>
		</ContentCover>
	);
};
