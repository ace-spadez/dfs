
import { ContestState, NotifyMeState, ContestDataState, SubmissionsState, StandingsState, ContestProblemsState, SubmitAnswerState, SubmitPaperState, BeginAttemptState, FriendsState,} from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {

    setNotifyMeState(state: ContestState, payload:NotifyMeState ) {
        state.notifyMeState = payload;
    },
    setContestDataState(state: ContestState, payload:ContestDataState ) {
        state.contestDataState = payload;
    },
    setSubmissionsState(state: ContestState, payload:SubmissionsState ) {
        state.submissionsState = payload;
    },
    setFriendsState(state: ContestState, payload:FriendsState ) {
        state.friendsState = payload;
    },
    setStandingsState(state: ContestState, payload:StandingsState ) {
        state.standingsState = payload;
    },
    setContestProblemsState(state: ContestState, payload:ContestProblemsState ) {
        state.contestProblemsState = payload;
    },
    setSubmitAnswerState(state: ContestState, payload:SubmitAnswerState ) {
        state.submitAnswerState = payload;
    },
    setSubmitPaperState(state: ContestState, payload:SubmitPaperState ) {
        state.submitPaperState = payload;
    },
    setBeginAttemptState(state: ContestState, payload:BeginAttemptState ) {
        state.beginAttemptState = payload;
    },
};

const {commit} = getStoreAccessors<ContestState | any, State>('');

export const commitSetNotifyMeState = commit(mutations.setNotifyMeState);
export const commitSetContestDataState = commit(mutations.setContestDataState);
export const commitSetSubmissionsState = commit(mutations.setSubmissionsState);
export const commitSetFriendsState = commit(mutations.setFriendsState);
export const commitSetStandingsState = commit(mutations.setStandingsState);
export const commitSetContestProblemsState = commit(mutations.setContestProblemsState);
export const commitSetSubmitAnswerState = commit(mutations.setSubmitAnswerState);
export const commitSetSubmitPaperState = commit(mutations.setSubmitPaperState);
export const commitSetBeginAttemptState = commit(mutations.setBeginAttemptState);


