<template>
  <div
    :class="`problem ${!problem.submission?'unattempted-question':isCorrect>0?'correct-question':'incorrect-question'}`"
  >
    <span class="Q" style>{{index+1}}</span>

    <vue-mathjax :formula="problem.content" :class="`question `"></vue-mathjax>
    <div class="marks">
      <vue-mathjax :formula="`\$${isCorrect}m\$`" :class="`question `"></vue-mathjax>
    </div>
    <v-img v-if="problem.content_image" :src="content_image" width="100%" height="auto" />
    <div class="chips">
      <span
        class="subject"
      >{{problem.subject=='M'?'Deep Learning':problem.subject=='P'?'Machine Learning':'Artificial Intelligence'}}</span>
      <span
        class="type"
      >{{problem.problem_type=='S'?'Single Option Correct':problem.problem_type=='M'?'Multiple Options Correct':'Integer-type'}}</span>
      <span class="correct_answer">+3</span>
      <span class="wrong_answer">-1</span>
    </div>
    <div
      v-for="(option,ind) in problem.options"
      :class="option.is_correct==true && problem.submission && problem.submission.options.find(item=>item.uuid==option.uuid)?'green-option':option.is_correct==true?'yellow-option':problem.submission && problem.submission.options.find(item=>item.uuid==option.uuid)?'red-option':'normal-option'"
      :key="ind"
    >
      <span style="font-weight:bold;font-size:22px;margin-right:10px;">{{alpha[ind]}}.</span>
      <vue-mathjax :formula="option.content"></vue-mathjax>
    </div>
    <div v-if="problem.problem_type=='I'">
      <div class="green-option">
        CORRECT INTEGER:
        <vue-mathjax :formula="`\$${problem.correct_integer}\$`"></vue-mathjax>
      </div>
      <div :class="isCorrect>0?`green-option`:'red-option'" v-if="problem.submission">
        YOUR ANSWER:
        <vue-mathjax :formula="`\$${problem.submission.integer_content}\$`"></vue-mathjax>
      </div>
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
    let marks = 0;
    if (!this.problem.submission) return 0;
    if (this.problem.problem_type == "I") {
      if (
        this.problem.correct_integer == this.problem.submission.integer_content
      )
        return 5;
      else return 0;
    }
    if (this.problem.problem_type == "S") {
      const c = this.problem.submission.options[0];
      return this.problem.options.find(item => item.uuid == c.uuid)['is_correct'] ?3:-1;
    }
    if (this.problem.problem_type == "M") {
      this.problem.submission.options.map(option => {
        const opt = this.problem.options.find(item => item.uuid == option.uuid);
        if (opt) {
          if (opt["is_correct"] == true) {
            marks += 3;
          } else {
            marks -= 1;
          }
        }
      });
      return marks;
    }
    return marks;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.problem {
  font-size: 15px;
  padding: 10px 20px 10px 20px;
  margin: 15px 0px 15px 0px;
  border-radius: 10px;
  color: white;
}
.correct-question {
  background-color: rgb(29, 66, 7);
  background-color: $xMedium;
  border-left: 20px solid $green2;
}
.incorrect-question {
  background-color: rgb(165, 7, 7);
  background-color: $xMedium;
  border-left: 20px solid rgb(156, 51, 51);
}
.unattempted-question {
  background-color: $xMedium;
  border-left: 20px solid grey;
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
.subject {
  padding: 5px 10px;
  background-color: rgb(0, 0, 0);
  margin: 3px;
  border-radius: 4px;
}
.chips {
  margin: 10px 0;
  color: rgb(148, 148, 148);
  display: flex;
  flex-wrap: wrap;
}
.type {
  padding: 5px 10px;
  background-color: $xDark;
  border-radius: 4px;
  margin: 3px;
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
  border-radius: 10px;
  border-left: 4px solid $green2;
  border-right: 4px solid $green2;

  background-color: rgba(29, 202, 87, 0.027);
}
.yellow-option {
  margin-top: 20px;
  padding: 10px 10px;
  color: rgb(180, 180, 180);
  border-radius: 10px;
  background-color: $xDark;
  border-left: 4px solid grey;
  border-right: 4px solid grey;
}
.red-option {
  margin-top: 20px;

  padding: 10px 10px;
  color: rgb(207, 76, 76);
  border-radius: 10px;
  border-left: 4px solid rgb(146, 50, 50);
  border-right: 4px solid rgb(146, 50, 50);
  background-color: rgba(230, 96, 96, 0.041);
}
.normal-option {
  margin-top: 20px;
  padding: 10px 10px;
}
.marks {
  float: right;
  font-size: 25px;
  font-weight: bold;
  padding: 10px 20px;
  background-color: $xDark;
  border-radius: 15px;
  font-family: "B612";
}

.wrong_answer{
padding:5px 10px;
background-color:$xDark;
color: rgb(248, 83, 83);
border-radius: 4px;
margin:3px;
}
.correct_answer{
padding:5px 10px;
background-color:$xDark;
color: rgb(112, 236, 74);
border-radius: 4px;
margin:3px;
}
</style>