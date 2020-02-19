import React, { createRef } from 'react';
import { pathOr, path } from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from '../../helpers/connect';
import { IAudio } from '../../reducers/reducers.d';
import { IStore } from '../../store'
import { setToPlay } from '../../actions/content'
import PlayerComponent from '../../ui/player'
import { currentPlaySelector } from './selector'

interface ITrackList {
	value: IAudio;
	next: IAudio | null;
}

interface IPlayerProp {
	content: ITrackList;
	setToPlay(id: string | number): void;
}

interface IPlayerState {
	list: ITrackList;
}

const DEFAULT_VALUE: any = { id: null, track: '' }

@(connect(
	(state: IStore) => ({
		content: currentPlaySelector(state)
	}),
	(dispatch) => bindActionCreators({
		setToPlay,
	}, dispatch)
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
		const { list } = this.state;
		this.content.current.src = list.value.track;
	}

	postHandleNext = (): void => {
		const { setToPlay } = this.props;
		const { list } = this.state
		const { id: newID, track } = pathOr(DEFAULT_VALUE, ['value'], list)
		
		if (track && newID) {
			this.content.current.src = track;
			setToPlay(newID)
		} else {
			this.content.current.pause();
		}
	}

    handleClickNext = (): void => {
        this.setState((prev: any) => ({
            list: path(['list', 'next'], prev),
        }), this.postHandleNext)
    }

	render() {
		return (
			<PlayerComponent 
				onClickNext={this.handleClickNext}
				ref={this.content}
			/>
		);
	}
}
