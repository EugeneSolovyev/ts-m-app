import { createSelector } from 'reselect'
import { pathOr, pipe, includes, filter } from 'ramda';
import { IAudio } from '../../reducers/reducers.d';
import { IStore } from '../../store'
import { convertArrayToList } from '../../helpers/arrayToList';

const audioSelector = (state: IStore): IAudio[] => pathOr([], ['content', 'audio'], state);
const favoriteSelector = (state: IStore): string[] | number[] =>
	pathOr([], ['user', 'current', 'favorite'], state);

export const currentPlaySelector = createSelector(
	[audioSelector, favoriteSelector],
	(wholeList: IAudio[], idList: string[] | number[]) =>
		pipe(
			(list: IAudio[]) =>
				filter(({ track_id }: IAudio) => (idList.length ? includes(track_id, idList) : true), list),
			convertArrayToList
		)(wholeList)
);
