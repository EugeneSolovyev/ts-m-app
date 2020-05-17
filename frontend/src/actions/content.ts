import { find, propEq } from 'ramda'
import {Content} from '../constants/content.enum'
import { IContentReducerState } from '../reducers/reducers.d'

type PossibleIDType = number | string

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
	})
})
