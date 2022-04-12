import { Contest, IUserPreview } from '@/interfaces';
import {
    UserState, UserProfilePatchState, UserProfileState, UserRatingHistoryState, AddToWatchlist
} from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';


export const mutations = {

    setUserProfileState(state: UserState, payload: UserProfileState) {
        state.userProfile = payload;
    },
    setUserProfilePatchState(state: UserState, payload: UserProfilePatchState) {
        state.userProfilePatchState = payload
    },
    setUserRankingsHistory(state: UserState, payload: UserRatingHistoryState) {
        state.userRatingHistoryState = payload;
    },
    setAddToWatchlist(state: UserState, payload: AddToWatchlist) {
        state.addToWatchList = payload;
    },


};

const { commit } = getStoreAccessors<UserState | any, State>('');

export const commitSetUserProfileState = commit(mutations.setUserProfileState);
export const commitSetUserProfilePatchState = commit(mutations.setUserProfilePatchState);
export const commitSetUserRankingsHistory= commit(mutations.setUserRankingsHistory);
export const commitSetAddToWatchlist= commit(mutations.setAddToWatchlist);

