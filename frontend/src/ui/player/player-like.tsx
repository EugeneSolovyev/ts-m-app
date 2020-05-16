import React from "react";
import IconButton from '@material-ui/core/IconButton'
import {useSelector} from "react-redux";
// import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {toast} from "react-toastify";


export const LikeButton: React.FC = (setToLike) => {
  console.log(setToLike)

  /*const [favoriteTracksData, setFavoriteTrack] = useState(() => {
    const favoriteTracks = localStorage.getItem('favoriteTracks');
    return JSON.parse(favoriteTracks || '[]');
  });*/
  const currentTrackId: string = useSelector((state: any): string => state.content.current && state.content.current.track_id);
  const likes: string = useSelector((state: any): string => state.content.current && state.content.current.likes)

  /*const checkTrackId = useCallback((trackData: string[]) =>
    trackData.some((trackId: string) => trackId === currentTrackId), [currentTrackId]);*/

  /*const handleToggleToFavorite = (): void => {
    if (checkTrackId(favoriteTracksData)) {
      const newFavoriteTracksData: null | Array<string> = favoriteTracksData.filter((trackId: string) => trackId !== currentTrackId);
      setFavoriteTrack(newFavoriteTracksData);

    } else {
      setFavoriteTrack((prev: Array<string>) => [currentTrackId, ...prev]);

    }
  }*/

  /*useEffect(() => {
    localStorage.setItem('favoriteTracks', JSON.stringify(favoriteTracksData));
  }, [favoriteTracksData]);*/

  const handleToLike = async (event: any) => {
    console.log(currentTrackId)

    await fetch(`${new URL(`http://5.101.51.243:8080/music-service/file`)}`, {
      method: 'PUT',
      body:
        JSON.stringify({
          track_id: currentTrackId,
        }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(resolved => resolved.json()).then((data: any) => {console.log(data)}
    ).catch(error => toast(error.message));

  }

  return (
    <div>
      {likes}
      <IconButton onClick={handleToLike} color="secondary" >
        {/*{checkTrackId(favoriteTracksData) ? <FavoriteIcon /> : <FavoriteBorderIcon />}*/}

        <FavoriteBorderIcon />
      </IconButton>
    </div>

  )
}