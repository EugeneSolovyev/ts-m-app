import React from "react";
import { pathOr, path } from "ramda";
import { bindActionCreators } from "redux";
import { connect } from "../../helpers/connect";
import { IAudio } from "../../reducers/reducers.d";
import { IStore } from "../../store";
import { setToPlay } from "../../actions/content";
import { getAllMusic } from "../../actions/content";
import PlayerComponent from "../../ui/player";
import { currentTrackSelector } from "./selector";

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
    current: currentTrackSelector(state),
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
  state = {
    list: this.props.current,
  };

  componentDidMount() {
    this.props.getAllMusic();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.current !== prevProps.current) {
      this.setState((state, props) => ({
        list: this.props.current,
      }));
    }
  }

  postHandleNext = (): void => {
    const { track_id } = pathOr(DEFAULT_VALUE, ["list", "value"], this.state);

    if (track_id) {
      this.props.setToPlay(track_id);
    }
  };

  handleClickNext = (): void => {
    this.setState(
      (prev: any) => ({
        list: path(["list", "next"], prev),
      }),
      this.postHandleNext
    );
  };

  render() {
    const likes: number = pathOr(0, ["list", "value", "likes"], this.state);
    const trackId: string = pathOr(
      "",
      ["list", "value", "track_id"],
      this.state
    );

    return (
      <PlayerComponent
        onClickNext={this.handleClickNext}
        likes={likes}
        src={trackId}
      />
    );
  }
}
