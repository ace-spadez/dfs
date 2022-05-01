<template>
  <div class="problem">
    <span class="Q" style>Q</span>
    <vue-mathjax :formula="problem.content" class="question"></vue-mathjax>
    <v-img v-if="problem.content_image" :src="content_image" width="100%" height="auto" />
    <div class="chips-container">
          <span v-for="(chip,index) in problem.tags" :key="index" class="wrap-item-chip">{{chip.name?chip.name:chip}}</span>
</div>
    <div
      v-for="(option,index) in problem.options"
      :class="option.is_correct==true?'green-option':'red-option'"
      :key="index"
    >
      <vue-mathjax :formula="option.content"></vue-mathjax>
    <v-img v-if="option.content_image" :src="options_image[`${index}`]" width="70%" height="auto" />

    </div>
    <div class="green-option" v-if="problem.problem_type=='I'"><vue-mathjax :formula="`\$${problem.correct_integer}\$`"></vue-mathjax></div>
    <a v-if="problem.problem_type=='P'" :href="problem.test_data"><v-btn class="left-btn">Download Test Data</v-btn></a>
    <a v-if="problem.problem_type=='P'" :href="problem.training_data"><v-btn>Download Training Data</v-btn></a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Contest } from "@/interfaces";
import { getMonth } from "@/utils";
@Component
export default class ProblemPreview extends Vue {
  @Prop() problem: any;
  content_image = "";
  options_image = {};
  public imageData() {
    if (this.problem.options) {
      this.problem.options.map((option, index) => {
        if (option.content_image) {
          var input = option.content_image;

          if (input.fileList && input.fileList[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.fileList[0]);

            reader.onload = e => {
              this.options_image[`${index}`] = (e as any).target.result;
            };
          }
        }
        else this.options_image[`${index}`]=''
      });
    }

    if (this.problem.content_image){
        var input = this.problem.content_image

          if (input.fileList && input.fileList[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.fileList[0]);

            reader.onload = e => {
              this.content_image = (e as any).target.result;
            };
          }
        
    }
    else this.content_image = ''
  }
  public beforeUpdate() {
    this.imageData();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.problem {
  color: white;
}
.left-btn{
  margin-right:20px;
}
.question {
  color: white;
  background-color: #192226;
  padding: 10px 10px;
}
.Q {
  color: white;
  font-weight: bold;
  font-size: 40px;
}
.chips-container{
  display:flex;
  flex-wrap: wrap;
}
.wrap-item-chip{
    color: #696868;
    font-weight: bold;
  background-color: rgb(226, 226, 223);
  padding: 4px 15px;
  margin:10px 10px 0 10px;
//   width:100px;
  border-radius:10px;
  font-size:13px;
}
.green-option {
  color: rgb(175, 255, 202);
  margin-top: 20px;
  background-color: rgb(0, 42, 14);
  padding: 10px 10px;
}
.red-option {
  color: rgb(255, 189, 189);
  margin-top: 20px;
  background-color: rgb(0, 0, 0);
  padding: 10px 10px;
}
</style>