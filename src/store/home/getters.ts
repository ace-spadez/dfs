import {HomeState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
   
  homeContests : (state: HomeState)=> state.contests,
  homeStandings: (state:HomeState)=>state.standings,
};

const {read} = getStoreAccessors<HomeState, State>('');

export const readHomeContests= read(getters.homeContests);
export const readHomeStandings= read(getters.homeStandings);
