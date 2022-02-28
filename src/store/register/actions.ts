import { api } from '@/api';
import router from '@/router';
// import { getLocalToken, removeLocalToken, saveLocalToken } from '@/utils';
// import { AxiosError } from 'axios';
import { getStoreAccessors } from 'typesafe-vuex';
import { ActionContext } from 'vuex';
import { State } from '../state';
import {
    commitSetRegisterError,
    commitSetRegisterInProgress,
    commitSetRegisterSuccess
} from './mutations';
import { RegisterState } from './state';

type MainContext = ActionContext<RegisterState, State>;

export const actions = {
    async actionRegister(context: MainContext, payload: { username: string; password: string;email:string }) {
        commitSetRegisterInProgress(context, true);

        try {
            const response = await api.register( payload.password,payload.email,payload.username);
            commitSetRegisterSuccess(context, true);
        } catch (err) {
            commitSetRegisterError(context, true);
        }
        commitSetRegisterInProgress(context, false);
    },
    
    
};

const { dispatch } = getStoreAccessors<RegisterState | any, State>('');


export const dispatchRegister = dispatch(actions.actionRegister);

