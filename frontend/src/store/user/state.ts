import {IProfile,IRatingHistory} from '@/interfaces';
export interface  UserProfileState{
    user ?:IProfile;
    loading:boolean;
    error: boolean;
}
export interface UserProfilePatchState{
    loading:boolean;
    error: boolean;
    patchedProfile?: IProfile;
}
export interface UserRatingHistoryState{
    loading:boolean;
    error: boolean;
    ratingHistory: Array<IRatingHistory>;
    
}
export interface AddToWatchlist{
    loading:boolean;
    error: boolean;
}
export interface UserState {
    userProfile:UserProfileState;
    userProfilePatchState: UserProfilePatchState;
    userRatingHistoryState:UserRatingHistoryState;
    addToWatchList:AddToWatchlist;

    token: string;
}
