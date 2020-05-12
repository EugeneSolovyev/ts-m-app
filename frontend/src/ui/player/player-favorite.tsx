import React, {useCallback, useEffect, useState} from "react";
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import {useSelector} from "react-redux";
import StarIcon from '@material-ui/icons/Star';


export const FavoriteButton: React.FC = () => {
  const [favoriteTracksData, setFavoriteTrack] = useState(() => {
    const favoriteTracks = localStorage.getItem('favoriteTracks');
    return JSON.parse(favoriteTracks || '[]');
  });
  const currentTrackId: string = useSelector((state: any): string => state.content.current.id);

  const checkTrackId = useCallback((trackData: string[]) =>
    trackData.some((trackId: string) => trackId === currentTrackId), [currentTrackId]);

  const handleToggleToFavorite = (): void => {
    if (checkTrackId(favoriteTracksData)) {
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
      {checkTrackId(favoriteTracksData) ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  )
}