import { api } from '@/api';
import router from '@/router';
import { getLocalToken, removeLocalToken, saveLocalToken } from '@/utils';
import { AxiosError } from 'axios';
import { getStoreAccessors } from 'typesafe-vuex';
import { ActionContext } from 'vuex';
import { State } from '../state';
import {
    commitSetQuadrantContest,
    commitSetQuadrantContestPatch,
    commitSetQuadrantProblemCreate,
    commitSetQuadrantProblems
   
} from './mutations';
import { 
    QuadContestPatchState,
    QuadContestState,
    QuadProblemCreateState,
    QuadProblemsState,
    QuadrantContestState
} from './state';
import {Contest,IUserPreview,IQuadProblem,ICreateContest, IQuadProblemCreate} from '@/interfaces';

type MainContext = ActionContext<QuadrantContestState, State>;

export const actions = {
    async actionGetQuadrantContest(context:MainContext,contest_uuid:string){
        var token:string = context.state.token;
        const quadContestState:QuadContestState = context.state.contestState;
        try{
            const response = await api.getQuadrantContest(token,contest_uuid);
            const contest:Contest = response.data['body'];
            quadContestState.contest = contest;
            quadContestState.loading = false;
            commitSetQuadrantContest(context,quadContestState)
            console.log('contest', quadContestState.contest)
        }catch(err){
            console.log(err);
            quadContestState.loading = false;
            quadContestState.error= true;
            commitSetQuadrantContest(context,quadContestState);
        }
    },
    async actionGetQuadrantContestProblems(context:MainContext,contest_uuid:string){

        var token:string = context.state.token;
        const quadProblemsState:QuadProblemsState = context.state.problemsState;
        quadProblemsState.loading = true;
        commitSetQuadrantProblems(context,quadProblemsState);
        try{
            const response = await api.getQuadContestProblems(token,contest_uuid);
            const problems:IQuadProblem[] = response.data['body'];
            quadProblemsState.problems = problems;
            quadProblemsState.loading = false;
            commitSetQuadrantProblems(context,quadProblemsState)
            console.log('problems', quadProblemsState.problems)

        }catch(err){
            console.log(err);
            quadProblemsState.loading = false;
            quadProblemsState.error= true;
            commitSetQuadrantContest(context,quadProblemsState);
        }
    },
    // async actionPatchQuadrantContest(context:MainContext,contest:ICreateContest){
    //     var token:string = context.state.token;
    //     const quadContestPatchState:QuadContestPatchState = context.state.contestPatchState;
    //     const contestState = context.state.contestState;Q
    //     quadContestPatchState.loadin
    //     try{
    //         var response;
    //         if(context.state.contestState.contest!=undefined)
    //         response = await api.patchQuadrantContest(token,context.state.contestState.contest.uuid,contest);
    //         const contest:Contest = response.data['body'];
    //         .contest = contest;
    //         quadContestState.loading = false;
    //         commitSetQuadrantContest(context,quadContestState)
    //     }catch(err){
    //         console.log(err);
    //         quadContestState.loading = false;
    //         quadContestState.error= true;
    //         commitSetQuadrantContest(context,quadContestState);
    //     }
    // },
    async actionQuadPostContestProblem(context:MainContext,_problem:IQuadProblemCreate){
        var token:string = context.state.token;
        const quadProblemCreateState:QuadProblemCreateState = context.state.problemCreateState;
        quadProblemCreateState.loading = true;
        commitSetQuadrantProblemCreate(context,quadProblemCreateState);
        try{
            const response = await api.createQuadContestProblem(token,_problem.contest_uuid ,_problem);
            const problem:IQuadProblem = response.data['body'];
            console.log('created problem',problem)
            quadProblemCreateState.createdProblem = problem;
            quadProblemCreateState.loading = false;
            commitSetQuadrantProblemCreate(context,quadProblemCreateState);
        }catch(err){
            console.log(err);
            quadProblemCreateState.loading = false;
            quadProblemCreateState.error = true;
            commitSetQuadrantProblemCreate(context,quadProblemCreateState);
        }

    }
   
    
    
};

const { dispatch } = getStoreAccessors<QuadrantContestState | any, State>('');

export const dispatchGetQuadrantContest = dispatch(actions.actionGetQuadrantContest);
export const dispatchGetQuadrantContestProblems = dispatch(actions.actionGetQuadrantContestProblems);
export const dispatchPostQuadrantContestProblem = dispatch(actions.actionQuadPostContestProblem);
