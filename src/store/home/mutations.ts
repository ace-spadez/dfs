import { Contest,IUserPreview } from '@/interfaces';
import { 
    HomeState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';


export const mutations = {

    setContests(state: HomeState, payload: Contest[]){
        console.log(payload)
        state.contests = payload;
    },
    applyContest(state:HomeState,payload:number){
        state.contests[payload].is_applied=true
    },
    setStandings(state:HomeState,payload:IUserPreview[]){
        state.standings = payload;
    }

    
};

const {commit} = getStoreAccessors<HomeState | any, State>('');

export const commitSetContests = commit(mutations.setContests);
export const commitApplyContests = commit(mutations.applyContest);
export const commitSetStandings = commit(mutations.setStandings);
