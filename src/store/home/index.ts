import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { HomeState } from './state';
import {getLocalToken} from '@/utils'

const defaultState: HomeState = {
  contests : [],
  token: String(getLocalToken()),
  standings:[],
};

export const homeModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
