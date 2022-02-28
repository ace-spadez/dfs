import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { ContestState } from './state';

const defaultState: ContestState = {
  questions : [],
  isError : false,
  inProgress : true,
  submitted: false,
  answers : [],
};

export const contestModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
