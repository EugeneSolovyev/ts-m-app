/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, forwardRef, useCallback, useEffect } from 'react'

import PlayerControl from './player-control'
import PlayerTime from './player-time'
import PlayerVolume from './player-volume'
import PlayerView from './styles'

interface IPlayerProps {
    onClickNext(): void;
}

const EVENT_NAME: string = 'timeupdate'

const Player = forwardRef(({ onClickNext }: IPlayerProps, audioReference: any) => {
    const [isPlaying, setPlaying] = useState<boolean>(true)
    const [duration, setDuration] = useState<number>(0)
    const [time, setTime] = useState<number>(0)
    const [volume, setVolume] = useState<number>(50)
    const [loop, setLoop] = useState<boolean>(false)

    const timeUpdate = ({ target: { currentTime, duration } }: any) => {
        setTime(currentTime);
        setDuration(duration);

        if (duration !== 0 && currentTime === duration) {
            onClickNext();
        }
    }

    const handleTogglePlay = useCallback(() => {
        setPlaying(!isPlaying);
        const { current } = audioReference
        isPlaying ? current.pause() : current.play()
    }, [audioReference, isPlaying])

    const handleClickNext = useCallback(() => {
        onClickNext()
    }, [onClickNext])

    const handleChangeTime = useCallback((value: any) => {
        const { current } = audioReference;
        current.currentTime = value;
    }, [audioReference])

    const handleChangeVolume = useCallback((value: any) => {
        const { current } = audioReference;
        setVolume(value);
        current.volume = value / 100;
    }, [audioReference])

    const handleToggleLoop = useCallback(() => {
        const { current } = audioReference;
        setLoop(!loop);
        current.loop = !loop;
    }, [audioReference, loop])

    useEffect(() => {
        const { current } = audioReference;
        current.play();

        current.addEventListener(EVENT_NAME, timeUpdate)

        return () => {
            current.removeEventListener(EVENT_NAME, timeUpdate)
        }
    }, [audioReference])

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
                />
            </PlayerView>
            <audio ref={audioReference} />
        </>
    )
})

export default memo(Player)