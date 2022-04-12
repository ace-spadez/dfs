import {Contest,IUserPreview,ICreateContest} from '@/interfaces';
import { StoreOptions } from 'vuex';
export interface QuadrantContestsState{
    contests: Array<Contest>;
    loading:boolean;
    error:boolean;
    page: number;
    pages?:number;
}
export interface CreateQuadrantContestState{
    loading: boolean;
    error:boolean;
    created:boolean;

}
export interface QuadrantLoginState{
    message?:string|null;
    SOP?: string|null;
    is_applied: boolean;
    loading: boolean;
    error:boolean;



}
export interface PostSOP{
    loading: boolean;
    error : boolean;
}
export interface QuadrantState {
    quadrantLoginState:QuadrantLoginState;


    token:string;
    
    quadrantContestsState:QuadrantContestsState;
    createQuadrantContestState:CreateQuadrantContestState;

    postSOP:PostSOP;

    

}
