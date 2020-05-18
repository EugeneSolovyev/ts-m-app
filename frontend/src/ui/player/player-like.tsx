import React from "react";
import IconButton from '@material-ui/core/IconButton'
import {useDispatch, useSelector} from "react-redux";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {setLikeToTrack} from "../../actions/content";
import { LikeButtonWrapper } from './styles'


interface ILikesProps {
  likes: number;
}

export const LikeButton: React.FC<ILikesProps> = ({likes}: ILikesProps) => {
  const currentTrackId: string = useSelector((state: any): string =>
    state.content.current && state.content.current.track_id);

  const dispatch = useDispatch();


  const handleToLike = async () => {
    await dispatch(setLikeToTrack(currentTrackId));
  }

  return (
    <LikeButtonWrapper>
      <span>{likes}</span>
      <IconButton onClick={handleToLike} color="secondary">
        <FavoriteBorderIcon />
      </IconButton>
    </LikeButtonWrapper>

  )
}
