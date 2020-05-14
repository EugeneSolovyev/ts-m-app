import React, { createRef } from 'react';
import { pathOr, path } from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from '../../helpers/connect';
import { IAudio } from '../../reducers/reducers.d';
import { IStore } from '../../store'
import { setToPlay } from '../../actions/content'
import { getAllMusic } from './fetchMusic'
import PlayerComponent from '../../ui/player'
import { currentPlaySelector } from './selector'
import { baseUrl } from "../../constants/content.enum"

interface ITrackList {
	value: IAudio;
	next: IAudio | null;
}

interface IPlayerProp {
	content: ITrackList;
	setToPlay(track_id: string | number): void;
}

interface IPlayerState {
	list: ITrackList;
}

const DEFAULT_VALUE: any = { track_id: null };

@(connect(
	(state: IStore) => ({
		content: currentPlaySelector(state),
	}),
	(dispatch) =>
		bindActionCreators(
			{
				setToPlay,
				getAllMusic,
			},
			dispatch
		)
) as any)
export default class Player extends React.Component<any, IPlayerState> {
	constructor(props: any) {
		super(props);
		this.state = {
			list: this.props.content
		};
	}

	content = createRef<HTMLAudioElement>();

	componentDidMount() {
		this.props.getAllMusic();
	}
	componentDidUpdate(prevProps: any, prevState: any) {
		if (this.props.content !== prevProps.content) {
			this.setState((state, props) => ({
				list: this.props.content,
			}));
		}
		if (this.state.list !== prevState.list) {
			const { list } = this.state;
			if (list) {
				this.content.current.src = `${baseUrl}/${list.value.track_id}`;
			}
		}
	}

	postHandleNext = (): void => {
		const { setToPlay } = this.props;
		const { list } = this.state;
		const { track_id } = pathOr(DEFAULT_VALUE, ['value'], list);
		if (track_id) {
			this.content.current.src = `${baseUrl}/${track_id}`;
			setToPlay(track_id);
		} else {
			this.content.current.pause();
		}
	};

	handleClickNext = (): void => {
		this.setState(
			(prev: any) => ({
				list: path(['list', 'next'], prev),
			}),
			this.postHandleNext
		);
	};

	render() {
		return <PlayerComponent onClickNext={this.handleClickNext} ref={this.content} />;
	}
}
