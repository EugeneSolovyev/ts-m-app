import React from 'react';
import CurrentTrackView from './styles';

interface IProps {
	image: string;
	title: string;
	author: string;
}

const TrackCover = ({ image, title, author }: IProps) => (
	<CurrentTrackView>
		<span className='track'>
			<img src={image} alt={title} />
			{title} - {author}
		</span>
	</CurrentTrackView>
);

export default TrackCover;
