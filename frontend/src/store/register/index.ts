import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { RegisterState } from './state';

const defaultState: RegisterState = {
  registerError: false,
  registerErrorMessage: "",
  registerInProgress: false,
  registerSuccess: false,
};

export const registerModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
