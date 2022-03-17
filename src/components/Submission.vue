<template>
  <div :class="`problem ${!problem.submission?'unattempted-question':isCorrect>0?'correct-question':'incorrect-question'}`">
    <span class="Q" style>{{index+1}}</span>

    <vue-mathjax :formula="problem.content" :class="`question `"></vue-mathjax>
    <div class="marks"><vue-mathjax :formula="`\$${isCorrect}m\$`" :class="`question `"></vue-mathjax></div>
    <v-img v-if="problem.content_image" :src="content_image" width="100%" height="auto" />
     <div class="chips">
      <span class="subject">{{problem.subject=='M'?'Maths':problem.subject=='P'?'Physics':'Chemsitry'}}</span>
      <span class="type">{{problem.problem_type=='S'?'Single Option Correct':problem.problem_type=='M'?'Multiple Options Correct':'Integer-type'}}</span>
    </div>
    <div
      v-for="(option,ind) in problem.options"
      :class="option.is_correct==true && problem.submission && problem.submission.options.find(item=>item.uuid==option.uuid)?'green-option':option.is_correct==true?'yellow-option':problem.submission && problem.submission.options.find(item=>item.uuid==option.uuid)?'red-option':'normal-option'"
      :key="ind"
    >
      <span style="font-weight:bold;font-size:22px;">{{alpha[ind]}}.</span>
      <vue-mathjax :formula="option.content"></vue-mathjax>
    </div>
    <div v-if="problem.problem_type=='I'">
     <div> corect integer: <vue-mathjax :formula="`\$${problem.correct_integer}\$`"></vue-mathjax></div>
     <div v-if="problem.submission"> your integer: <vue-mathjax :formula="`\$${problem.submission.integer_content}\$`"></vue-mathjax></div>
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
      if (this.problem.correct_integer == this.problem.submission.integer_content)
        return 5;
        else return 0;
    }
    if (this.problem.problem_type == "S") {
      const c = this.problem.submission.options[0];
      this.problem.options.map((option, index) => {
        if (option.uuid == c.uuid) {
          if (option.is_correct == true) return 4;
        
        }
      });
      return -1;
    }
    if (this.problem.problem_type == "M") {
      this.problem.submission.options.map(option => {
        const opt = this.problem.options.find(item => item.uuid == option.uuid);
        if (opt) {
          if (opt["is_correct"] == true) {
            marks+=3;
          } else {
            marks-=1;
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
  padding: 10px 10px 10px 10px;
  margin: 10px 0px 10px 0px;
  border-radius: 10px;
  color:white;
}
.correct-question {
  background-color: rgb(29, 66, 7);
  background-color: $xMedium;

}
.incorrect-question {
  background-color: rgb(165, 7, 7);
  background-color: $xMedium;

}
.unattempted-question {
  background-color: $xMedium;
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
.subject{
padding:5px 10px;
background-color:rgb(0, 0, 0);
margin: 3px;
border-radius: 4px;


}
.chips{
  margin:10px 0;
  color:rgb(148, 148, 148);
  display:flex;
  flex-wrap: wrap;
}
.type{
padding:5px 10px;
background-color:$xDark;
border-radius: 4px;
margin:3px;
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
  background-color: rgba(29, 202, 87, 0.13);
}
.yellow-option {
  margin-top: 20px;
  padding: 10px 10px;
  color: rgb(180, 180, 180);
  border-radius: 10px;
  background-color: $xDark;
}
.red-option {
  margin-top: 20px;
  padding: 10px 10px;
  color: rgb(255, 255, 255);
    border-radius: 10px;
  background-color: rgba(218, 51, 51, 0.13);
}
.normal-option {
  margin-top: 20px;
  padding: 10px 10px;
}
.marks{
  float:right;
  font-size: 25px;
  font-weight: bold;
  padding:10px 20px;
  background-color: $xDark;
  border-radius: 15px;
  font-family: 'B612';
}
</style>