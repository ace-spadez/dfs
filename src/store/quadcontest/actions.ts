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
    commitSetQuadrantProblems,
    commitSetQuadrantProblemPatch,
    commitSetQuadrantProblemDelete
   
} from './mutations';
import { 
    QuadContestPatchState,
    QuadContestState,
    QuadProblemCreateState,
    QuadProblemsState,
    QuadrantContestState,
    QuadProblemPatchState,
    QuadProblemDeleteState
} from './state';
import {Contest,IUserPreview,IQuadProblem,ICreateContest, IQuadProblemCreate, IQuadOptions} from '@/interfaces';

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
    async actionPatchQuadrantContest(context:MainContext,payload:any){
        var token:string = context.state.token;
        const quadContestPatchState:QuadContestPatchState = context.state.contestPatchState;
        quadContestPatchState.loading = true
        commitSetQuadrantContestPatch(context,quadContestPatchState)
        try{
    
       
            const response = await api.patchQuadrantContest(token,payload.uuid,payload.contest);
            const contest:Contest = response.data['body'];
            console.log('patched reesponse',contest)
            quadContestPatchState.contestPatch = contest;
            quadContestPatchState.loading = false;
        commitSetQuadrantContestPatch(context,quadContestPatchState)

        }catch(err){
            console.log(err);
            quadContestPatchState.loading = false;
            quadContestPatchState.error= true;
        commitSetQuadrantContestPatch(context,quadContestPatchState)

        }
    },
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

    },

    async actionPatchQuadrantProblem(context:MainContext,payload:any){
        var token:string = context.state.token;
        const quadProblemPatchState:QuadProblemPatchState = context.state.problemPatchState;
        quadProblemPatchState.loading = true
        commitSetQuadrantProblemPatch(context,quadProblemPatchState)
        try{
    
       
            const response = await api.patchQuadContestProblem(token,payload.contest_uuid,payload.problem_uuid,payload.problem)
            const problem:IQuadProblem = response.data['body'];
            console.log('patched reesponse',problem)
            // quadProblemPatchState.problemPatch = problem;
            quadProblemPatchState.loading = false;
        commitSetQuadrantProblemPatch(context,quadProblemPatchState)

        }catch(err){
            console.log(err);
            quadProblemPatchState.loading = false;
            quadProblemPatchState.error= true;
        commitSetQuadrantProblemPatch(context,quadProblemPatchState)

        }
    },

    async actionDeleteQuadrantProblem(context:MainContext,payload:any){
        var token:string = context.state.token;
        const quadProblemDeleteState:QuadProblemDeleteState = context.state.problemPatchState;
        quadProblemDeleteState.loading = true
        commitSetQuadrantProblemDelete(context,quadProblemDeleteState)
        try{
    
       
            const response = await api.deleteQuadContestProblem(token,payload.contest_uuid,payload.problem_uuid)
            quadProblemDeleteState.loading = false;
        commitSetQuadrantProblemDelete(context,quadProblemDeleteState)

        }catch(err){
            console.log(err);
            quadProblemDeleteState.loading = false;
            quadProblemDeleteState.error= true;
        commitSetQuadrantProblemPatch(context,quadProblemDeleteState)

        }
    }
   
    
    
};

const { dispatch } = getStoreAccessors<QuadrantContestState | any, State>('');

export const dispatchGetQuadrantContest = dispatch(actions.actionGetQuadrantContest);
export const dispatchGetQuadrantContestProblems = dispatch(actions.actionGetQuadrantContestProblems);
export const dispatchPostQuadrantContestProblem = dispatch(actions.actionQuadPostContestProblem);
export const dispatchPostQuadrantContestPatch = dispatch(actions.actionPatchQuadrantContest)
export const dispatchPostQuadrantProblemPatch = dispatch(actions.actionPatchQuadrantProblem)
export const dispatchPostQuadrantProblemDelete = dispatch(actions.actionDeleteQuadrantProblem)