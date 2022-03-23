<template>
  <v-main>
    <v-app-bar app elevation="2" :class="(panic)?'red':''">
      <v-list-item-action>
        <img src="@/assets/img/padlock.svg" width="30px" />
      </v-list-item-action>
      <v-skeleton-loader v-if="contestState.loading" type="heading" width="200px"></v-skeleton-loader>
      <span class="timer">{{countdown}}</span>
      <v-spacer></v-spacer>
                <button type="submit" class="submit-btn"  @click="Endcontest " >Return to Home</button>
      <!-- <v-dialog v-model="dialog" persistent max-width="290" v-if="contestState.contest">
        <template v-slot:activator="{ on, attrs }">
          <v-btn  v-bind="attrs" v-on="on" dark >Submit</v-btn>

        </template>
        <v-card>
          <v-card-title class="headline">Confirm submission</v-card-title>
          <v-card-text>You have solved 5 questions. Are you sure yoou wanna Submit the answers???</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>-->
    </v-app-bar>

    <div class="cntainer">
      <v-progress-linear
        color="red"
        style="position:fixed;z-index:100;"
        :value="progress"
        width="100%"
      ></v-progress-linear>

      <v-expansion-panels style="position:fixed;">
        <v-expansion-panel>
          <v-expansion-panel-header class="exp">
            Problems
            <template v-slot:actions>
              <v-icon color="white">$expand</v-icon>
            </template>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div v-if="problemsState.loading">
              <v-skeleton-loader type="list-item" width="100%"></v-skeleton-loader>
            </div>
            <div v-if="!problemsState.loading && !problemsState.error">
            
              <!-- <div class="subject-name">Physics</div>
              <div class="question-numbers">
                <div
                  :class="`question-number ${problem.submission?'green':'grey'}`"
                  v-for="(problem,i) in arrfilter('P')"
                  :key="i+1"
                  @click.prevent="scrollIntoView(i+1)"
                >{{i+1}}</div>
              </div>

              <div class="subject-name">Maths</div>
              <div class="question-numbers">
              
              <div
                :class="`question-number ${problem.submission?'green':'grey'}`"
                v-for="(problem,i) in arrfilter('M')"
                :key="arrfiltercount('P')+i+1"
                @click.prevent="scrollIntoView(arrfiltercount('P')+i+1)"
              >{{arrfiltercount('P')+i+1}}</div>
              </div>
              <div class="subject-name">Chemistry</div>
              <div class="question-numbers">
              
              <div
                :class="`question-number ${problem.submission?'green':'grey'}`"
                v-for="(problem,i) in arrfilter('C')"
                :key="arrfiltercount('M')+arrfiltercount('P')+i+1"
                @click.prevent="scrollIntoView(arrfiltercount('M')+arrfiltercount('P')+i+1)"
              >{{arrfiltercount('M')+arrfiltercount('P')+i+1}}</div>

              </div>

              </div>-->
              <div class="question-numbers">
                <div class="subject-name">Physics</div>

                <div
                  :class="`question-number ${problem.submission?'green':'grey'}`"
                  v-for="(problem,i) in arrfilter('P')"
                  :key="i+1"
                  @click.prevent="scrollIntoView(i+1)"
                >{{i+1}}</div>
                <div class="subject-name">Maths</div>

                <div
                  :class="`question-number ${problem.submission?'green':'grey'}`"
                  v-for="(problem,i) in arrfilter('M')"
                  :key="arrfiltercount('P')+i+1"
                  @click.prevent="scrollIntoView(arrfiltercount('P')+i+1)"
                >{{arrfiltercount('P')+i+1}}</div>
                <div class="subject-name">Chemistry</div>

                <div
                  :class="`question-number ${problem.submission?'green':'grey'}`"
                  v-for="(problem,i) in arrfilter('C')"
                  :key="arrfiltercount('M')+arrfiltercount('P')+i+1"
                  @click.prevent="scrollIntoView(arrfiltercount('M')+arrfiltercount('P')+i+1)"
                >{{arrfiltercount('M')+arrfiltercount('P')+i+1}}</div>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <br />
      <br />

      <Error v-if="problemsState.error"></Error>
      <div v-if="problemsState.loading" style="padding:0 10px;">
        <v-skeleton-loader v-for="i in 10" :key="i" type="card" width="100%"></v-skeleton-loader>
      </div>
      <div v-if="!problemsState.error && !problemsState.loading" class="problems">
        <Problem
          :ref="`index${index+1}`"
          v-for="(item,index) in problemsState.problems"
          :key="item.uuid"
          :id="`index${index+1}`"
          :ind="index"
          :problem="item"
        ></Problem>
      </div>
    </div>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { appName } from "@/env";
import Error from "@/components/Error.vue";
// import { dispatchFetchQuestions,dispatchPostAnswers } from "@/store/contest/actions";
import { Contest } from "@/interfaces";
import {
  dispatchGetContestData,
  dispatchContestProblems
} from "../../store/contest/actions";
import {
  readContestDataState,
  readContestProblemState
} from "../../store/contest/getters";
import Problem from "@/components/Problem.vue";
function stringify(str: string) {
  console.log(str);
  if (str == "undefined") return "";
  return str;
}
@Component({
  components: { Problem, Error }
})
export default class ContestView extends Vue {
  public panic: boolean = false;
  public appName = appName;
  public progress = 0;
  public selectedChoice: number | null = null;
  public dialog: boolean = false;
  public x: any;

  countdown: string = "";

  public arrfiltercount(subject) {
    return this.problemsState.problems.filter(p => p.subject == subject).length;
  }
  public arrfilter(subject) {
    return this.problemsState.problems.filter(p => p.subject == subject);
  }
  public getDurationData(millis) {
    var now = new Date().getTime() + 5.5 * 60 * 60 * 1000;

    var distance = millis - now;

    if (distance < 0) return -1;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (minutes + 60 * hours <= 10) this.panic = true;
    else this.panic = false;
    if (this.contestState.contest) {
      this.progress =
        100 -
        ((minutes + 60 * hours) * 100) /
          Number(this.contestState.contest.duration);
    }
    return {
      days,
      hours,
      minutes,
      seconds
    };
  }
  public getime() {
    this.x = setInterval(() => {
      if (this.contestState.contest) {
        const countDownDate = Date.parse(
          (this.contestState as any).contest.end_date
        );
        const object = this.getDurationData(countDownDate);
        // console.log('object',object)
        if (object != -1)
          this.countdown =
            object.hours + "h " + object.minutes + "m " + object.seconds + "s ";
        else {
          clearInterval(this.x);
          this.$router.go(-1);
        }
      }
    }, 1000);
  }
  public submit() {
    console.log("YASSSSS");
    this.dialog = false;
  }
  public Endcontest(){
    console.log("YASSSSSSSSSS");
    this.$router.go(-1);

  }
  public get contestUUID() {
    return this.$route.params["contest_uuid"];
  }

  public get contestState() {
    return readContestDataState(this.$store);
  }
  public get problemsState() {
    console.log(readContestProblemState(this.$store));
    return readContestProblemState(this.$store);
  }

  public goto(index: number) {}
  public clear() {}

  public beforeMount() {
    this.getime();
    window.addEventListener("beforeunload", this.onReload);

    dispatchGetContestData(this.$store, this.contestUUID);
    dispatchContestProblems(this.$store, this.contestUUID);
  }

  public onReload(event) {
    event.preventDefault();
    event.returnValue = "";
  }

  public scrollIntoView(index) {
    (document.getElementById(`index${index}`) as any).scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }
  public beforeDestroy() {
    clearInterval(this.x);
    window.removeEventListener("beforeunload", this.onReload);
  }

  public destroyed() {}
}
</script>
<style scoped lang="scss">
@import "@/assets/css/global.scss";
.problems {
  padding: 50px 100px 0 100px;
  @include md {
    padding: 50px 10px 0 10px;
  }
}
.submit-btn {
  background-color: rgb(177, 224, 255);
  padding: 5px 10px;
  color: rgb(0, 140, 255);
  font-weight: bold;
}
.red {
  background-color: rgb(163, 67, 67);
}
.cntainer {
  width: 100%;
  height: 100%;
}
.timer {
  font-weight: bold;
  font-family: "B612";
  float: right;
  padding: 5px 10px;
  // color:white;
  // background-color:$green2;
  border-radius: 15px;
}
.question-number {
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  @include md {
    font-size: 0.8em;
  }
  margin: 5px;
}
.subject-name {
  padding: 5px 10px;
  border-radius: 5px;
  margin: 5px;
  background-color: $xMedium;
  font-family: "B612";
  color: white;
  @include md {
    font-size: 0.8em;
  }
}
.subject-name {
  color: grey;
  font-size: 0.9em;
}
.grey {
  background-color: rgb(167, 167, 167);
}
.green {
  background-color: $green2;
}
.question-numbers {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.exp {
  background-color: $xMedium;
  color: white;
}
.error-message-div {
  flex-direction: column;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.error-message {
  .error-message-div {
    flex-direction: column;
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .error-message {
    font-weight: bold;
    color: rgb(146, 146, 146);
    font-size: 30px;
    @include md {
      font-size: 20px;
    }
    font-family: "B612";
  }
  font-weight: bold;
  color: rgb(146, 146, 146);
  font-size: 30px;
  @include md {
    font-size: 20px;
  }
  font-family: "B612";
}
</style>
