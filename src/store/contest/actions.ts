import { api } from "@/api";
import router from "@/router";
import { getLocalToken, removeLocalToken, saveLocalToken } from "@/utils";
import { AxiosError } from "axios";
import { getStoreAccessors } from "typesafe-vuex";
import { ActionContext } from "vuex";
import { State } from "../state";
import {
commitSetContestDataState,
commitSetContestProblemsState,
commitSetNotifyMeState,
commitSetStandingsState,
commitSetSubmitAnswerState,
commitSetSubmitPaperState,
commitSetSubmissionsState,
commitSetBeginAttemptState
} from "./mutations";
import { ContestState, ContestDataState, NotifyMeState, SubmissionsState, StandingsState, ContestProblemsState, SubmitAnswerState, BeginAttemptState } from "./state";
import { Contest, IStanding, ISubmission } from "@/interfaces";
import axios from "axios";
type MainContext = ActionContext<ContestState, State>;

export const actions = {
  async actionGetContestData(context: MainContext, contest_uuid:string) {
    const token:string = context.state.token;
    const contestDataState:ContestDataState= context.state.contestDataState;
    contestDataState.loading = true;
    commitSetContestDataState(context,contestDataState)
    try {
      const res = await api.getContest(token,contest_uuid);
      contestDataState.contest = res.data['body']
      contestDataState.loading = false;
      commitSetContestDataState(context,contestDataState);
    } catch (err) {
      console.log(err)
      contestDataState.loading = false;
      contestDataState.error = true;
      commitSetContestDataState(context,contestDataState);
    }
  },
  async actionNotifyMe(context: MainContext, contest_uuid:string) {
    const token:string = context.state.token;
    const notifyMeState:NotifyMeState= context.state.notifyMeState;
    notifyMeState.loading = true;
    commitSetNotifyMeState(context,notifyMeState)
    try {
      const res = await api.applyForContest(token,contest_uuid)
      notifyMeState.loading = false;
      commitSetNotifyMeState(context,notifyMeState);
    } catch (err) {
      console.log(err)
      notifyMeState.loading = false;
      notifyMeState.error = true;
      commitSetNotifyMeState(context,notifyMeState);
    }
  },
  async actionSubmissions(context: MainContext, contest_uuid:string) {
    const token:string = context.state.token;
    const SubmissionsState:SubmissionsState= context.state.submissionsState;
    SubmissionsState.loading = true;
    commitSetSubmissionsState(context,SubmissionsState)
    try {
      const res = await api.getContestSubmissions(token,contest_uuid)
      SubmissionsState.submissions = res.data['body'];
      SubmissionsState.loading = false;
      commitSetSubmissionsState(context,SubmissionsState);
    } catch (err) {
      console.log(err)
      SubmissionsState.loading = false;
      SubmissionsState.error = true;
      commitSetSubmissionsState(context,SubmissionsState);
    }
  },
  async actionStandingsState(context: MainContext, contest_uuid:string) {
    const token:string = context.state.token;
    const StandingsState:StandingsState= context.state.standingsState;
    StandingsState.loading = true;
    commitSetStandingsState(context,StandingsState)
    try {
      const res = await api.getContestStandings(token,contest_uuid)
      StandingsState.standings = res.data['body'];
      StandingsState.loading = false;
      commitSetStandingsState(context,StandingsState);
    } catch (err) {
      console.log(err)
      StandingsState.loading = false;
      StandingsState.error = true;
      commitSetStandingsState(context,StandingsState);
    }
  },
  async actionContestProblems(context: MainContext, contest_uuid:string) {
    const token:string = context.state.token;
    const ContestProblemsState:ContestProblemsState= context.state.contestProblemsState;
    ContestProblemsState.loading = true;
    commitSetContestProblemsState(context,ContestProblemsState)
    try {
      const res = await api.getContestProblems(token,contest_uuid)
      ContestProblemsState.problems = res.data['body'];
      ContestProblemsState.loading = false;
      commitSetContestProblemsState(context,ContestProblemsState);
    } catch (err) {
      console.log(err)
      ContestProblemsState.loading = false;
      ContestProblemsState.error = true;
      commitSetContestProblemsState(context,ContestProblemsState);
    }
  },
  async actionSubmitAnswerState(context: MainContext,payload:{contest_uuid:string,problem_uuid:string,submission:ISubmission}) {
    const token:string = context.state.token;
    const SubmitAnswerState:SubmitAnswerState= context.state.submitAnswerState;
    SubmitAnswerState.loading = true;
    commitSetSubmitAnswerState(context,SubmitAnswerState)
    try {
      const res = await api.postContestProblemAnswer(token,payload.contest_uuid,payload.problem_uuid,payload.submission);
      SubmitAnswerState.loading = false;
      commitSetSubmitAnswerState(context,SubmitAnswerState);
    } catch (err) {
      console.log(err)
      SubmitAnswerState.loading = false;
      SubmitAnswerState.error = true;
      commitSetSubmitAnswerState(context,SubmitAnswerState);
    }
  },
  async actionBeginAttemptState(context: MainContext,contest_uuid:string) {
    const token:string = context.state.token;
    const BeginAttemptState:BeginAttemptState= context.state.beginAttemptState;
    BeginAttemptState.loading = true;
    commitSetBeginAttemptState(context,BeginAttemptState)
    try {
      const res = await api.postBeginAttempt(token,contest_uuid);
      BeginAttemptState.loading = false;
      commitSetBeginAttemptState(context,BeginAttemptState);
    } catch (err) {
      console.log(err)
      BeginAttemptState.loading = false;
      BeginAttemptState.error = true;
      commitSetBeginAttemptState(context,BeginAttemptState);
    }
  },
};

const { dispatch } = getStoreAccessors<ContestState | any, State>("");

export const dispatchGetContestData = dispatch(actions.actionGetContestData);
export const dispatchNotifyMe = dispatch(actions.actionNotifyMe);
export const dispatchSubmissions = dispatch(actions.actionSubmissions);
export const dispatchStandingState = dispatch(actions.actionStandingsState);
export const dispatchContestProblems = dispatch(actions.actionContestProblems);
export const dispatchSubmitAnswerState = dispatch(actions.actionSubmitAnswerState);
export const dispatchBeginAttemptState = dispatch(actions.actionBeginAttemptState);
