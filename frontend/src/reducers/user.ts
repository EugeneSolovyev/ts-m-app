import { IActionType, IUserReducerState } from './reducers.d';
import { User } from '../constants/user.enum'
import { path } from 'ramda'

const INITIAL_STATE: IUserReducerState = {
	current: JSON.parse(localStorage.getItem('USER') || 'null'),
	other: JSON.parse(localStorage.getItem('USERS') || '[]'),
};

export default (state: IUserReducerState = INITIAL_STATE, { type, payload }: IActionType): IUserReducerState => {
	if (typeof payload === 'function' && type === User)  {
		state = payload(state);

		localStorage.setItem('USERS', JSON.stringify([
			...state.other.filter((user) => user.id !== path(['current', 'id'], state)),
			state.current
		]));
		
		localStorage.setItem('USER', JSON.stringify(state.current));
	}

	return state;
};
