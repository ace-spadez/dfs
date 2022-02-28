<template>
  <v-main>
    <v-app-bar app elevation="0">
         <v-list-item-action>
        <img
          src="@/assets/img/padlock.svg"
          width="30px"
       />
      </v-list-item-action>
        <span class="app-head-contest">Contest</span>
        <v-spacer></v-spacer>
         <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
           
            <button
              v-bind="attrs"
              v-on="on"
              class="submit-btn"
            >
              Submit
            </button>
          </template>
          <v-card >
            <v-card-title class="headline">
             Confirm submission
            </v-card-title>
            <v-card-text
              >You have solved 5 questions. Are you sure yoou wanna Submit the answers???</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">
               Cancel
              </v-btn>
              <v-btn color="green darken-1" text @click="submit">
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

       </v-app-bar>
    <v-navigation-drawer fixed main style="z-index: 0; padding-top: 70px" >
      <div v-if="!progress && !error && tileview">
        <div
          @click="goto(index)"
          v-for="(question, index) in questions"
          :key="index"
        >
          <div
            :class="`list-view-item ${
              index === currentQuestion ? 'current-item' : ''
            }`"
            :id="`list-item${index}`"
          >
            <div class="index_btn">
              {{ index + 1 }}
            </div>
            {{ question.question }}
          </div>
        </div>
      </div>

      <div v-if="!progress && !error && !tileview" class="grid-view">
        <button
          @click="goto(index)"
          v-for="(question, index) in questions"
          :key="index"
          :class="`grid-view-item ${
            index === currentQuestion
              ? 'grid-current-item'
              : script[index] !== null
              ? 'answered-grid-item'
              : ''
          }`"
        >
          <!-- <button :class="`grid-view-item ${index===currentQuestion?'grid-current-item':''}`" :id="`grid-list-item${index}`"> -->
          {{ index + 1 }}
          <!-- </button> -->
        </button>
      </div>

      <!-- <v-progress-circular v-if="progress" indeterminate></v-progress-circular> -->
      <v-skeleton-loader
        v-if="progress"
        type="list-item-three-line"
      ></v-skeleton-loader>
      <v-skeleton-loader
        v-if="progress"
        type="list-item-three-line"
      ></v-skeleton-loader>
      <v-skeleton-loader
        v-if="progress"
        type="list-item-three-line"
      ></v-skeleton-loader>
      <v-skeleton-loader
        v-if="progress"
        type="list-item-three-line"
      ></v-skeleton-loader>
      <v-skeleton-loader
        v-if="progress"
        type="list-item-three-line"
      ></v-skeleton-loader>
      <v-skeleton-loader
        v-if="progress"
        type="list-item-three-line"
      ></v-skeleton-loader>
      <v-skeleton-loader
        v-if="progress"
        type="list-item-three-line"
      ></v-skeleton-loader>
      <v-skeleton-loader
        v-if="progress"
        type="list-item-three-line"
      ></v-skeleton-loader>
    </v-navigation-drawer>
    <div class="cntainer">
      <!-- <img src="@/assets/img/grid.png" @click.stop="switchGrid" width="30px" /> -->
      <div class="contest-head">
        <div class="contest-name">
          <!-- <img
            src="@/assets/img/grid.png"
            @click.stop="switchGrid"
            width="30px"
          /> -->

          {{ contest.contest_name }} <strong>{{ contest.category }}</strong>
        </div>


       
      </div>
      <div>
        <v-skeleton-loader
          v-if="progress"
          type="card"
          style="margin-right: 100px"
        ></v-skeleton-loader>
      </div>
      <div v-if="error">Error Loading</div>
      <div v-if="!progress && !error">
        <div class="index_btn">
          {{ currentQuestion + 1 }}
        </div>
        <div class="question">
          {{ questions[currentQuestion].question }}
        </div>

        <v-container v-if='questions[currentQuestion].multiple_correct_answers=="false"' fluid class="options-container">
          <v-radio-group
            v-for="value in ['a', 'b', 'c', 'd', 'e', 'f']"
            :key="`q${currentQuestion}${value}`"
            v-model="script[currentQuestion]"
            dark
          >
            <v-radio
              :id="`q${currentQuestion}${value}`"
              :value="`q${currentQuestion}${value}`"
              :label="questions[currentQuestion].answers[`answer_${value}`]"
              v-if="questions[currentQuestion].answers[`answer_${value}`]"
            >
            </v-radio>
          </v-radio-group>
        </v-container>
        <v-container v-if='questions[currentQuestion].multiple_correct_answers=="true"' fluid>
          <div
            v-for="value in ['a', 'b', 'c', 'd', 'e', 'f']"
            :key="`q${currentQuestion}${value}`"
          >
            <v-checkbox
              :value="`q${currentQuestion}${value}`"
              :label="questions[currentQuestion].answers[`answer_${value}`]"
              v-if="questions[currentQuestion].answers[`answer_${value}`]"
            v-model="script[currentQuestion]"
            dark


            >
            </v-checkbox>
          </div>
        </v-container>
        <button
          class="next-btn"
          v-if="questions.length > currentQuestion + 1"
          @click.prevent="next"
        >
          Next
        </button>
        <button
          class="next-btn"
          v-if="questions.length > currentQuestion"
          @click.prevent="clear"
        >
          clear
        </button>
       
      </div>
    </div>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { appName } from "@/env";
import {
  readQuestions,
  readQuestionsError,
  readQuestionsProgress,
  readQuestionsAnswers
} from "@/store/contest/getters";
import { commitSetError, commitSetInProgress,commitSetAnswers ,commitSetSubmitted} from "@/store/contest/mutations";
// import { dispatchFetchQuestions,dispatchPostAnswers } from "@/store/contest/actions";
import { Contest } from "@/interfaces";
import { Dictionary } from "vue-router/types/router";

function stringify(str: string) {
  console.log(str);
  if (str == "undefined") return "";
  return str;
}
@Component
export default class ContestView extends Vue {
  public appName = appName;
  public selectedChoice: number | null = null;
  public dialog: boolean = false;
  public tileview: boolean = true;
  public currentQuestion: number = 0;
  public script: (any | null|string[])[] = [
    [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
  ];

  public get questions() {
    return readQuestions(this.$store);
  }
  public get error() {
    return readQuestionsError(this.$store);
  }
  public get progress() {
    return readQuestionsProgress(this.$store);
  }
   public get answers() {
    return readQuestionsAnswers(this.$store);
  }
  public next() {
    this.currentQuestion += 1;

    this.$forceUpdate();
  }
  public switchGrid() {
    this.tileview = !this.tileview;
  }
  public submit(){
    console.log(this.script);
    this.dialog = false;
    // dispatchPostAnswers(this.$store,this.script);
    this.$router.push('/contests/${this.$route.query.id}/submission');
 

  }

  public get contest() {
    return 0
    // const contest: Contest = {
    //   id: String(query.id),
    //   contest_name: String(query.contest_name),
    //   category: stringify(String(query.category)),
    //   contest_duration: Number(query.contest_duration),
    //   difficulty: stringify(String(query.difficulty)),
    //   contest_total_questions: Number(query.contest_total_questions),
    // };
    // return contest;
  }

  public goto(index: number) {
    this.currentQuestion = index;
    this.$forceUpdate();
  }
  public clear() {
    console.log(this.currentQuestion);
    this.script[this.currentQuestion] = null;
    this.$forceUpdate();
  }

  public beforeCreate() {
    const query = this.$route.query;
    const params = this.$route.params;
    const contest_uuid = String(params.uuid);

    console.log(contest_uuid);
    // dispatchFetchQuestions(this.$store, contest);
  }
  public onReload(event) {
    //  alert("Reload?");
    event.preventDefault();
    event.returnValue = "";
  }
  public beforeMount() {
    window.addEventListener("beforeunload", this.onReload);
  }
  public beforeDestroy() {
    window.removeEventListener("beforeunload", this.onReload);
  }

  public destroyed() {
    commitSetError(this.$store, false);
    commitSetInProgress(this.$store, true);
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/css/global.scss";

.cntainer {
  padding-left: 300px;

  padding-top: 10px;
  height: 100%;
  background-color: #fafafa;
  width: 100%;
  flex-direction: column;
}

.list-view-item {
  margin-bottom: 10px;
  margin: 5px 5px;
  background-color: #f6f6f6;
  padding: 20px 10px;
  // font-weight: bold;
  font-size: 10px;
  border: 2px solid rgb(246, 246, 246);

  // padding: 0 10px;
  &:hover {
    background-color: #d1d1d1;
  }
  border-radius: 10px;
}

.current-item {
  border: 2px solid rgb(0, 140, 255);
  box-shadow: #b4b4b4;
}
.next-btn {
  background-color: rgb(149, 213, 255);
  color: blue;
  padding: 10px 30px;
  font-weight: bold;
  border-radius: 20px;
  margin-right: 20px;
}
.app-head-contest{
  font-family: 'Raleway';
  font-weight: bold;
  font-size: 30px;
}
.submit-btn {
  background-color: rgb(200, 200, 200);
  color: rgb(0, 0, 0);
  padding: 10px 30px;
  font-weight: bold;
  border-radius: 20px;
  margin-right: 20px;
}
.index_btn {
  background-color: rgb(68, 68, 68);
  color: white;
  font-size: 20px;
  padding: 4px;
  width: 40px;
  height: 40px;
  font-weight: bold;
  text-align: center;

  border-radius: 50% 50% 0 0;
}
.contest-name {
  color: $xDark;
  font-size: 20px;

  font-family: 'Montserrat';
  // margin-bottom: 100px;
}
.options-container{
  background-color: $xDark;
  color: white;
  margin-top: 4px;
}
.options-container > *{
  color: white;
}
.answered-grid-item {
}
.question {
  // margin-top: 10px;
  padding: 10px;
  color: white;
  font-size: 16px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  background-color: $xDark;
}
.contest-head {
  display: flex;
  padding: 10px 30px 10px 0px;
  margin-bottom: 60px;
  justify-content: space-between;
}
.grid-view {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.grid-view-item {
  width: 40px;
  height: 40px;
  text-align: center;
  color: white;
  background-color: rgb(85, 85, 85);
  margin: 10px;
  border-radius: 5px;
  font-size: 20px;
}
.grid-current-item {
  background-color: rgb(81, 185, 255);
}
.answered-grid-item {
  background-color: rgb(187, 187, 187);
}
</style>
