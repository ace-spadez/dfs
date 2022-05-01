

<template>
  <div class="main-container">
    <div></div>

    <div>
      <div class="split-left">
        <div class="problem-form">
          <FormulateForm class="problem-form" v-model="problem" @submit="submit">
            <div class=select-group>
              <span>
            <FormulateInput
              type="select"
              name="problem_type"
              label="Problem Type"
              :options="{ S: 'Single Option Correct', M: 'Multiple options correcct',I: 'Integer type',P:'Pickle File'}"
            /></span>
            <span>
            <FormulateInput
              type="select"
              name="subject"
              label="Subject"
              :options="{ P: 'Machine Learning', C: 'Deep Learning',M: 'Artificial Intelligence'}"
            /></span>
            </div>
            <FormulateInput
              name="content"
              error-behavior="live"
              label="Content"
              validation="required"
              type="textarea"
            />
            <FormulateInput
              type="image"
              name="content_image"
              label="Select an image to upload"
              help="Select a png, or jpg to upload."
              validation="mime:image/jpeg,image/png,image"
            />
            <FormulateInput
              v-if="problem.problem_type=='M'||problem.problem_type=='S'"
              type="group"
              name="options"
              label="Options"
              validation="min:4,max:6,length"
              error-behavior="live"
              :repeatable="true"
              add-label=" Add"
            >
              <FormulateInput
                type="textarea"
                name="content"
                label="Option"
                validate="required"
                error-behavior="live"
              />
              <FormulateInput
                type="image"
                disabled
                name="content_image"
                label="Select an image to upload"
                help="Select a png, or jpg to upload."
                validation="mime:image/jpeg,image/png,image"
              />
              <FormulateInput name="is_correct" type="checkbox" label="Is Correct?" />
            </FormulateInput>
            <FormulateInput
              v-if="problem.problem_type=='I'"
              name="correct_integer"
              type="number"
              label="Correct Integer"
            />
            <div v-if="problem.problem_type=='P'">
                 <FormulateInput
              
              name="test_data"
              type="file"
              label="Select a test data file to upload"
              help="Select a csv to upload."
              validation="mime:text/csv"
            />
            <FormulateInput
           
              name="training_data"
              type="file"
              label="Select a training data file to upload"
              help="Select a csv to upload."
              validation="mime:text/csv"
            />
            </div>
 
            <FormulateInput
              type="group"
              name="tags"
              label="Add Tags"
              :repeatable="true"
              add-label=" Add"
            >
              <FormulateInput
                type="text"
                name="name"
                label="Tag"
                validate="required"
                error-behavior="live"
              />
            </FormulateInput>

  <FormulateInput v-if="!problemPostState.loading" type="submit" label="Create Problem" />
            <FormulateInput v-if="problemPostState.loading" type="button" disabled>
              Loading
              <v-progress-circular size="20" color="white" indeterminate style="margin-left:6px;"></v-progress-circular>
            </FormulateInput>


          </FormulateForm>
        </div>
      </div>
      <div class="split-right">
      
        <div class="preview">

          <div class='formula-label'>Question preview</div>

        <ProblemPreview :problem="problem"></ProblemPreview>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ICreateContest } from "@/interfaces";
import { readQuadrantCreateContestsState } from "@/store/quadrant/getters";
import ContestItem from "@/components/ContestItem.vue";
import ProblemPreview from "@/components/ProblemPreview.vue";
import QuadContestItem from "@/components/QuadContestItem.vue";
import { Contest ,IQuadProblemCreate} from "@/interfaces";
import {
  commitAddNotification,
  commitRemoveNotification
} from "@/store/main/mutations";
import { dispatchPostQuadrantContest } from "@/store/quadrant/actions";
import {
  dispatchGetQuadrantContest,
  dispatchGetQuadrantContestProblems,
  dispatchPostQuadrantContestProblem
} from "../../../store/quadcontest/actions";
import {
  readQuadrantContestState,
  readQuadrantProblemsState,
  readQuadrantProblemCreateState
} from "../../../store/quadcontest/getters";
import { getMonth } from "@/utils";
import { commitQCSetClear } from "@/store/quadcontest/mutations";
@Component({
  components: {
    QuadContestItem,
    ProblemPreview
  }
})
export default class AddProblem extends Vue {
  problem:any = {
    content: "",
    options: [],
    tags: [],
    problem_type: "S",
    subject: 'M',
    contest_uuid:'',
    correct_integer:0,

  };
  formula = "";
  public get getUUID() {
    console.log("params", this.$route.params);
    return this.$route.params["id"];
  }
  public async submit() {
    console.log(this.problem);
    this.problem['contest_uuid'] = this.getUUID;
    if(this.problem.content_image){
      this.problem['content_image'] = this.problem.content_image.fileList[0];

    }
    if(this.problem.test_data){
      this.problem['test_data'] = this.problem.test_data.fileList[0];

    }
    if(this.problem.training_data){
      this.problem['training_data'] = this.problem.training_data.fileList[0];

    }
    if(this.problem.problem_type=="S" || this.problem.problem_type=="M"){
    console.log(this.problem.options)   
    for(var i=0;i<this.problem['options'].length;i++){
      console.log(this.problem['options'][i])
      if(!this.problem['options'][i]['is_correct']) (this.problem['options'][i]['is_correct'] as boolean)=false;
    }
    }
 
    console.log(this.problem);
    var problem:IQuadProblemCreate = this.problem;
    await dispatchPostQuadrantContestProblem(this.$store,this.problem)
     const notif = {
      content: this.problemPostState.error
        ? "Error encountered"
        : "Problem Created",
      color: this.problemPostState.error ? "danger" : "success"
    };
    commitAddNotification(this.$store, notif);
    await new Promise((resolve, reject) => setTimeout(() => resolve(null), 2000));
    commitRemoveNotification(this.$store, notif);
  
  }
  public get problemPostState(){
    return readQuadrantProblemCreateState(this.$store)
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/css/global.scss";
.main-container {
  padding: 100px 100px 0 100px;
}
.problem-form {
  width: 100%;
}
.formula {
  color: rgb(255, 255, 255);
  background-color: rgb(49, 49, 49);
  width:500px;
  font-size: 25px;
  margin:0 50px 0 0;
}

.formula-label{
  color:grey;
  font-family: 'Montserrat'
}
.formula-div{
  background-color: rgb(243, 243, 243);
  background-color:$xSemiDark;
  padding: 80px 50px 10px 50px;
  position: fixed;
  width:100%;

}
.select-group{
  display:flex;
  flex-direction: row;
  margin-bottom:10px;
}
.select-group > span{
  margin-right:20px;
}
.problem-form::v-deep .formulate-input-element {
  max-width: none;
}
.content {
  width: 100%;
}
.split-left {
  height: 100%;
  width: 50%;
  position: fixed;
  top: 0;
  overflow-x: hidden;
  padding-top: 150px;
  padding-left: 100px;
  padding-right: 100px;
  min-width:400px;
  left: 0;
  background-color:rgb(255, 255, 255);
}
.split-right {
  height: 100%;
  width: 50%;
  position: fixed;

  background-color: $xDark;
  top: 0;
  overflow-x: hidden;
  right: 0;
}
.preview{
  padding-top: 160px;
  padding-right: 50px;
  padding-left: 50px;
}
</style>