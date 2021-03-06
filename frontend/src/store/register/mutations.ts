import { RegisterState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';


export const mutations = {
    setRegisterInProgress(state: RegisterState, payload: boolean) {
        state.registerInProgress =payload;
    },
    setRegisterError(state: RegisterState, payload: boolean) {
        state.registerError = payload;
    },
    setRegisterSuccess(state: RegisterState, payload: boolean) {
        state.registerSuccess = payload;
    },
    setRegisterErrorMessage(state: RegisterState, payload: string) {
        console.log("payload", payload)
        state.registerErrorMessage = payload;
    },
    
};

const {commit} = getStoreAccessors<RegisterState | any, State>('');

export const commitSetRegisterError = commit(mutations.setRegisterError);
export const commitSetRegisterSuccess = commit(mutations.setRegisterSuccess);
export const commitSetRegisterErrorMessage = commit(mutations.setRegisterErrorMessage);
export const commitSetRegisterInProgress = commit(mutations.setRegisterInProgress);

