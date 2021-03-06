import React from 'react';
import { Popover, Icon } from 'antd';
import { Loop } from '@material-ui/icons';
import { VolumeSlider, AdditionalControlView } from './styles';
import {FavoriteButton} from "./player-favorite";
import {LikeButton} from "./player-like";

interface IAdditionalControlProps {
  volume: number;
  loop?: boolean;
  onChange(value: any): void;
  onToggleLoop(): void;
  likes: number;
}

const AdditionalControl = ({
  volume,
  onChange,
  loop = false,
  onToggleLoop,
  likes
}: IAdditionalControlProps) => {
  return (
    <AdditionalControlView loop={loop}>
      <Popover
        content={<VolumeSlider vertical value={volume} onChange={onChange} />}>
        <Icon type='sound' />
      </Popover>
      <Loop onClick={onToggleLoop} type='link' fontSize='small'>
        <Icon type='retweet' />
      </Loop>
      <FavoriteButton />
      <LikeButton likes={likes} />
    </AdditionalControlView>
  );
};

export default AdditionalControl;
