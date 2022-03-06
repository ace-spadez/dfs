import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { HomeState,ContestPageState } from './state';
import {getLocalToken} from '@/utils'

const contestPageState:ContestPageState = {
  contests:[],
  page_num:0,
  loading: true,
  error :false

}

const defaultState: HomeState = {
  contests : [],
  token: String(getLocalToken()),
  standings:[],
  contestPage:contestPageState
};

export const homeModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
