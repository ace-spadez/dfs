import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { HomeState,ContestPageState,HomeContestsState,HomeStandingsState } from './state';
import {getLocalToken} from '@/utils'

const contestPageState:ContestPageState = {
  contests:[],
  page_num:0,
  loading: true,
  error :false

}
const homeContestsState:HomeContestsState={
  loading:false,
  error:false,
  contests:[]
}
const homeStandingsState:HomeStandingsState={
  loading:false,
  error:false,
  standings:[],
}
const defaultState: HomeState = {
  homeContestsState,
  token: String(getLocalToken()),
  homeStandingsState,
  contestPage:contestPageState
};

export const homeModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
