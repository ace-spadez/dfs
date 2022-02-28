import { ContestState, Question, Answers } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
   
    questions: (state:ContestState) => state.questions,
   error: (state:ContestState) => state.isError,
    progress: (state:ContestState) => state.inProgress,
    answers:(state:ContestState)=>state.answers,
    
};

const {read} = getStoreAccessors<ContestState, State>('');

export const readQuestions = read(getters.questions);
export const readQuestionsError = read(getters.error);
export const readQuestionsProgress = read(getters.progress);
export const readQuestionsAnswers = read(getters.answers);
