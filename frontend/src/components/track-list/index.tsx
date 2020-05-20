import React from 'react';
import { connect } from '../../helpers/connect';
import { IStore } from '../../store';
import TrackListView from './styles';
import { IAudio } from '../../reducers/reducers.d';
import { favoriteTracksSelector } from './selectors'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {bindActionCreators} from "redux";
import {setToPlay} from "../../actions/content";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { baseUrl } from "../../constants/content.enum";

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
				{list.map(({ track_id, title, author,cover_id }: IAudio) => (
					<ListItem
						button
						key={track_id}
                        onClick={(args) => (dispatch: any, event: any) => {dispatch(setToPlay(track_id)); console.log(track_id)}}
					>
						<ListItemAvatar>
							<Avatar
								variant="rounded"
								src={`${baseUrl}/${cover_id}` || "/static/images/avatar/1.jpg"}
							/>
						</ListItemAvatar>
						<ListItemText
							primary={author}
							secondary={title}
						/>
					</ListItem>
				))}
				</List>
			</TrackListView>
		);
	}
}
