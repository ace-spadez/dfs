import {Contest,IUserPreview,ICreateContest,IQuadProblem,IQuadProblemCreate} from '@/interfaces';

export interface QuadContestState{
    contest ?: Contest;
    loading : boolean;
    error : boolean;
}
export interface QuadProblemsState{
    problems ?:Array<IQuadProblem>;
    loading:boolean;
    error:boolean;

}
export interface QuadProblemCreateState{

    problemCreate?: IQuadProblemCreate;
    loading:boolean;
    error:boolean;
    created: boolean;
createdProblem?:IQuadProblem
}

export interface QuadContestPatchState{

    contestPatch? :Contest;
    loading:boolean;
    error:boolean;
    patched: boolean;

}
export interface QuadProblemPatchState{
    problem?: IQuadProblem;
    loading: boolean;
    error: boolean;
}
export interface QuadProblemDeleteState{
    loading: boolean;
    error: boolean;
}
export interface QuadrantContestState {
    contestState:QuadContestState;
    problemsState: QuadProblemsState;
    problemCreateState:QuadProblemCreateState;
    contestPatchState: QuadContestPatchState;

    problemPatchState: QuadProblemPatchState;
    problemDeleteState: QuadProblemDeleteState;

    contest_uuid?:string;
    token:string;

}
