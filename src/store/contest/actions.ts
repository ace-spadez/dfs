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
    contestDataState.error = false;
    contestDataState.contest = undefined;
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
    notifyMeState.error = false;
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
    SubmissionsState.error = false;
    SubmissionsState.submissions = [];
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
  async actionStandingsState(context: MainContext,payload:{ contest_uuid:string,page:number}) {
    const token:string = context.state.token;
    const StandingsState:StandingsState= context.state.standingsState;
    StandingsState.loading = true;
    StandingsState.error = false;
    commitSetStandingsState(context,StandingsState)
    try {
      const res = await api.getContestStandings(token,payload.contest_uuid,payload.page)
      StandingsState.standings = res.data['body'];
      StandingsState.pages = res.data['pages']
      StandingsState.page  =payload.page;
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
    ContestProblemsState.error = false;
    ContestProblemsState.problems = [];
    commitSetContestProblemsState(context,ContestProblemsState)
    try {
      const res = await api.getContestProblems(token,contest_uuid)
      ContestProblemsState.problems = res.data['body'];
      ContestProblemsState.loading = false;
      console.log('body',res.data)
      commitSetContestProblemsState(context,ContestProblemsState);
    } catch (err) {
      console.log(err)
      ContestProblemsState.loading = false;
      ContestProblemsState.error = true;
      commitSetContestProblemsState(context,ContestProblemsState);
    }
  },
  async actionSubmitAnswerState(context: MainContext,payload:{contest_uuid:string,problem_uuid:string,submission:ISubmission,index:number}) {
    console.log(payload.submission)
    const token:string = context.state.token;
    const SubmitAnswerState:SubmitAnswerState= context.state.submitAnswerState;
    const ContestProblemsState:ContestProblemsState = context.state.contestProblemsState;
    ContestProblemsState.problems[payload.index].submission=(payload.submission && (payload.submission.integer_content || (payload.submission.options && payload.submission.options.length>0)))?payload.submission:null;
    SubmitAnswerState.loading = true;
    SubmitAnswerState.error = false;
    commitSetSubmitAnswerState(context,SubmitAnswerState)
    commitSetContestProblemsState(context,ContestProblemsState);
  
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
    // const BeginAttemptState:BeginAttemptState= context.state.beginAttemptState;
    // BeginAttemptState.loading = true;
    // BeginAttemptState.error = false;
    // commitSetBeginAttemptState(context,BeginAttemptState)
    // try {
      const res = await api.postBeginAttempt(token,contest_uuid);
    //   BeginAttemptState.loading = false;
    //   commitSetBeginAttemptState(context,BeginAttemptState);
    // } catch (err) {
    //   console.log(err)
    //   BeginAttemptState.loading = false;
    //   BeginAttemptState.error = true;
    //   commitSetBeginAttemptState(context,BeginAttemptState);
    // }
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
