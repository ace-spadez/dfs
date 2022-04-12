import { Contest, IXProblem, IUserPreview, Rating, IStanding, IProblem } from '@/interfaces';


export interface NotifyMeState {
    loading: boolean;
    error: boolean;
}
export interface ContestDataState {
    contest?: Contest;
    loading: boolean;
    error: boolean;
}
export interface SubmissionsState {
    submissions: IXProblem[];
    loading: boolean;
    error: boolean;

}
export interface StandingsState {
    standings: IStanding[];
    loading: boolean;
    error: boolean;
    pages?: Number;
    page: Number;
}
export interface FriendsState{
    standings : IStanding[];
    loading:boolean;
    error:boolean;
}
export interface ContestProblemsState {
    problems: IProblem[];
    loading: boolean;
    error: boolean;

}
export interface SubmitAnswerState {
    loading: boolean;
    error: boolean;
}
export interface SubmitPaperState {
    loading: boolean;
    error: boolean;
}
export interface  BeginAttemptState{
    loading:boolean;
    error:boolean;
}
export interface ContestState {
    notifyMeState: NotifyMeState;
    contestDataState: ContestDataState;
    submissionsState: SubmissionsState;
    standingsState: StandingsState
    contestProblemsState: ContestProblemsState;
    submitAnswerState:SubmitAnswerState;
    submitPaperState:SubmitPaperState;
    beginAttemptState:BeginAttemptState;
    friendsState:FriendsState;


    token:string;

}