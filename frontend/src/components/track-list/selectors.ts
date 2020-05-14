import { pathOr, includes } from 'ramda'
import { createSelector } from 'reselect'
import { IAudio } from '../../reducers/reducers.d'
import { IStore } from '../../store'

const currentUserFavoriteTracks = (state: IStore): string[] | number[] => pathOr([], ['user', 'current', 'favorite'], state)
const trackListSelector = (state: IStore): IAudio[] => pathOr([], ['content', 'audio'], state)
export const favoriteTracksSelector = createSelector(
	[currentUserFavoriteTracks, trackListSelector],
	(current, wholeList): IAudio[] => wholeList.filter(({ track_id }: IAudio) => includes(track_id, current))
)