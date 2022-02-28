
import { ContestState,Question} from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {

    setQuestions(state: ContestState, payload:Question[] ) {
        state.questions = payload;
    },
    setError(state: ContestState,payload: boolean){
        state.isError = payload;
    },
    setInProgress(state: ContestState,payload: boolean){
        state.inProgress = payload;
    },
    setSubmitted(state:ContestState,payload: boolean){
        state.submitted = payload;
    },
    setAnswers(state:ContestState,payload : (any|null)[]){
      console.log(payload);
      state.answers =  payload;
    }
 
};

const {commit} = getStoreAccessors<ContestState | any, State>('');

export const commitSetQuestions = commit(mutations.setQuestions);
export const commitSetError = commit(mutations.setError);
export const commitSetInProgress = commit(mutations.setInProgress);
export const commitSetSubmitted = commit(mutations.setSubmitted);
export const commitSetAnswers = commit(mutations.setAnswers);

