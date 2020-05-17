import React from "react";
import IconButton from '@material-ui/core/IconButton'
import {useDispatch, useSelector} from "react-redux";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {toast} from "react-toastify";
import {getTracks, setToPlay} from "../../actions/content";
import {findIndex, propEq} from "ramda";


export const LikeButton: React.FC = () => {
  const currentTrackId: string = useSelector((state: any): string =>
    state.content.current && state.content.current.track_id);
  const tracksData: Array<object> = useSelector((state: any): any =>
    state.content.audio);
  const likes: string = useSelector((state: any): string =>
    state.content.current && state.content.current.likes)
  const dispatch = useDispatch();


  const handleToLike = async (event: any) => {
    let newCurrentTrackData = null;
    let newTracksData = tracksData;

    await fetch(`${new URL(`http://5.101.51.243:8080/music-service/file`)}`, {
      method: 'PUT',
      body:
        JSON.stringify({
          track_id: currentTrackId,
        }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(resolved => resolved.json()).then((data: any) => {
      newCurrentTrackData = data;

      newTracksData =
        newTracksData[findIndex(propEq('track_id', currentTrackId))(newTracksData)] = newCurrentTrackData;

      dispatch(getTracks(tracksData));
      dispatch(setToPlay(currentTrackId));

    }).catch(error => toast(error.message));
  }

  return (
    <div>
      {likes}
      <IconButton onClick={handleToLike} color="secondary">
        <FavoriteBorderIcon />
      </IconButton>
    </div>

  )
}