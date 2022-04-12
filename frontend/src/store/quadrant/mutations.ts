import { Contest,IUserPreview } from '@/interfaces';
import { 
    QuadrantState,QuadrantContestsState,CreateQuadrantContestState, QuadrantLoginState,PostSOP } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';


export const mutations = {

    setQuadrantLoginState(state:QuadrantState,payload:QuadrantLoginState){
        state.quadrantLoginState=payload;
    },
    setQuadrantContestsState(state:QuadrantState,payload:QuadrantContestsState){
        state.quadrantContestsState = payload
    },
    setQuadrantCreateContestState(state:QuadrantState,payload:CreateQuadrantContestState){
        state.createQuadrantContestState = payload;
    },
    setQuadrantPostSOPState(state:QuadrantState,payload:PostSOP){
        state.postSOP = payload;
    },

    
};

const {commit} = getStoreAccessors<QuadrantState | any, State>('');


export const commitSetQuadrantContestsState = commit(mutations.setQuadrantContestsState);
export const commitSetQuadrantLoginState = commit(mutations.setQuadrantLoginState);
export const commitSetCreateQuadrantContestState = commit(mutations.setQuadrantCreateContestState);
export const commitSetPostSOPState = commit(mutations.setQuadrantPostSOPState);
