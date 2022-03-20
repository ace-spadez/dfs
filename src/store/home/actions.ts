import { api } from '@/api';
import router from '@/router';
import { getLocalToken, removeLocalToken, saveLocalToken } from '@/utils';
import { AxiosError } from 'axios';
import { getStoreAccessors } from 'typesafe-vuex';
import { ActionContext } from 'vuex';
import { State } from '../state';
import {
   commitApplyContests,commitHomeSetContestsState,commitSetContestPage,commitSetHomeStandingsState
} from './mutations';
import { HomeState, ContestPageState, HomeContestsState, HomeStandingsState } from './state';
import {Contest,IUserPreview} from '@/interfaces';

type MainContext = ActionContext<HomeState, State>;

export const actions = {
    async actionGetContests(context: MainContext) {
        var token:string|null = context.state.token;
        if(token==="null" || !token){
            token = getLocalToken();
        }
        const homeContestsState:HomeContestsState= context.state.homeContestsState;
        homeContestsState.error=false;
        homeContestsState.loading=true;
        homeContestsState.contests=[];
        commitHomeSetContestsState(context,homeContestsState);
        try{
            var response = await api.getHomeContests(String(token))
            console.log(response.data)
            homeContestsState.contests = response.data['body']
            homeContestsState.loading=false;
            commitHomeSetContestsState(context,homeContestsState);

        }
        catch(err){
            console.log(err)
            homeContestsState.error=true;
            homeContestsState.loading=false;
            commitHomeSetContestsState(context,homeContestsState);
        }
        
        
       

    },
    async actionApplyContests(context:MainContext,contest_data:any){
        var token:string|null = context.state.token;
        if(token==="null" || !token){
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
        if(token==="null" || !token){
            token = getLocalToken();
        }
        const HomeStandingsState:HomeStandingsState=context.state.homeStandingsState;
        HomeStandingsState.error=false;
        HomeStandingsState.loading=true;
        HomeStandingsState.standings=[];
        commitSetHomeStandingsState(context,HomeStandingsState);
        try{
            var response = await api.getRankList(String(token),null)
            console.log(response.data)
            HomeStandingsState.standings = response.data['body']
            HomeStandingsState.loading=false;
            commitSetHomeStandingsState(context,HomeStandingsState);

        }
        catch(err){
            console.log(err)
            HomeStandingsState.error=true;
            HomeStandingsState.loading=false;
            commitSetHomeStandingsState(context,HomeStandingsState);
        }


        
      
    },
    async actionGetContestPageContests(context: MainContext,page_num:number) {
        var token:string|null = context.state.token;
        if(token==="null" || !token){
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
