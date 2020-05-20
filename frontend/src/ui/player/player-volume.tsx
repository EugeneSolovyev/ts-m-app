import React, {useState, useEffect} from 'react';
import { Popover, Icon } from 'antd';
import { Loop } from '@material-ui/icons';
import { VolumeSlider, AdditionalControlView } from './styles';
import {FavoriteButton} from "./player-favorite";
import {LikeButton} from "./player-like";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {Slider} from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


interface IAdditionalControlProps {
  volume: number;
  loop?: boolean;
  onChange(value: any): void;
  onToggleLoop(): void;
  likes: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        arrow: {
            color: '#2c3e50'
        },
        tooltip: {
            backgroundColor: '#2c3e50',
            width: 200,
            height: 35,
            paddingLeft: 20,
            paddingRight: 20,
            boxShadow: ' 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
        },
    }),
);


const AdditionalControl = ({
  volume,
  onChange,
  loop = false,
  onToggleLoop,
  likes
}: IAdditionalControlProps) => {
    const [sound, setSound] = useState(true);
    const [soundMemory, setSoundMemory] = useState(volume);
    const classes = useStyles();

    const handleChangeVolume = (event: any, newValue: any) => {
        if (!sound) setSound(true);
        setSoundMemory(newValue);
        onChange(soundMemory)
    };

    useEffect(() => {
        if (!sound) {
            onChange(0)
        } else {
            onChange(soundMemory)
        }
    });

    return (
    <AdditionalControlView loop={loop}>
        <Tooltip title={
            <Slider
                value={volume}
                color='secondary'
                onChange={handleChangeVolume}
            />
        } arrow interactive classes={classes}>
            <IconButton
                children={volume > 0 ? <VolumeUpIcon/> : <VolumeOffIcon/>}
                onClick={() => setSound(!sound)}
                color='inherit'
            />
        </Tooltip>

        <Loop onClick={onToggleLoop} type='link' fontSize='small'>
        <Icon type='retweet' />
      </Loop>
      <FavoriteButton />
      <LikeButton likes={likes} />
    </AdditionalControlView>
  );
};

export default AdditionalControl;
