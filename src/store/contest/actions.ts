import { api } from "@/api";
import router from "@/router";
import { getLocalToken, removeLocalToken, saveLocalToken } from "@/utils";
import { AxiosError } from "axios";
import { getStoreAccessors } from "typesafe-vuex";
import { ActionContext } from "vuex";
import { State } from "../state";
import {
  commitSetQuestions,
  commitSetError,
  commitSetInProgress,
  commitSetAnswers,
  commitSetSubmitted,
} from "./mutations";
import { ContestState, Question } from "./state";
import { Contest } from "@/interfaces";
import axios from "axios";
type MainContext = ActionContext<ContestState, State>;

export const actions = {
  // async actionFetchQuestions(context: MainContext, payload: Contest) {
  //   // const params = new URLSearchParams();
  //   try {
  //     const res = await axios.get("https://quizapi.io/api/v1/questions", {
  //       params: {
  //         category: payload.category,
  //         difficulty: payload.difficulty,
  //         limit: payload.contest_total_questions,
  //         apiKey: "ia1f0jfzKdYUXjDVkda8g8p4TUW9lv34htk8awZQ",
  //       },
  //     });
  //     console.log(res.data);
  //     commitSetQuestions(context, res.data);
  //   } catch (err) {
  //     commitSetError(context, true);
  //   }
  //   commitSetInProgress(context, false);
  // },
  // actionSubmitAnswers(context: MainContext, payload: (any | null)[]) {
  //     console.log(payload);
  //   commitSetAnswers(context, payload);
  //   commitSetSubmitted(context, true);
  // },
};

const { dispatch } = getStoreAccessors<ContestState | any, State>("");

// export const dispatchFetchQuestions = dispatch(actions.actionFetchQuestions);
// export const dispatchPostAnswers = dispatch(actions.actionSubmitAnswers);
