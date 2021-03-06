export interface IActionType {
	type: string | number;
	payload: <T>(state: T) => T;
}

export interface IUser {
	id: number | string;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	friendsList: number[] | string[];
	waitingList: number[] | string[];
	favorite: string[] | number[];
}

export interface IUserReducerState {
	current: IUser | null;
	other: IUser[];
}

export interface IAudio {
	track_id: string | number;
	title: string;
	author: string;
	cover_id?: string;
}

export interface IContentReducerState {
	audio: IAudio[];
	current: IAudio | null;
}