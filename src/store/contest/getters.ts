import { ContestDataState,ContestProblemsState,ContestState,StandingsState,SubmissionsState,SubmitAnswerState,NotifyMeState} from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
   
    notifyMeState: (state:ContestState) => state.notifyMeState,
    contestDataState: (state:ContestState) => state.contestDataState,
    submissionsState: (state:ContestState) => state.submissionsState,
    standingsState: (state:ContestState) => state.standingsState,
    contestProblemsState: (state:ContestState) => state.contestProblemsState,
    submitAnswerState: (state:ContestState) => state.submitAnswerState,
    submitPaperState: (state:ContestState) => state.submitPaperState,
    beginAttemptState: (state:ContestState) => state.beginAttemptState,
   
    
};

const {read} = getStoreAccessors<ContestState, State>('');

export const readNotifyMeState = read(getters.notifyMeState);
export const readContestDataState = read(getters.contestDataState);
export const readSubmissionsState = read(getters.submissionsState);
export const readStandingsState = read(getters.standingsState);
export const readContestProblemState = read(getters.contestProblemsState);
export const readSubmitAnswersState = read(getters.submitAnswerState);
export const readSubmitPaperState = read(getters.submitPaperState);
export const readBeginAttemptState = read(getters.beginAttemptState);

