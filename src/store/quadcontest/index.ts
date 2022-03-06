import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { QuadContestState, QuadContestPatchState, QuadProblemCreateState, QuadProblemsState, QuadrantContestState, QuadProblemPatchState } from './state';
import { getLocalToken } from '@/utils'
import { readUserProfile } from '@/store/main/getters'
const quadContestState: QuadContestState = {
  loading: true,
  error: false,
}
const quadProblemCreateState: QuadProblemCreateState = {
  loading: false,
  error: false,
  created: false

}
const quadContestPatchState: QuadContestPatchState = {
  loading: false,
  error: false,
  patched: false

}
const quadProblemsState: QuadProblemsState = {
  loading: true,
  error: false

}
const quadProblemPatchState: QuadProblemPatchState = {
  loading: false,
  error: false,

}
export const defaultState: QuadrantContestState = {
  contestPatchState: quadContestPatchState,
  contestState: quadContestState,
  problemCreateState: quadProblemCreateState,
  problemsState: quadProblemsState,
  problemPatchState: quadProblemPatchState,
  token: String(getLocalToken())



};

export const quadContestModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
