/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  memo,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

import PlayerControl from "./player-control";
import PlayerTime from "./player-time";
import PlayerVolume from "./player-volume";
import PlayerView from "./styles";

import { baseUrl } from "../../constants/content.enum";

interface IPlayerProps {
  onClickNext(): void;
  likes: number;
  src: string;
}

const EVENT_NAME: string = "timeupdate";

const Player = ({ onClickNext, likes, src }: IPlayerProps) => {
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(10);
  const [loop, setLoop] = useState<boolean>(false);

  const audioReference: any = useRef()

  const timeUpdate = ({ target: { currentTime, duration } }: any) => {
    setTime(currentTime);
    setDuration(duration);

    if (duration !== 0 && currentTime === duration) {
      onClickNext();
    }
  };

  const handleTogglePlay = useCallback(() => {
    setPlaying(!isPlaying);
    const { current } = audioReference;
    isPlaying ? current.pause() : current.play();
  }, [audioReference, isPlaying]);

  const handleClickNext = useCallback(() => {
    onClickNext();
  }, [onClickNext]);

  const handleChangeTime = useCallback(
    (event: React.ChangeEvent<{}>, value: any) => {
      const { current } = audioReference;
      current.currentTime = value;
    },
    [audioReference]
  );

  const handleChangeVolume = useCallback(
    (value: any) => {
      const { current } = audioReference;
      setVolume(value);
      current.volume = value / 100;
    },
    [audioReference]
  );

  const handleToggleLoop = useCallback(() => {
    const { current } = audioReference;
    setLoop(!loop);
    current.loop = !loop;
  }, [audioReference, loop]);

  useEffect(() => {
    const { current } = audioReference;

    current.play();
    setPlaying(true)

    current.addEventListener(EVENT_NAME, timeUpdate);

    return () => {
      current.removeEventListener(EVENT_NAME, timeUpdate);
    };
  }, [src]);

  return (
    <>
      <PlayerView>
        <PlayerControl
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onClickNext={handleClickNext}
        />
        <PlayerTime
          currentTime={time}
          duration={duration}
          onHandleChangeTime={handleChangeTime}
        />
        <PlayerVolume
          volume={volume}
          onChange={handleChangeVolume}
          loop={loop}
          onToggleLoop={handleToggleLoop}
          likes={likes}
        />
      </PlayerView>
      <audio ref={audioReference} src={`${baseUrl}/${encodeURIComponent(src)}`} preload="metadata" />
    </>
  );
};

export default memo(Player);
