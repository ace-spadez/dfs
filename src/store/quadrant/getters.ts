import {QuadrantState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
   
  quadrantLoginState: (state:QuadrantState)=>state.quadrantLoginState,
  quadrantContestsState : (state:QuadrantState)=>state.quadrantContestsState,
  quadrantCreateContestState:(state:QuadrantState)=>state.createQuadrantContestState,
  quadrantPostSOP:(state:QuadrantState)=>state.postSOP,
};

const {read} = getStoreAccessors<QuadrantState, State>('');


export const readQuadrantContestsState = read(getters.quadrantContestsState);
export const readLoginState = read(getters.quadrantLoginState);
export const readQuadrantCreateContestsState = read(getters.quadrantCreateContestState);
export const readQuadrantPostSOP = read(getters.quadrantPostSOP);
