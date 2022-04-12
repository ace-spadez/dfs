import { api } from '@/api';
import router from '@/router';
import { getLocalToken, removeLocalToken, saveLocalToken } from '@/utils';
import { AxiosError } from 'axios';
import { getStoreAccessors } from 'typesafe-vuex';
import { ActionContext } from 'vuex';
import { State } from '../state';
import {
    commitSetUserProfilePatchState, commitSetUserProfileState, commitSetUserRankingsHistory, commitSetAddToWatchlist

} from './mutations';
import { UserProfilePatchState, UserProfileState, UserRatingHistoryState, UserState, AddToWatchlist } from './state';
import { Contest, IUserPreview, IProfile, IRatingHistory, IPatchSelf } from '@/interfaces';

type MainContext = ActionContext<UserState, State>;

export const actions = {
    async actionGetUserProfile(context: MainContext, username: string) {
        var token = getLocalToken();
        const userProfileState: UserProfileState = context.state.userProfile;
        userProfileState.user = undefined;
        userProfileState.loading = true;
        commitSetUserProfileState(context, userProfileState);
        try {

            const response = await api.getUser(token, username);
            const userProfile: IProfile = response.data['body']


            userProfileState.user = userProfile;
            userProfileState.loading = false;
            commitSetUserProfileState(context, userProfileState);
        }
        catch (err) {
            console.log(err);
            userProfileState.loading = false;
            userProfileState.error = true;
            commitSetUserProfileState(context, userProfileState);

        }

    },
    async actionGetUserRankings(context: MainContext, username: string) {
        var token = getLocalToken();
        const userRatingHistoryState: UserRatingHistoryState = context.state.userRatingHistoryState;
        userRatingHistoryState.loading = true;
        userRatingHistoryState.ratingHistory = [];

        commitSetUserRankingsHistory(context, userRatingHistoryState);
        try {

            const response = await api.getRankingHistory(token, username);
            const userRatingHistory: IRatingHistory[] = response.data['body']


            userRatingHistoryState.ratingHistory = userRatingHistory;
            userRatingHistoryState.loading = false;
            commitSetUserRankingsHistory(context, userRatingHistoryState);
        }
        catch (err) {
            console.log(err);
            userRatingHistoryState.loading = false;
            userRatingHistoryState.error = true;
            commitSetUserRankingsHistory(context, userRatingHistoryState);

        }

    },
    async actionPatchSelf(context: MainContext, user: IPatchSelf) {
        var token = getLocalToken();
        const userProfilePatchState: UserProfilePatchState = context.state.userProfilePatchState;
        userProfilePatchState.loading = true;
        commitSetUserProfilePatchState(context, userProfilePatchState);
        try {

            const response = await api.patchSelf(token, user);
            const userProfilePatch: IProfile = response.data['body']


            userProfilePatchState.patchedProfile = userProfilePatch;
            userProfilePatchState.loading = false;
            
            commitSetUserProfilePatchState(context, userProfilePatchState);
        }
        catch (err) {
            console.log(err);
            userProfilePatchState.loading = false;
            userProfilePatchState.error = true;
            commitSetUserProfilePatchState(context, userProfilePatchState);

        }

    },
    async actionToggleWatchList(context: MainContext, payload: any) {
        var token = getLocalToken();
        const addToWatchList: AddToWatchlist = context.state.addToWatchList;
        const userProfileState: UserProfileState = context.state.userProfile;
        addToWatchList.loading = true;
        commitSetAddToWatchlist(context, addToWatchList)
        try {

            const response = await api.watchToggle(token, payload.username, payload.value);
            if (userProfileState.user)
                userProfileState.user.is_friend = !userProfileState.user.is_friend
            addToWatchList.loading = false;
            commitSetAddToWatchlist(context, addToWatchList)
            commitSetUserProfileState(context, userProfileState);

        }
        catch (err) {
            console.log(err);
            addToWatchList.loading = false;
            addToWatchList.error = true;
            commitSetAddToWatchlist(context, addToWatchList)

        }

    },




};

const { dispatch } = getStoreAccessors<UserState | any, State>('');

export const dispatchGetUserProfile = dispatch(actions.actionGetUserProfile);
export const dispatchPatchSelf = dispatch(actions.actionPatchSelf);
export const dispatchGetUserRankings = dispatch(actions.actionGetUserRankings);
export const dispatchWatchToggle = dispatch(actions.actionToggleWatchList);
