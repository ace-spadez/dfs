import { api } from '@/api';
import router from '@/router';
import { getLocalToken, removeLocalToken, saveLocalToken } from '@/utils';
import { AxiosError } from 'axios';
import { getStoreAccessors } from 'typesafe-vuex';
import { ActionContext } from 'vuex';
import { State } from '../state';
import {
    commitSetContests, commitApplyContests,commitSetStandings, commitSetContestPage
   
} from './mutations';
import { HomeState, ContestPageState } from './state';
import {Contest,IUserPreview} from '@/interfaces';

type MainContext = ActionContext<HomeState, State>;

export const actions = {
    async actionGetContests(context: MainContext) {
        var token:string|null = context.state.token;
        if(!token){
            token = getLocalToken();
        }
        
        
        var response = await api.getHomeContests(String(token))
        console.log(response.data)
        var contests : Contest[] =  response.data['body']
       commitSetContests(context,contests);

    },
    async actionApplyContests(context:MainContext,contest_data:any){
        var token:string|null = context.state.token;
        if(!token){
            token = getLocalToken();
        }
        try{
        var response = await api.applyForContest(String(token),contest_data.uuid)
        commitApplyContests(context,contest_data.id);
        }
        catch(err){
            console.log(err)
        }
    },
    async actionGetStandings(context: MainContext) {
        var token:string|null = context.state.token;
        if(!token){
            token = getLocalToken();
        }
        
        
        var response = await api.getRankList(String(token),null)
        console.log(response.data)
        var standings : IUserPreview[] =  response.data['body']
       commitSetStandings(context,standings)

    },
    async actionGetContestPageContests(context: MainContext,page_num:number) {
        var token:string|null = context.state.token;
        if(!token){
            token = getLocalToken();
        }
        const contestPageState:ContestPageState = context.state.contestPage;
        contestPageState.loading = true;
        commitSetContestPage(context,contestPageState);
      
        try{
        
        var response = await api.getContestPageContests(String(token),page_num);
        contestPageState.loading = false;
        contestPageState.contests = response.data['body']

        }
        catch(err){
            contestPageState.error = true;
            contestPageState.loading = false;
            commitSetContestPage(context,contestPageState);
            console.log(err);
        }

    },

    
};

const { dispatch } = getStoreAccessors<HomeState | any, State>('');

export const dispatchHomeGetContests = dispatch(actions.actionGetContests);
export const dispatchApplyContests = dispatch(actions.actionApplyContests);
export const dispatchHomeStandings = dispatch(actions.actionGetStandings);
export const dispatchContestPageContests = dispatch(actions.actionGetContestPageContests);
