import { RegisterState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
   
    registerError: (state: RegisterState) => state.registerError,
    registerSuccess: (state: RegisterState) => state.registerSuccess,
    registerInProgress: (state: RegisterState) => state.registerInProgress,
    
};

const {read} = getStoreAccessors<RegisterState, State>('');

export const readRegisterError = read(getters.registerError);
export const readRegisterSuccess = read(getters.registerSuccess);
export const readRegisterInProgress = read(getters.registerInProgress);
