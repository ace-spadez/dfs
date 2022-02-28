import {Contest} from '@/interfaces';

export interface Answers{
   a ?: string; 
   b ?: string; 
   c ?: string;
   d ?: string; 
   e ?: string; 
   f ?: string; 
}
export interface CorrectAnswers{
    a ?: boolean; 
    b ?: boolean; 
    c ?: boolean; 
    d ?: boolean; 
    e ?: boolean; 
    f ?: boolean; 
 }
export interface Question{
    id: number;
    question: string;
    answers : Answers;
    correct_answers : CorrectAnswers;
    multiple_correct_answers : boolean;
    explanation ?: string;
    tips ?: string;
    tags : Array<string>;
    category : string;
    difficulty: string;
    
}
export interface ContestState{
    questions : Question[];
    inProgress : boolean;
    isError : boolean;
    submitted : boolean;
    answers ?: (any|null|[])[];

}