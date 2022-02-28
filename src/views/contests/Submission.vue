<template>
    <div class="cnt" v-if='answers!=undefined'>
    <h1>Total score: {{ totalScore }}</h1>
    <h3>Answers: {{ answers }}</h3>
    <div v-for="(question, index) in questions" :key="index">
      <strong>
        <div style="color: green" v-if="isCorrect(index)">Correct Answer</div>
        <div
          v-else-if="
            (typeof answers[index] == 'object' && answers[index].length == 0) ||
            answers[index] == null
          "
          style="color: grey"
        >
          Not attempted
        </div>
        <div v-else style="color: red">Wrong answer</div></strong
      >
      <div class="index_btn">
        {{ index + 1 }}
      </div>
      <div class="question">
        {{ questions[index].question }}
      </div>

      <v-container
        fluid
        v-if="questions[index].multiple_correct_answers == 'false'"
      >
        <v-radio-group
          v-for="value in ['a', 'b', 'c', 'd', 'e', 'f']"
          :key="`q${index}${value}`"
          v-model="answers[index]"
        >
          <v-radio
            :class="
              questions[index].correct_answers[`answer_${value}_correct`] ===
              'true'
                ? 'correct_answer'
                : answers[index] != null &&
                  `q${index}${value}` == answers[index]
                ? 'incorrect_answer'
                : ''
            "
            :id="`q${index}${value}`"
            :value="`q${index}${value}`"
            :label="questions[index].answers[`answer_${value}`]"
            v-if="questions[index].answers[`answer_${value}`]"
          >
          </v-radio>
        </v-radio-group>
      </v-container>
      <v-container
        v-if="questions[index].multiple_correct_answers == 'true'"
        fluid
      >
        <div
          v-for="value in ['a', 'b', 'c', 'd', 'e', 'f']"
          :key="`q${index}${value}`"
        >
          <v-checkbox
            :class="
              questions[index].correct_answers[`answer_${value}_correct`] ===
              'true'
                ? 'correct_answer'
                : answers[index] != null &&
                  answers[index].includes(`q${index}${value}`)
                ? 'incorrect_answer'
                : ''
            "
            :value="`q${index}${value}`"
            :label="questions[index].answers[`answer_${value}`]"
            v-if="questions[index].answers[`answer_${value}`]"
            v-model="answers[index]"
          >
          </v-checkbox>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { appName } from "@/env";
import {
  readQuestions,
  readQuestionsError,
  readQuestionsProgress,
  readQuestionsAnswers,
} from "@/store/contest/getters";
import {
  commitSetError,
  commitSetInProgress,
  commitSetAnswers,
  commitSetSubmitted,
} from "@/store/contest/mutations";
// import {
//   dispatchFetchQuestions,
//   dispatchPostAnswers,
// } from "@/store/contest/actions";
import { Contest } from "@/interfaces";

@Component
export default class ContestView extends Vue {
  public appName = appName;

  public get questions() {
    return readQuestions(this.$store);
  }
  public get answers() {
    return readQuestionsAnswers(this.$store);
  }
  public isCorrect(i: number) {
    console.log(String(this.questions[i].multiple_correct_answers)=="true");
    if (
      String(this.questions[i].multiple_correct_answers)=="true"  &&
      this.answers != undefined &&  this.answers[i] != null 
    ) {
      console.log("new true");
      for (let t in this.answers[i]) {
          console.log( "aaa:",this.questions[i].correct_answers[
            `answer_${this.answers[i][t][this.answers[i][t].length - 1]}_correct`
          ]);
        if (
          this.questions[i].correct_answers[
            `answer_${this.answers[i][t][this.answers[i][t].length - 1]}_correct`
          ] == "false"
        )
          return false;
      }
      return true;
    } else {
      console.log("new false");
      
      if (
        this.answers != undefined &&
        this.answers[i] != null &&
        this.questions[i].correct_answers[
          `answer_${this.answers[i][this.answers[i].length - 1]}_correct`
        ] == "true"
      )
        return true;
    }
    return false;
  }

  public get totalScore() {
    let score = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (
        this.answers != undefined &&
        this.answers[i] != null &&
        this.questions[i].correct_answers[
          `answer_${this.answers[i][this.answers[i].length - 1]}_correct`
        ] == "true"
      ) {
        score++;
      }
    }
    return score;
  }
}
</script>
<style scoped lang="scss">
.cnt {
  padding: 50px 300px;
}
.correct_answer {
  background-color: rgb(176, 255, 176);
}
.incorrect_answer {
  background-color: rgb(255, 161, 161);
}
.question {
  margin-top: 10px;
  font-size: 16px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
}
.index_btn {
  background-color: rgb(68, 68, 68);
  color: white;
  font-size: 15px;
  padding: 4px;
  width: 30px;
  height: 30px;
  font-weight: bold;
  text-align: center;

  border-radius: 50%;
}
</style>
