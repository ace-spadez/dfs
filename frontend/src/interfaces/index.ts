import { IconsOptions } from 'vuetify/types/services/icons';

export interface Rating{
    r_all: Number;
    r_m:Number;
    r_p:Number;
    r_c:Number;
}
export interface Score{
    score_all: Number;
    score_m:Number;
    score_p:Number;
    score_c:Number;
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
export interface IPatchSelf{
    bio?:string;
    profile?:File;
}
export interface IRatingHistory{
    rating: Rating;
    rating_change: Rating;
    rated_date: Date;
}
export interface IProfile{
    uuid: string;
    username: string;
    bio   ?: string;
    email: string;
    date_joined:Date;
    rating?:Rating;
    experience?:Number;
    tier: Number;
    profile_image?:string;
    is_friend: boolean;
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
export interface IContestProcess{
    rating : Rating;
    score: Score;
    attempt: string;
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

    training_data?: string;
    test_data?: string;


    tags?:Array<string>;
    writer: IUserPreview;
    correct_integer?:number;
    contest:string;
    options : Array<IQuadOptions>;

    
}
// export interface IQuadProblemTestFiles{
 
//     training_data?: File;
//     test_data?: File;   
// }
export interface IQuadProblemCreate{
    contest_uuid : string;
    content : string;
    content_image?:File;
    problem_type:string;
    subject:string;
    correct_integer?:number;
    options : Array<IQuadOptionsCreate>;
    tags : Array<ITag>;


    training_data?: File;
    test_data?: File;

}
export interface IQuadProblemPatch{
    content ?: string;
    content_image ?: File;
    subject ?: string;
    problem_type?:string;
    correct_integer?:number;
    new_options?:Array<IQuadOptionsCreate>;
    patch_options?:Array<IQuadOptionsPatch>;
    delete_options?:Array<IQuadOptionsUUID>;
    tags?:Array<ITag>;


    // training_data?: File;
    // test_data?: File;

}
export interface ISubmission{
    integer_content?: number;
    options?: Array<IQuadOptionsUUID>;

    pickle_file: File|string;
}

export interface IXProblem{
    uuid:string;
    content: string;
    problem_type:string;
    problemtype:string;
    content_image?:string;
    tags?:Array<string>;
    writer: IUserPreview;
    correct_integer?:number;
    contest:string;
    options : Array<IQuadOptions>;
    submission : ISubmission;


    // training_data?: string;
    // testing_data?: string;
}
export interface IOptions{
    uuid: string;
    option_image?:string;
    content:string;
}
export interface IProblem{
    uuid:string;
    content: string;
    problem_type:string;
    content_image?:string;
    subject: string;
    tags?:Array<string>;
    writer: IUserPreview;
    contest:string;
    options : Array<IOptions>;
    submission : ISubmission|null;


    training_data?: string;
    //testing_data?: string;
}
export interface IStanding{
    user: IUserPreview;
    rating: Rating;
    rating_change: Rating;
    score:Score;
    rated_date: Date;
}
export interface Contest{
    uuid:string;
    name:string;
    contest_status:string;
    date_created: Date;
    target_date:Date;
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
    attempt: boolean;
    contest_process ?:IStanding;

}