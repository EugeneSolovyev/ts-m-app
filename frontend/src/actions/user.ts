import { find, propEq, pipe } from 'ramda';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import { User } from '../constants/user.enum';
import { IUserReducerState } from '../reducers/reducers.d';
import HTTP from '../common/api';

const STUB_CODE: string = '9999';
const VERIFY_PHONE_ENDPOINT: string = '/user-service/verification/phone/check-phone-code';
const SIGN_UP_ENDPOINT: string = '/user-service/users';
const LOGIN_ENDPOINT: string = '/user-service/auth';
const JWT_TOKEN_KEY: string = 'JWT_TOKEN_KEY';

interface IUser {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	repeatPassword: string;
	username: string;
	phone: string;
}

export const verifyPhone = async (phone: string): Promise<Error | boolean> => {
	const { token } = await HTTP.post(VERIFY_PHONE_ENDPOINT, { phone, code: STUB_CODE });

	if (token) {
		localStorage.setItem(JWT_TOKEN_KEY, `Bearer ${token}`);
		return true;
	} else {
		throw Error();
	}
};

export const createUser = async (user: IUser): Promise<Error | void> => {
	try {
		await HTTP.post(SIGN_UP_ENDPOINT, user);
	} catch (error) {
		toast.error(error.toString());
		throw Error(error);
	}
};

const auth = async (username: string, password: string): Promise<Error | any> => {
	try {
		const { token } = await HTTP.post(LOGIN_ENDPOINT, { username, password });
		localStorage.setItem(JWT_TOKEN_KEY, `Bearer ${token}`);
		return jwtDecode(token);
	} catch (error) {
		toast.error(error.toString());
		throw Error(error);
	}
};

const getProfileByID = async (id: number | string): Promise<any> => {
	return HTTP.get(`${SIGN_UP_ENDPOINT}/${id}`);
};

export const signIn = ({ username, password }: any) => async (dispatch: any) => {
	try {
		const { id } = await auth(username, password);
		const user = await getProfileByID(id);

		dispatch({
			type: User,
			payload: <IUserReducerState>(state: any): IUserReducerState => {
				const current = {
					id: user.id,
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					phone: user.phone,
					friendsList: [] as number[],
					waitingList: [] as number[],
					favorite: [] as number[]
				};

				return {
					...state,
					current,
				};
			}
		});
	} catch (error) {}
};

export const signOut = () => {
	localStorage.removeItem(JWT_TOKEN_KEY)
	return {
		type: User,
		payload: <IUserReducerState>(state: IUserReducerState): IUserReducerState => {
			return {
				...state,
				current: null
			};
		}
	};
};

export const addToWaitingList = (id: string | number) => ({
	type: User,
	payload: <IUserReducerState>(state: any): IUserReducerState => {
		const current = {
			...state.current,
			waitingList: Array.from(new Set([ id, ...state.current.waitingList ]))
		};

		const getDesiredUser = pipe(
			(userList: any) => find(propEq('id', id))(userList),
			(user: any) => ({
				...user,
				waitingList: Array.from(new Set([ current.id, ...user.waitingList ]))
			})
		);

		const desiredUser = getDesiredUser(state.other);

		const other = [
			...state.other.filter((user: any) => user.id !== current.id && user.id !== desiredUser.id),
			current,
			desiredUser
		];

		return {
			...state,
			current,
			other
		};
	}
});

export const addToFavorite = (id: string | number) => ({
	type: User,
	payload: <IUserReducerState>(state: any): IUserReducerState => ({
		...state,
		current: {
			...state.current,
			favorite: Array.from(new Set([ id, ...state.current.favorite ]))
		}
	})
});

export const removeFromFavorite = (id: string | number) => ({
	type: User,
	payload: <IUserReducerState>(state: any): IUserReducerState => ({
		...state,
		current: {
			...state.current,
			favorite: state.current.favorite.filter((contentID: string | number) => contentID !== id)
		}
	})
});
