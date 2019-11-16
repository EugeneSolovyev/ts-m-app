import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import User from '../../constants/user'
import HTTP from '../../utils/http'

export const signIn = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  const response = await HTTP.post('/user-service/auth', {
    "password": "12345678",
    "username": "+375259348133"
  })

  console.log(response)
}

export const signOut = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => new Promise<void>(resolve => {
  setTimeout(() => {
    dispatch({ type: User.LOG_OUT })
    resolve()
  }, 1000)
})
