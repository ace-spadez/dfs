import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { ContestState,ContestDataState,FriendsState, ContestProblemsState,NotifyMeState,StandingsState,SubmissionsState,SubmitAnswerState,SubmitPaperState, BeginAttemptState } from './state';
import { getLocalToken } from '@/utils';
const contestDataState:ContestDataState={
  loading:false,
  error:false,
}
const friendsState:FriendsState={
  standings:[],
  loading:false,
  error:false
}
const notifyMeState:NotifyMeState={
  loading:false,
  error:false,
}
const submissionsState:SubmissionsState={
  loading:false,
  error:false,
  submissions:[]
}
const standingsState:StandingsState={
  error:false,
  loading:false,
  standings:[],
  page:0,
}
const contestProblemsState:ContestProblemsState={
  problems:[],
  loading:false,
  error:false
}
const submitAnswerState:SubmitAnswerState={
  loading:false,
  error:false,
}
const submitPaperState:SubmitPaperState={
  loading:true,
  error:false,
}
const beginAttemptState:BeginAttemptState={
  loading:false,
  error:false
}
const defaultState: ContestState = {
  token:String(getLocalToken()),

  notifyMeState,
  contestDataState,
  submissionsState,
  standingsState,
  contestProblemsState,
  submitAnswerState,
  submitPaperState,
  beginAttemptState,
  friendsState:friendsState

};

export const contestModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
