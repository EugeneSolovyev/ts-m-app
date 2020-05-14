import React from 'react';
import CurrentTrackView from './styles';
import { baseUrl } from "../../constants/content.enum"
interface IProps {
	cover_id: string;
	title: string;
	author: string;
}

const TrackCover = ({ cover_id, title = 'title', author = 'author' }: IProps) => (
	<CurrentTrackView>
		<span className='track'>
			{cover_id && <img src={`${baseUrl}/${cover_id}`} alt={title} />}
			{title} - {author}
		</span>
	</CurrentTrackView>
);

export default TrackCover;
