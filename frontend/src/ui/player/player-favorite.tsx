import React, {useEffect, useState} from "react";
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import {useSelector} from "react-redux";
import StarIcon from '@material-ui/icons/Star';


export const FavoriteButton: React.FC = () => {
  const [favoriteTracksData, setFavoriteTrack] = useState(JSON.parse(localStorage.getItem('favoriteTracks') || '[]'));
  const currentTrackId: string = useSelector((state: any): string => state.content.current.id);


  const isTrackId = (TracksData: string[]) => {
    return TracksData.some((trackId: string) => trackId === currentTrackId);
  }

  const handleToggleToFavorite = (): void => {
    if (isTrackId(favoriteTracksData)) {
      const newFavoriteTracksData: null | Array<string> = favoriteTracksData.filter((trackId: string) => trackId !== currentTrackId);
      setFavoriteTrack(newFavoriteTracksData);

    } else {
      setFavoriteTrack((prev: Array<string>) => [currentTrackId, ...prev]);

    }
  }

  useEffect(() => {
    localStorage.setItem('favoriteTracks', JSON.stringify(favoriteTracksData));
  }, [favoriteTracksData]);

  return (
    <IconButton onClick={handleToggleToFavorite} color="secondary" >
      {isTrackId(favoriteTracksData) ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  )
}