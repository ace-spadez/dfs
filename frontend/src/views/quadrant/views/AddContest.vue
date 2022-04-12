

<template>
  <div class="main-container">
    <div>
      <h3>Create A Contest</h3>
    </div>
    <!-- <mathlive-mathfield :options="{smartFence:false}" v-model="formula"></!--> 
    <br />
    <FormulateForm v-model="contest" @submit="submit">
      <div class="form-container">
        <div>
          <FormulateInput name="name" error-behavior="live" label="Name" validation="required" />
          <FormulateInput
            type="textarea"
            name="description"
            error-behavior="live"
            label="Description"
            validation="required|max:500"
          />

          <FormulateInput
            type="select"
            name="contest_difficulty"
            label="Difficulty"
            :options="{MX: 'Mixed', MN: 'Mains', AV: 'Advanced'}"
          />
          <FormulateInput
            type="select"
            name="contest_type"
            label="Type"
            :options="{F: 'All', P: 'Physics', C: 'Chemistry',M: 'Maths'}"
          />
          <br />
          <br />

          <FormulateInput type="submit" label="Create Contest" />
        </div>

        <div class="form-right">
          <FormulateInput
            type="datetime-local"
            name="target_date"
            label="Date and Time of the contest"
            placeholder="Datee & Time"
            validation="required"
            error-behavior="live"
          />

          <FormulateInput
            name="duration"
            error-behavior="live"
            label="Duration"
            validation="required|number|max:360|min:30"
          />
        </div>
        <div class="form-right">
          <FormulateInput
            type="group"
            name="contest_chips"
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
        </div>
      </div>
    </FormulateForm>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ICreateContest } from "@/interfaces";
import { readQuadrantCreateContestsState } from "@/store/quadrant/getters";
import ContestItem from "@/components/ContestItem.vue";
import QuadContestItem from "@/components/QuadContestItem.vue";
import { Contest } from "@/interfaces";
import {
  commitAddNotification,
  commitRemoveNotification
} from "@/store/main/mutations";
import { dispatchPostQuadrantContest } from "@/store/quadrant/actions";
@Component
export default class AddContest extends Vue {
  contest = {
    target_date: "",
    duration: "0",
    end_date: "",
    contest_chips: []
  };
  formula = "";
  public async submit() {
    var target_date = Date.parse(this.contest.target_date);
    var millis = target_date + Number(this.contest.duration) * 60 * 1000;
    var old_date = new Date(target_date);
    var new_date = new Date(millis);
    this.contest.end_date = new_date.toISOString();
    this.contest.target_date = old_date.toISOString();

    console.log(this.contest);

    await dispatchPostQuadrantContest(this.$store, this.contest as any);
    console.log(this.createContestState);
    const notif = {
      content: this.createContestState.error
        ? "Error encountered"
        : "Contest Created",
      color: this.createContestState.error ? "danger" : "success"
    };
    commitAddNotification(this.$store, notif);
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    commitRemoveNotification(this.$store, notif);
  }
  public get createContestState() {
    return readQuadrantCreateContestsState(this.$store);
  }

}
</script>

<style scoped lang="scss">
@import "@/assets/css/global.scss";
.main-container {
  padding: 100px 100px 0 100px;
}
.form-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
}
.form-right {
  margin-left: 100px;
}
</style>