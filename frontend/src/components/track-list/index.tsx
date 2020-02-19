import React from 'react';
import { connect } from '../../helpers/connect';
import { IStore } from '../../store'
import TrackListView, { TrackListItem } from './styles'
import { IAudio } from '../../reducers/reducers.d'
import { favoriteTracksSelector } from './selectors'

@(connect(
    (state: IStore) => ({
        list: favoriteTracksSelector(state),
    }),
) as any)
export default class TrackList extends React.Component<any> {
    render() {
        const { list } = this.props;
        
        return (
            <TrackListView>
                {list.map(({ id, title, author }: IAudio) => (
                    <TrackListItem key={id}>
                        <span className="track">{author} - {title}</span>
                    </TrackListItem>
                ))}
            </TrackListView>
        );
    }
}
