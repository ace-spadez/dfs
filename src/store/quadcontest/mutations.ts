import { Contest,IUserPreview } from '@/interfaces';
import { 
    QuadrantContestState,QuadContestPatchState,QuadContestState,QuadProblemCreateState,QuadProblemsState, QuadProblemPatchState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';
import {defaultState} from './index'

export const mutations = {

    setQuadrantContest(state:QuadrantContestState,payload:QuadContestState){
        state.contestState = payload;
    },
    setQuadrantContestPatch(state:QuadrantContestState,payload:QuadContestPatchState){
        state.contestPatchState = payload;
    },
    setQuadrantProblemPatch(state:QuadrantContestState,payload:QuadProblemPatchState){
        state.problemPatchState = payload;
    },
    setQuadrantProblems(state:QuadrantContestState,payload:QuadProblemsState){
        state.problemsState = payload;
    },
    setQuadrantProblemCreate(state:QuadrantContestState,payload:QuadProblemCreateState){
        state.problemCreateState = payload;
    },  
    setClear(state:QuadrantContestState){
        state.contestState.contest = undefined;
        state.contestState.loading = true;
        state.problemsState.loading = true;
        state.problemsState.problems = undefined;
     
    },
  

    
};

const {commit} = getStoreAccessors<QuadrantContestState | any, State>('');

export const commitSetQuadrantContest = commit(mutations.setQuadrantContest);
export const commitSetQuadrantContestPatch = commit(mutations.setQuadrantContestPatch);
export const commitSetQuadrantProblemPatch = commit(mutations.setQuadrantProblemPatch);
export const commitSetQuadrantProblemCreate = commit(mutations.setQuadrantProblemCreate);
export const commitSetQuadrantProblems = commit(mutations.setQuadrantProblems);
export const commitQCSetClear = commit(mutations.setClear);

