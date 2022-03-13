<template>
  <div :class="`problem ${!problem.submission?'unattempted-question':'correct-question'}`">
    <span class="Q" style>{{index+1}}</span>

    <vue-mathjax :formula="problem.content" :class="`question `"></vue-mathjax>
    <v-img v-if="problem.content_image" :src="content_image" width="100%" height="auto" />
    <div class="chips-container">
      <span
        v-for="(chip,index) in problem.tags"
        :key="index"
        class="wrap-item-chip"
      >{{chip.name?chip.name:chip}}</span>
    </div>
    <div
      v-for="(option,ind) in problem.options"
      :class="option.is_correct==true?'green-option':'normal-option'"
      :key="ind"
    >
      <span style="font-weight:bold;font-size:22px;">{{alpha[ind]}}.</span>
      <vue-mathjax :formula="option.content"></vue-mathjax>
    </div>
    <div class="green-option" v-if="problem.problem_type=='I'">
      <vue-mathjax :formula="`\$${problem.correct_integer}\$`"></vue-mathjax>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Contest } from "@/interfaces";
import { getMonth } from "@/utils";
@Component
export default class Submission extends Vue {
  @Prop() problem: any;
  @Prop() index: any;
  public alpha = ["a", "b", "c", "d", "e", "f"];

  public get isCorrect() {
    if (!this.problem.submission) return false;
    if (this.problem.problem_type == "I") {
      return (
        this.problem.correct_integer == this.problem.submission.integer_content
      );
    }
    if (this.problem.problem_type == "S") {
      const c = this.problem.submission.options[0];
      this.problem.options.map((option, index) => {
        if (option.uuid == c.uuid) {
          if (option.is_correct == true) return true;
          else return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.problem {
  font-size: 15px;
  padding: 10px 10px 10px 10px;
  margin: 10px 0px 10px 0px;
  border-radius: 10px;
}
.correct-question {
  background-color: rgb(255, 255, 255);
}
.incorrect-question {
  background-color: rgb(255, 220, 220);
}
.unattempted-question {
  background-color: rgb(248, 248, 248);
}
.question {
  padding: 10px 10px 10px 10px;
  // background-color: $green2;
  // width:100%;
  // color:white;
  // border-radius: 10px;
}
.Q {
  font-weight: bold;
  font-size: 40px;
}
.chips-container {
  display: flex;
  flex-wrap: wrap;
}
.wrap-item-chip {
  color: #696868;
  font-weight: bold;
  background-color: rgb(226, 226, 223);
  padding: 4px 15px;
  margin: 10px 10px 0 10px;
  //   width:100px;
  border-radius: 10px;
  font-size: 13px;
}
.green-option {
  margin-top: 20px;
  padding: 10px 10px;
  color: $green2;
}
.red-option {
  margin-top: 20px;
  padding: 10px 10px;
  color: rgb(200, 77, 77);
}
.normal-option {
  margin-top: 20px;
  padding: 10px 10px;
}
</style>