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
import {currentTrackSelector} from "../player/selector";


interface IListState {
	selectedIndex: string | number;
}

@(connect((state: IStore) => ({
		list: favoriteTracksSelector(state),
		current: currentTrackSelector(state),
	}),
	(dispatch) =>
		bindActionCreators(
			{
				setToPlay,
			},
			dispatch
		)) as any)
export default class TrackList extends React.Component<any, IListState> {
	constructor(props: any) {
		super(props);
		this.state ={
			selectedIndex: ''
		}
	}

	handleChangeSelected = (id: string | number): void => {
		this.setState({selectedIndex: id});
	};

	goPlayer = (id: string | number) => () => {
		this.handleChangeSelected(id);
		this.props.setToPlay(id);
	};

	render() {
		const { list } = this.props;
		return (
			<TrackListView>
				<List>
				{list.map(({ track_id, title, author,cover_id }: IAudio) => (
					<ListItem
						button
						key={track_id}
						selected={this.state.selectedIndex === track_id}
                        onClick={this.goPlayer(track_id)}
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
