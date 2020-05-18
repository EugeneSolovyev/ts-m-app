import React from 'react';
import { connect } from '../../helpers/connect';
import { IStore } from '../../store'
import TrackListView from './styles'
import { IAudio } from '../../reducers/reducers.d'
import { favoriteTracksSelector } from './selectors'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {bindActionCreators} from "redux";
import {setToPlay} from "../../actions/content";



@(connect((state: IStore) => ({
	list: favoriteTracksSelector(state),
}),
	(dispatch) =>
		bindActionCreators(
			{
				setToPlay,
			},
			dispatch
		)) as any)
export default class TrackList extends React.Component<any> {

	render() {
		const { list } = this.props;

		return (
			<TrackListView>
				<List>
				{list.map(({ track_id, title, author }: IAudio) => (
					<ListItem
						button
						key={track_id}
                        onClick={event => {setToPlay(track_id)}}
					>
						<ListItemText primary={`${author} - ${title}`} />
					</ListItem>

				))}

				</List>
			</TrackListView>
		);
	}
}
