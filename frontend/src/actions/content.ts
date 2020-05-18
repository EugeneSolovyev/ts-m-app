import { find, propEq } from 'ramda'
import {Content} from '../constants/content.enum'
import { IContentReducerState } from '../reducers/reducers.d'
import HTTP from "../common/api";
import {toast} from "react-toastify";

type PossibleIDType = number | string

const TEST: string = "/music-service/file";

export const getTracks = (tracks: any) => ({
	type: Content,
	payload: (state: any) => ({
		...state,
		audio: tracks,
	}),
});

export const setToPlay = (id: PossibleIDType) => ({
	type: Content,
	payload: <IContentReducerState>(state: any): IContentReducerState => ({
		...state,
		current: find(propEq('track_id', id))(state.audio)
	}),
});

export const setLikeToTrack = (trackId: string): any => async (dispatch: any, getState: Function) => {
	try {
		const current: any = await HTTP.put(TEST, {
			track_id: trackId,
		});
		
		dispatch({
			type: Content,
			payload: <IContentReducerState>(state: any): IContentReducerState => ({
				...state,
				audio: [...state.audio.filter(({track_id}: any) => track_id !== trackId), current],
				current
			})
		})

	} catch (error) {
		toast(error.message);
	}
}