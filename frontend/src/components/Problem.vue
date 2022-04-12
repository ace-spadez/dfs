<template>
  <div class="problem">
    <span class="Q" style>{{ind+1}}.</span>

    <vue-mathjax :formula="problem.content" class="question"></vue-mathjax>
    <div class="chips">
      <span class="subject">{{problem.subject=='M'?'Maths':problem.subject=='P'?'Physics':'Chemsitry'}}</span>
      <span class="type">{{problem.problem_type=='S'?'Single Option Correct':problem.problem_type=='M'?'Multiple Options Correct':'Integer-type'}}</span>
      <span class="correct_answer">+3</span>
      <span class="wrong_answer">-1</span>
    </div>
    <div v-if="problem.problem_type=='S'">
      <div v-for="(option,index) in problem.options" class="option" :key="index">
        <input
          class="radio"
          type="radio"
          :id="problem.uuid"
          :value="option.uuid"
          v-model="cOption"
          @change="saved=false"
        />

        <vue-mathjax style="margin-left:10px;" :formula="option.content"></vue-mathjax>
      </div>
    </div>
    <div v-if="problem.problem_type=='M'">
      <div v-for="(option,index) in problem.options" class="option" :key="index">
        <input
          type="checkbox"
          class="checkbox"
          :id="problem.uuid"
          :value="option.uuid"
          v-model="cOptions"
          @change="saved=false"
        />

        <vue-mathjax style="margin-left:10px;" :formula="option.content"></vue-mathjax>
      </div>
    </div>
    <div v-if="problem.problem_type=='I'">
      <FormulateInput
        style="background-color:white;color:black;width:200px;"
        v-model="cInteger"
        type="number"
        @change="saved=false"
      ></FormulateInput>
    </div>
    <br />
    <v-btn color="green" :class="`save`" :disabled="saved" dark @click.prevent="save">save</v-btn>

    <v-btn
      color="red lighten-1"
      :class="`clear`"
      :disabled="isClear"
      dark
      @click.prevent="clear"
    >clear</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Contest } from "@/interfaces";
import { getMonth } from "@/utils";
import { dispatchSubmitAnswerState } from "../store/contest/actions";
@Component
export default class Problem extends Vue {
  @Prop() problem: any;
  @Prop() ind: any;

  public saved = true;

  public cOption: string = "";
  public cOptions: any = [];
  public cInteger: number | null = null;


  @Watch("cInteger")
  public onChange(n, o) {
    if (this.problem.submission && o == null) return;
    this.saved = false;
  }

  public get isClear() {
    console.log(this.problem)
    if (
      this.cOption == "" &&
      this.cOptions.length <= 0 &&
      this.cInteger == null
    )
      return true;
    return false;
  }

  public beforeMount() {
    if (this.problem.submission) {
      console.log(this.problem.submission);
      if (this.problem.submission.integer_content) {
        this.cInteger = this.problem.submission.integer_content;
      }
      if (
        this.problem.submission.options &&
        this.problem.submission.options.length > 0
      ) {
        if (this.problem.problem_type == "S") {
          this.cOption = this.problem.submission.options[0].uuid;
        }
        if (this.problem.problem_type == "M") {
          this.problem.submission.options.map(option => {
            console.log(option);
            this.cOptions.push(option.uuid);
          });
        }
      }
    }

    this.saved = true;
  }
  public async save() {
    let answer: any = {};
    if (this.problem.problem_type == "S") {
      answer.options = [];
      if (this.cOption) answer.options.push({ uuid: this.cOption });
    }
    if (this.problem.problem_type == "M") {
      answer.options = [];
      this.cOptions.map(cption => {
        answer.options.push({ uuid: cption });
      });
    }
    if (this.problem.problem_type == "I") {
      if (this.cInteger) answer.integer_content = this.cInteger;
    }
    console.log(answer);
    await dispatchSubmitAnswerState(this.$store, {
      contest_uuid: this.$route.params["contest_uuid"],
      problem_uuid: this.problem.uuid,
      submission: answer,
      index: this.ind
    });
    this.saved = true;
  }
  public async clear() {
    this.cOption = "";
    this.cOptions = [];
    this.cInteger = null;
    this.save();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.problem {
  // background-color: #ececec;
  box-shadow: 0 0 10px 0 rgb(187, 187, 187);
  padding: 20px 10px 20px 10px;
  margin: 20px 0 10px 0;
  border-radius: 10px;
  color: white;
  background-color: $xSemiDark;
  @include md {
    font-size: 15px;
  }
}
.question {
  padding: 10px 10px;
  font-weight: bold;
}
.Q {
  font-weight: bold;
  font-size: 40px;
  @include md {
    font-size: 30px;
  }
}

.green-option {
  color: rgb(175, 255, 202);
  margin-top: 20px;
  background-color: rgb(0, 42, 14);
  padding: 10px 10px;
}
.save {
  padding: 8px 20px;
  background-color: $green2;
  border-radius: 5px;
}
.clear {
  padding: 8px 20px;
  background-color: $green2;
  border-radius: 5px;
  margin-left: 10px;
}
.red-option {
  color: rgb(255, 189, 189);
  margin-top: 20px;
  background-color: rgb(0, 0, 0);
  padding: 10px 10px;
}
.option {
  margin-top: 20px;
  padding: 10px 10px;
}
.radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 50%;
  width: 16px;
  height: 16px;

  border: 2px solid rgb(255, 255, 255);
  transition: 0.2s all linear;
  margin-right: 5px;

  position: relative;
  top: 4px;
}

.radio:checked {
  border: 6px solid rgb(85, 152, 240);
  outline: unset !important; /* I added this one for Edge (chromium) support */
}
.checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 2px solid rgb(255, 255, 255);
  transition: 0.2s all linear;
  margin-right: 5px;

  position: relative;
  top: 4px;
}

.checkbox:checked {
  border: 6px solid rgb(85, 152, 240);
  outline: unset !important; /* I added this one for Edge (chromium) support */
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