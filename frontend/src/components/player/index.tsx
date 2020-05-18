import React, { createRef } from "react";
import { pathOr, path } from "ramda";
import { bindActionCreators } from "redux";
import { connect } from "../../helpers/connect";
import { IAudio } from "../../reducers/reducers.d";
import { IStore } from "../../store";
import { setToPlay } from "../../actions/content";
import { getAllMusic } from "../../actions/content";
import PlayerComponent from "../../ui/player";
import { currentTrackSelector } from "./selector";
import { baseUrl } from "../../constants/content.enum";

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
  constructor(props: any) {
    super(props);
    this.state = {
      list: this.props.current,
    };
  }

  content = createRef<HTMLAudioElement>();

  private setTrackSrc(id: string | number) {
    this.content.current.src = `${baseUrl}/${id}`;
  }

  componentDidMount() {
    this.props.getAllMusic();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.current !== prevProps.current) {
      this.setState((state, props) => ({
        list: this.props.current,
      }));
    }
    if (this.props.current !== prevProps.current) {
      this.setTrackSrc(this.props.current.track_id);
    }
    if (this.state.list !== prevState.list) {
      const { list } = this.state;
      if (list) {
        this.setTrackSrc(list.value.track_id);
      }
    }
  }

  postHandleNext = (): void => {
    const { setToPlay } = this.props;
    const { list } = this.state;
    const { track_id } = pathOr(DEFAULT_VALUE, ["value"], list);
    if (track_id) {
      this.setTrackSrc(track_id);
      setToPlay(track_id);
    } else {
      this.content.current.pause();
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
    const likes: number = pathOr(0, ["list", "value", "likes"], this.state)

    return (
      <PlayerComponent
        onClickNext={this.handleClickNext}
        ref={this.content}
        likes={likes}
      />
    );
  }
}
