import { path, pathOr } from 'ramda'
import { createSelector } from 'reselect'
import { IUser } from '../../reducers/reducers.d'
import { IStore } from '../../store'

type UserIDType = string | number | void

const currentUserIDSelector = (state: IStore): UserIDType => path(['user', 'current', 'id'], state)
const otherWaitingListSelector = (state: IStore): IUser[] => pathOr([], ['user', 'other'], state)

export const actualListSelector = createSelector(
    [
        currentUserIDSelector,
        otherWaitingListSelector,
    ],
    (current: UserIDType, other: IUser[]): IUser[] => other.filter(({ id }: IUser): boolean => id !== current)
)