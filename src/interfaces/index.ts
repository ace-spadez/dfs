import { IconsOptions } from 'vuetify/types/services/icons';

export interface Rating{
    r_all: Number;
    r_m:Number;
    r_p:Number;
    r_c:Number;
}

export interface IUserProfile {
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    username: string;
    id: number;
    is_quadrant: boolean;
    profile_image?:string;
    bio?:string;
    rating?:Rating;
    experience?:Number;

}

export interface IUserProfileUpdate {
    email?: string;
    username?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserProfileCreate {
    email: string;
    username?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserPreview{
    uuid:string;
    username:string;
    rating:Rating;
    experience: Number;
    tier: Number;
    profile_image?:Number;
    
}

export interface Contest{
    uuid:string;
    name:string;
    contest_status:string;
    date_created: Date;
    target_data:Date;
    end_date: Date;
    duration:Number;
    tags: Array<string>;
    contest_type: string;
    contest_difficulty:string;
    writers : Array<IUserPreview>
    description:string;
    contest_chips:Array<string>;
    is_applied:boolean;
    is_attempted:boolean;
    status:string;
    question_count: number;

}
export interface ITag{
    name:string
}
export interface ICreateContest{
    name?:string;
    target_date?:string;
    end_date?: string;
    duration?:Number;
    contest_difficulty?:string;
    description?:string;
    contest_chips?:Array<ITag>;
    contest_type?:string;
}

export interface IQuadOptions{
    uuid: string;
    is_correct: boolean;
    option_image?:string;
    content:string;
}
export interface IQuadOptionsCreate{
    is_correct: boolean;
    option_image?:string;
    content:string;
}
export interface IQuadOptionsPatch{
    is_correct?: boolean;
    option_image?:string;
    content?:string;
}
export interface IQuadOptionsUUID{
    uuid: string;
}
export interface IQuadProblem{
    uuid:string;
    content: string;
    problem_type:string;
    content_image?:string;
    tags?:Array<string>;
    writer: IUserPreview;
    correct_integer?:number;
    contest:string;
    options : IQuadOptions;
}
export interface IQuadProblemCreate{
    contest_uuid : string;
    content : string;
    content_image?:File;
    problem_type:string;
    subject:string;
    correct_integer?:string;
    options : Array<IQuadOptionsCreate>;
    tags : Array<ITag>;

}
export interface IQuadProblemPatch{
    content ?: string;
    content_image ?: File;
    subject ?: string;
    correct_integer?:number;
    new_options?:Array<IQuadOptionsCreate>;
    patch_options?:Array<IQuadOptionsPatch>;
    delete_options?:Array<IQuadOptionsUUID>;
    tags?:Array<ITag>;

}