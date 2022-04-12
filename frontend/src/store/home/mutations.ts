import { Contest,IUserPreview } from '@/interfaces';
import { 
    HomeState, ContestPageState,HomeContestsState,HomeStandingsState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';


export const mutations = {

    setContests(state: HomeState, payload: HomeContestsState){
        console.log(payload)
        state.homeContestsState = payload;
    },
    applyContest(state:HomeState,payload:number){
        state.homeContestsState.contests[payload].is_applied=true
    },
    setStandings(state:HomeState,payload:HomeStandingsState){
        state.homeStandingsState = payload;
    },
    setContestPageState(state:HomeState,payload:ContestPageState){
        state.contestPage = payload;
    }

    
};

const {commit} = getStoreAccessors<HomeState | any, State>('');

export const commitHomeSetContestsState = commit(mutations.setContests);
export const commitApplyContests = commit(mutations.applyContest);
export const commitSetHomeStandingsState = commit(mutations.setStandings);
export const commitSetContestPage = commit(mutations.setContestPageState);
