import {UserState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
   
  userProfileState : (state: UserState)=> state.userProfile,
  userProfilePatchState: (state:UserState)=>state.userProfilePatchState,
  userRatingHistoryState: (state:UserState)=>state.userRatingHistoryState,
  addToWatchlistState: (state:UserState)=>state.addToWatchList
};

const {read} = getStoreAccessors<UserState, State>('');

export const readUserProfileState= read(getters.userProfileState);
export const readUserProfilePatchState= read(getters.userProfilePatchState);
export const readUserRatingHistoryState= read(getters.userRatingHistoryState);
export const readAddToWatchlistyState= read(getters.addToWatchlistState);
