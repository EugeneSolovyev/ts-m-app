import { createSelector } from "reselect";
import { pathOr, pipe, includes, filter, findIndex } from "ramda";
import { IAudio } from "../../reducers/reducers.d";
import { IStore } from "../../store";
import { convertArrayToList } from "../../helpers/arrayToList";

const audioSelector = (state: IStore): IAudio[] =>
  pathOr([], ["content", "audio"], state);
const currentSelector = (state: IStore): IAudio[] =>
  pathOr([], ["content", "current"], state);
const favoriteSelector = (state: IStore): string[] | number[] =>
  pathOr([], ["user", "current", "favorite"], state);

export const currentPlaySelector = createSelector(
  [audioSelector, favoriteSelector],
  (wholeList: IAudio[], idList: string[] | number[]) =>
    pipe(
      (list: IAudio[]) =>
        filter(
          ({ track_id }: IAudio) =>
            idList.length ? includes(track_id, idList) : true,
          list
        ),
      convertArrayToList
    )(wholeList)
);

export const currentTrackSelector = createSelector(
  [audioSelector, currentSelector],
  (audioCollection: any, { track_id }: any) => {
    const currentTrackIndex: number = findIndex((audio: IAudio) => audio.track_id === track_id)(audioCollection);
		const audioCollectionChunk: IAudio[] = audioCollection.slice(currentTrackIndex)
		return convertArrayToList(audioCollectionChunk)
  }
);
