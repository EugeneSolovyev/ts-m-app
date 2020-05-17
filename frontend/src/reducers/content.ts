import { IActionType, IContentReducerState } from './reducers.d';
import { Content } from '../constants/content.enum';


const INITIAL_STATE: IContentReducerState = {
	audio: [],
	current: null
};

export default (state: IContentReducerState = INITIAL_STATE, { type, payload }: IActionType): IContentReducerState => {
	if (typeof payload === 'function' && type === Content) {
		state = payload(state);
	}
	return state;
};
