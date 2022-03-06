import {Contest,IUserPreview} from '@/interfaces';
export interface  ContestPageState{
    contests: Contest[],
    page_num: number,
    loading:  boolean,
    error:  boolean,

}
export interface HomeState {
    contests : Contest[];
    token:string;
    standings: IUserPreview[];

    contestPage: ContestPageState
}
