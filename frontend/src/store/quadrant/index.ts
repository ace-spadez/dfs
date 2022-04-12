import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { QuadrantState,QuadrantContestsState ,CreateQuadrantContestState,QuadrantLoginState,PostSOP} from './state';
import {getLocalToken} from '@/utils'
import {readUserProfile} from '@/store/main/getters'
const quadrantContestState:QuadrantContestsState={
  contests:[],
  loading:true,
  error: false,
  page: 1,

}
const quadrantLoginState:QuadrantLoginState = {
  is_applied:false,
  loading:true,
  error:false,
}
const createQuadrantContestState:CreateQuadrantContestState={
  loading:false,
  error:false,
  created:false
}
const postSOP:PostSOP = {
  loading:false,
  error: false
}
const defaultState: QuadrantState = {
  token:String(getLocalToken()),
  quadrantLoginState:quadrantLoginState,
  quadrantContestsState: quadrantContestState,
  createQuadrantContestState:createQuadrantContestState,
  postSOP:postSOP

  
};

export const quadrantModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
