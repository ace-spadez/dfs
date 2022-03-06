

<template>
  <div class="main-container">
    <h2 v-if="contestState">{{getUUID}}</h2>
    <div v-if="contestPatchState.error">error</div>

    <div></div>
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

          <FormulateInput v-if="!contestPatchState.loading" type="submit" label="Edit Contest" />
          <FormulateInput v-if="contestPatchState.loading" type="button" disabled>
            Loading
            <v-progress-circular size="20" color="white" indeterminate style="margin-left:6px;"></v-progress-circular>
          </FormulateInput>
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
import { Vue, Component, Prop } from "vue-property-decorator";
import { ICreateContest } from "@/interfaces";
import { readQuadrantCreateContestsState } from "@/store/quadrant/getters";
import ContestItem from "@/components/ContestItem.vue";
import QuadContestItem from "@/components/QuadContestItem.vue";
import { Contest, ITag } from "@/interfaces";
import {
  commitAddNotification,
  commitRemoveNotification
} from "@/store/main/mutations";
import {
  readQuadrantContestState,
  readQuadrantContestPatchState
} from "../../../store/quadcontest/getters";
import {
  dispatchGetQuadrantContest,
  dispatchPostQuadrantContestPatch
} from "../../../store/quadcontest/actions";
import { dispatchPostQuadrantContest } from "@/store/quadrant/actions";
@Component
export default class EditContest extends Vue {
  contest: any = undefined;

  public get contestState() {
    return readQuadrantContestState(this.$store);
  }
  public get contestPatchState() {
    return readQuadrantContestPatchState(this.$store);
  }
  public beforeMount() {
    dispatchGetQuadrantContest(this.$store, this.getUUID);

    const contestState = Object.create(readQuadrantContestState(this.$store));

    this.contest = contestState.contest;

    if (this.contest != undefined) {
      this.contest.target_date = this.contest.target_date.slice(0, 16);
      this.contest.contest_chips.map((e, i) => {
        (this.contest as any).contest_chips[i] = { name: e };
      });
    }
  }
  public get getUUID() {
    return this.$route.params["id"];
  }
  public async submit() {
    console.log("target date", this.contest.target_date);
    var target_date = Date.parse(this.contest.target_date);
    var millis = target_date + Number(this.contest.duration) * 60 * 1000;
    var old_date = new Date(target_date);
    var new_date = new Date(millis);
    this.contest.end_date = new_date.toISOString();
    this.contest.target_date = old_date.toISOString();

    console.log(this.contest);

    await dispatchPostQuadrantContestPatch(this.$store, {
      uuid: this.getUUID,
      contest: this.contest
    });
    console.log(this.contestPatchState);
    const notif = {
      content: this.contestPatchState.error
        ? "Error encountered"
        : "Contest Edited",
      color: this.contestPatchState.error ? "danger" : "success"
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