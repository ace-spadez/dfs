import {Contest,IUserPreview} from '@/interfaces';
export interface HomeState {
    contests : Contest[];
    token:string;
    standings: IUserPreview[];
}
