import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import User from '../../constants/user'

export const signIn = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => new Promise<void>(resolve => {
  setTimeout(() => {
    dispatch({ type: User.SIGN_IN, payload: { name: 'User name' } })
    resolve()
  }, 1000)
})

export const signOut = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => new Promise<void>(resolve => {
  setTimeout(() => {
    dispatch({ type: User.LOG_OUT })
    resolve()
  }, 1000)
})
