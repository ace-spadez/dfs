import { api } from '@/api';
import router from '@/router';
// import { getLocalToken, removeLocalToken, saveLocalToken } from '@/utils';
// import { AxiosError } from 'axios';
import { getStoreAccessors } from 'typesafe-vuex';
import { ActionContext } from 'vuex';
import { State } from '../state';
import {
    commitSetRegisterError,
    commitSetRegisterErrorMessage,
    commitSetRegisterInProgress,
    commitSetRegisterSuccess
} from './mutations';
import { RegisterState } from './state';

type MainContext = ActionContext<RegisterState, State>;

export const actions = {
    async actionRegister(context: MainContext, payload: { username: string; password: string;email:string }) {
        commitSetRegisterInProgress(context, true);

        try {
            const response = await api.register( payload.password,  payload.email,payload.username);
            console.log("Res", response)
            commitSetRegisterSuccess(context, true);
            commitSetRegisterError(context, false);
            // commitSetRegisterErrorMessage(context, undefined);
        } catch (err) {
            console.log("ERRRR", err.response.data)
            let errorString = ""
            if(err.response.data["username"]) {
                errorString += `${err.response.data["username"][0]}\n`
            }
            if(err.response.data["email"]) {
                errorString += `${err.response.data["email"][0]}\n`
            }
            // "username: username is already taken \n email: email is already taken \n"
            console.log(errorString)
            // errorString = "123"
            commitSetRegisterErrorMessage(context, errorString);
            commitSetRegisterError(context, true);
        }
        commitSetRegisterInProgress(context, false);
    },
    
    
};

const { dispatch } = getStoreAccessors<RegisterState | any, State>('');


export const dispatchRegister = dispatch(actions.actionRegister);

