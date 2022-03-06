import {HomeState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
   
  homeContests : (state: HomeState)=> state.contests,
  homeStandings: (state:HomeState)=>state.standings,
  contestPageState: (state:HomeState)=>state.contestPage
};

const {read} = getStoreAccessors<HomeState, State>('');

export const readHomeContests= read(getters.homeContests);
export const readHomeStandings= read(getters.homeStandings);
export const readContestPageState= read(getters.contestPageState);
