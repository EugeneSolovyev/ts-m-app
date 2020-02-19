import React, { useCallback } from 'react';
import { Icon, Button } from 'antd';
import { IAudio } from '../../reducers/reducers.d';
import { ContentCover } from './styles';

interface ICardProps extends IAudio {
	onAddToFavorite(id: string | number): void;
	onRemoveFromFavorite(id: string | number): void;
	onClickPlay(id: string | number): void;
}

export default ({ id, title, author, image, onAddToFavorite, onRemoveFromFavorite, onClickPlay }: ICardProps) => {
	const handleClickAdd = useCallback(() => onAddToFavorite(id), [ id, onAddToFavorite ]);
	const handleClickRemove = useCallback(() => onRemoveFromFavorite(id), [ id, onRemoveFromFavorite ]);
	// const handleClickPlay = useCallback(() => onClickPlay(id), [ id, onClickPlay ]);

	return (
		<ContentCover image={image}>
            <div className="hoverable">
                <Button type="link" htmlType="button" onClick={handleClickAdd}>
                    <Icon type="plus" />
                </Button>
                <Button type="link" htmlType="button">
                    <Icon type="heart" />
                </Button>
                <Button type="link" htmlType="button" onClick={handleClickRemove}>
                    <Icon type="minus" />
                </Button>
            </div>
        </ContentCover>
	);
};
