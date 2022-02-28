import { api } from '@/api';
import router from '@/router';
import { getLocalToken, removeLocalToken, saveLocalToken } from '@/utils';
import { AxiosError } from 'axios';
import { getStoreAccessors } from 'typesafe-vuex';
import { ActionContext } from 'vuex';
import { State } from '../state';
import {
    commitSetQuadrantLoginState,
    commitSetCreateQuadrantContestState,
    commitSetQuadrantContestsState,
    commitSetPostSOPState

} from './mutations';
import { QuadrantState, QuadrantContestsState, CreateQuadrantContestState, QuadrantLoginState,PostSOP } from './state';
import {
    Contest, IUserPreview, ICreateContest,

} from '@/interfaces';

type MainContext = ActionContext<QuadrantState, State>;

export const actions = {
    async actionGetQuadrant(context: MainContext) {
        var token: string = context.state.token;
        const quadrantLoginState: QuadrantLoginState = context.state.quadrantLoginState;
        try {
            var response = await api.getQuadrant(String(token))
            console.log(response.data)
            quadrantLoginState.message = response.data['message'];
            if (response.data['body']) {
                quadrantLoginState.SOP = response.data['body']['SOP'];
                quadrantLoginState.is_applied = true;
            }
            quadrantLoginState.loading = false;
            commitSetQuadrantLoginState(context, quadrantLoginState);
        }
        catch (err) {
            quadrantLoginState.is_applied = false;
            quadrantLoginState.loading = false;
            quadrantLoginState.error = true;
            commitSetQuadrantLoginState(context, quadrantLoginState);
        }

    },
    async actionPostSOP(context:MainContext,sop:string){
        var token: string = context.state.token;
        const postSOP:PostSOP = context.state.postSOP;
        postSOP.loading = true;
        commitSetPostSOPState(context,postSOP);
        try {
            var response = await api.postSOP(String(token),sop)
            // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
            
            postSOP.loading = false;
            commitSetPostSOPState(context,postSOP);
        }
        catch (err) {
            console.log(err)
            postSOP.loading = false;
            postSOP.error = true;
            commitSetPostSOPState(context, postSOP);
        }

    },
    async actionGetQuadrantContests(context: MainContext, page: number = 1) {
        var token: string = context.state.token;
        const quadrantContestsState: QuadrantContestsState = context.state.quadrantContestsState;
        try {
            const response = await api.getQuadrantContests(token, page);
            const contests: Array<Contest> = response.data['body'];
            quadrantContestsState.contests = contests;
            quadrantContestsState.loading = false;
            commitSetQuadrantContestsState(context, quadrantContestsState)
        } catch (err) {
            console.log(err);
            quadrantContestsState.loading = false;
            quadrantContestsState.error = true;
            commitSetQuadrantContestsState(context, quadrantContestsState);
        }
    },
    async actionPostQuadrantContest(context: MainContext,contest:ICreateContest) {
        var token: string = context.state.token;
        const createQuadrantContestState: CreateQuadrantContestState = context.state.createQuadrantContestState;
        createQuadrantContestState.loading = true;
        commitSetCreateQuadrantContestState(context, createQuadrantContestState);
        try {
            const repsonse = await api.createQuadContest(token,contest);
            createQuadrantContestState.loading = false;
            createQuadrantContestState.created = true;
            commitSetCreateQuadrantContestState(context, createQuadrantContestState)
        }
        catch (err) {
            createQuadrantContestState.error = true;
            createQuadrantContestState.loading = false;
            commitSetCreateQuadrantContestState(context, createQuadrantContestState)
        }
    }
};

const { dispatch } = getStoreAccessors<QuadrantState | any, State>('');

export const dispatchGetQuadrant = dispatch(actions.actionGetQuadrant);
export const dispatchGetQuadrantContests = dispatch(actions.actionGetQuadrantContests);
export const dispatchPostQuadrantContest = dispatch(actions.actionPostQuadrantContest);
export const dispatchPostSOP = dispatch(actions.actionPostSOP);
