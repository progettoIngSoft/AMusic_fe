import {genericResponseNormalizer, IAction, IGenericResponse} from 'fetch-with-redux-observable'
import {IProfile} from '../profile.types'
import {fetchProfileAction, updateProfileAction} from './profile.actions'


type ProfileActionReducerTypes = IGenericResponse<IProfile>
export const profileReducer = (state: IProfile | null = null, action: IAction<ProfileActionReducerTypes>): IProfile | null => {
    switch (action.type) {
        case fetchProfileAction.successActionType:
        case updateProfileAction.successActionType:
            return genericResponseNormalizer(action.payload)
        default:
            return state
    }
}