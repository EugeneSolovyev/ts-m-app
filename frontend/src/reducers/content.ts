import { IActionType, IContentReducerState } from './reducers.d';
import { Content } from '../constants/content.enum';

const baseUrl = "http://5.101.51.243:8080/music-service/file";

const INITIAL_STATE: IContentReducerState = {
	audio: [],
	current: {
		track_id: `${baseUrl}/Hz5APT5EODtMPEsgLSAcPjs+ND5BQkwubXAz`,
		title: "Молодость",
		author: "Порнофильмы",
		cover_id: `IT04PD46IE06QDA9MCAyMDIwLTA1LTA0IDIgMTIuMzUuMDgucG5n`,
	},
};

export default (state: IContentReducerState = INITIAL_STATE, { type, payload }: IActionType): IContentReducerState => {
	if (typeof payload === 'function' && type === Content) {
		state = payload(state);
	}

	return state;
};
