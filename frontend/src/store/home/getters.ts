import {HomeState,HomeContestsState,HomeStandingsState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
   
  homeContestsState : (state: HomeState)=> state.homeContestsState,
  homeStandingsState: (state:HomeState)=>state.homeStandingsState,
  contestPageState: (state:HomeState)=>state.contestPage
};

const {read} = getStoreAccessors<HomeState, State>('');

export const readHomeContestsState= read(getters.homeContestsState);
export const readHomeStandingsState= read(getters.homeStandingsState);
export const readContestPageStateState= read(getters.contestPageState);
