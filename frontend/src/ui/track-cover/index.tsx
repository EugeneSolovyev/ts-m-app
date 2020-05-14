import React from 'react';
import CurrentTrackView from './styles';

interface IProps {
	cover_id: string;
	title: string;
	author: string;
}
const baseUrl = `http://5.101.51.243:8080/music-service/file`;

const TrackCover = ({ cover_id, title, author }: IProps) => (
	<CurrentTrackView>
		<span className='track'>
			<img src={`${baseUrl}/${cover_id}`} alt={title} />
			{title} - {author}
		</span>
	</CurrentTrackView>
);

export default TrackCover;
