import React from 'react'
import CurrentTrackView from './styles'

interface IProps {
    image: string;
    title: string;
    author: string;
}

const TrackCover = ({ image, title, author }: IProps) => (
    <CurrentTrackView>
        <img src={image} alt={title} />
        <span className="title">{title}</span>
        <span className="author">{author}</span>
    </CurrentTrackView>
)

export default TrackCover