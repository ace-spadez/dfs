import {Contest,IUserPreview} from '@/interfaces';
export interface  ContestPageState{
    contests: Contest[],
    page_num: number,
    loading:  boolean,
    error:  boolean,

}
export interface HomeContestsState{
    contests: Contest[];
    loading:boolean;
    error:boolean;
}

export interface HomeStandingsState{
    loading: boolean;
    error: boolean;
    standings: IUserPreview[];
}
export interface HomeState {
    homeContestsState: HomeContestsState;
    token:string;
    homeStandingsState:HomeStandingsState ;

    contestPage: ContestPageState
}
