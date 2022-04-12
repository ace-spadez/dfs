import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import {AddToWatchlist, UserState,UserProfilePatchState,UserProfileState,UserRatingHistoryState } from './state';
import {getLocalToken} from '@/utils'

const userProfilePatchState :UserProfilePatchState={
  loading:false,
  error: false,

}
const userProfileState:UserProfileState={
  loading:false,
  error:false,
}
const userRatingHistoryState:UserRatingHistoryState={
  loading:false,
  error:false,
  ratingHistory:[]
}
const addToWatchlist:AddToWatchlist={
  loading:false,
  error:false
}
const defaultState: UserState = {
 
  token: String(getLocalToken()),
  userProfile:userProfileState,
  userProfilePatchState:userProfilePatchState,
  userRatingHistoryState:userRatingHistoryState,
  addToWatchList:addToWatchlist
};

export const userModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
