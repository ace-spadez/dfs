import {QuadrantContestState,QuadContestPatchState,QuadContestState,QuadProblemCreateState,QuadProblemsState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
   
  quadrantContestState : (state: QuadrantContestState)=> state.contestState,
  quadrantContestPatchState : (state:QuadrantContestState)=>state.contestPatchState,
  quadrantProblemsState:(state:QuadrantContestState)=>state.problemsState,
  quadrantProblemCreateState:(state:QuadrantContestState)=>state.problemCreateState,

};

const {read} = getStoreAccessors<QuadrantContestState, State>('');

export const readQuadrantContestState= read(getters.quadrantContestState);
export const readQuadrantContestPatchState= read(getters. quadrantContestPatchState);
export const readQuadrantProblemsState= read(getters.quadrantProblemsState);
export const readQuadrantProblemCreateState= read(getters.quadrantProblemCreateState);

