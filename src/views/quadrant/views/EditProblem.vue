

<template>
  <div class="main-container">
    <div></div>

    <div>
      <div class="split-left">
        <div class="problem-form">
          <FormulateForm class="problem-form" v-model="problem" @submit="submit">
            <div class="select-group">
              <span>
                <FormulateInput
                  type="select"
                  name="problem_type"
                  label="Problem Type"
                  disabled
                  :options="{ S: 'Single Option Correct', M: 'Multiple options correcct',I: 'Integer type'}"
                />
              </span>
              <span>
                <FormulateInput
                  type="select"
                  name="subject"
                  label="Subject"
                  :options="{ P: 'Physics', C: 'Chemistry',M: 'Maths'}"
                />
              </span>
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
              v-if="problem.problem_type!='I'"
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
              <FormulateInput type="text" name="uuid" disabled label="uuid" />
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

            <FormulateInput v-if="!problemPatchState.loading" type="submit" label="Edit problem" />
            <FormulateInput v-if="!problemPatchState.loading" type="button" class="danger-btn" v-on:click="del" label="Delete problem" />

            <FormulateInput v-if="problemPatchState.loading" type="button" disabled>
              Loading
              <v-progress-circular size="20" color="white" indeterminate style="margin-left:6px;"></v-progress-circular>
            </FormulateInput>
          </FormulateForm>
        </div>
      </div>
      <div class="split-right">
       
        <div class="preview" v-if="problem">
          <div class="formula-label">Question preview</div>

          <ProblemPreview :problem="problem"></ProblemPreview>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ICreateContest, IQuadProblemPatch } from "@/interfaces";
import { readQuadrantCreateContestsState } from "@/store/quadrant/getters";
import ContestItem from "@/components/ContestItem.vue";
import ProblemPreview from "@/components/ProblemPreview.vue";
import QuadContestItem from "@/components/QuadContestItem.vue";
import { Contest, IQuadProblemCreate } from "@/interfaces";
import {
  commitAddNotification,
  commitRemoveNotification
} from "@/store/main/mutations";
import { dispatchPostQuadrantContest } from "@/store/quadrant/actions";
import {
  dispatchGetQuadrantContest,
  dispatchGetQuadrantContestProblems,
  dispatchPostQuadrantContestProblem,
  dispatchPostQuadrantProblemPatch,
  dispatchPostQuadrantProblemDelete
} from "../../../store/quadcontest/actions";
import {
  readQuadrantContestState,
  readQuadrantProblemsState,
  readQuadrantProblemPatchState
} from "../../../store/quadcontest/getters";
import { getMonth } from "@/utils";
import { commitQCSetClear } from "@/store/quadcontest/mutations";
@Component({
  components: {
    QuadContestItem,
    ProblemPreview
  }
})
export default class EditProblem extends Vue {
  problem: any = {};
  problemOriginal: any = undefined;
  formula = "";
  public get contestUUID() {
    console.log("params", this.$route.params);
    return this.$route.params["contest_uuid"];
  }
  public get problemID() {
    return this.$route.params["problem_id"];
  }
  public get problems() {
    console.log("problems for editing", readQuadrantProblemsState(this.$store));
    return readQuadrantProblemsState(this.$store).problems as any;
  }
  public get problemPatchState() {
    return readQuadrantProblemPatchState(this.$store);
  }
  public async beforeMount() {
      console.log('prob',this.problems)
    if (this.problems == null || this.problems == undefined)
      await dispatchGetQuadrantContestProblems(this.$store, this.contestUUID);
      console.log('prob',this.problems)
    
    this.problem = this.problems[this.problemID];
    this.problem.tags.map((tag, index) => {
      this.problem.tags[index] = { name: tag };
    });
    this.problemOriginal = Object.create(this.problem);
    console.log("problem", this.problem);
  }
  public async submit() {
    for (var i = 0; i < this.problem["options"].length; i++) {
      console.log(this.problem["options"][i]);
      if (!this.problem["options"][i]["is_correct"])
        (this.problem["options"][i]["is_correct"] as boolean) = false;
       if (this.problem["options"][i]["option_image"]==null)
       delete this.problem['options'][i].option_image

    }
    const q: IQuadProblemPatch = {
      new_options: [],
      patch_options: [],
      delete_options: []
    };
    q.content = this.problem.content;
    q.subject = this.problem.subject;
    if(this.problem.correct_integer)
    q.correct_integer = this.problem.correct_integer;
    q.tags = this.problem.tags;

    this.problem.options.map((option, index) => {
      if (option.uuid) {
        (q.patch_options as any).push(option);
      } else {
        (q.new_options as any).push(option);
      }
    });
    this.problemOriginal.options.map((option, index) => {
      if (
        this.problem.options.filter(opt => opt.uuid == option.uuid).length == 0
      ) {
        (q.delete_options as any).push({ uuid: option.uuid });
      }
    });

    console.log(this.problem);
    console.log("q", q);

    await dispatchPostQuadrantProblemPatch(this.$store, {
      problem_uuid: this.problem.uuid,
      contest_uuid: this.contestUUID,
      problem: q
    });
        console.log(this.problemPatchState);
    const notif = {
      content: this.problemPatchState.error
        ? "Error encountered"
        : "Problem Edited",
      color: this.problemPatchState.error ? "danger" : "success"
    };
    commitAddNotification(this.$store, notif);
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    commitRemoveNotification(this.$store, notif);
  }

  public async del() {
    console.log(this.problem);

    await dispatchPostQuadrantProblemDelete(this.$store, {
      problem_uuid: this.problem.uuid,
      contest_uuid: this.contestUUID,
    });
        console.log(this.problemPatchState);
    const notif = {
      content: this.problemPatchState.error
        ? "Error encountered"
        : "Problem Edited",
      color: this.problemPatchState.error ? "danger" : "success"
    };
    commitAddNotification(this.$store, notif);
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    commitRemoveNotification(this.$store, notif);
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
  background-color: rgb(47, 47, 47);
  width: 500px;
  font-size: 25px;
  margin: 0 50px 0 0;
}

.formula-label {
  color: grey;
  font-family: "Montserrat";
}
.formula-div {
  background-color: rgb(243, 243, 243);
  background-color: $xSemiDark;
  padding: 80px 50px 10px 50px;
  position: fixed;
  width: 100%;
}
.select-group {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
.select-group > span {
  margin-right: 20px;
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
  min-width: 400px;
  left: 0;
  background-color: rgb(255, 255, 255);
  padding-bottom:100px;
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
.preview {
  padding-top: 160px;
  padding-right: 50px;
  padding-left: 50px;
}
.danger-btn{
  color: red;
}
</style>