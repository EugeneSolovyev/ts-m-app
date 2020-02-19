import { combineReducers, createStore, applyMiddleware, compose, Store, AnyAction } from 'redux';
import thunk from 'redux-thunk';

import logger from '../helpers/logger.middleware';
import UserReducer from '../reducers/user';
import ContentReducer from '../reducers/content'
import { IUserReducerState, IContentReducerState } from '../reducers/reducers.d';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

export interface IStore {
	user: IUserReducerState;
	content: IContentReducerState;
}

export type StoreType = Store<IStore, AnyAction>;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers<IStore>({
	user: UserReducer,
	content: ContentReducer,
});

const ApplicationStore: StoreType = createStore(reducers, composeEnhancers(applyMiddleware(thunk, logger)));

export default ApplicationStore;
