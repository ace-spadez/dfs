

<template>
  <div class="main-container">
    <div></div>

    <div>
      <div class="split-left">
        <div v-if="contestState.error" class="error-f">You do not have access to see the contest details.</div>
        <div v-if="contestState.loading">loading</div>
        <QuadContestItem
          v-if="contestState.contest"
          :contest="contestState.contest"
          style="padding-left:100px;"
        ></QuadContestItem>
        <br />
        <v-btn v-if="contestState.contest.is_applied==true &&  contestState.contest.is_attempted==true"
          class="editbutton"
          outlined
          color="indigo"
          :to="{name:'quadcontestedit',params:{id:getUUID}}"
        >Edit</v-btn>
        <br />

        <div v-if="problemsState.error" class="error-f">You do not have acceess to see the contest problems.</div>
        <div v-if="problemsState.loading">loading</div>
        <div v-if="!problemsState.loading && !problemsState.error" class="problems">
          <div class="fab" v-if="contestState.contest">
            <router-link :to="{name:'quadcontestaddproblem',params:{id:contestState.contest.uuid}}">
              <v-btn fab>
                <v-icon>add</v-icon>
              </v-btn>
            </router-link>
          </div>

          <div v-for="(problem,index) in problemsState.problems"    :key="index" class="problems-item">
            <router-link :to="{name:'quadcontesteditproblem',params:{contest_uuid:getUUID,problem_id:index}}">
            <ProblemPreview  :problem="problem"></ProblemPreview>
            </router-link>
          </div>
        </div>
      </div>
      <div class="split-right">
        <div v-if="contestState.contest">
          <div class="rankings-head">Authors</div>
          <div
            v-for="(standing,ind) in contestState.contest.writers"
            :key="ind"
            class="ranking-main-item"
          >
            <UserPreview :standing="standing"></UserPreview>
          </div>
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
import QuadContestItem from "@/components/QuadContestItem.vue";
import { Contest } from "@/interfaces";
import {
  commitAddNotification,
  commitRemoveNotification
} from "@/store/main/mutations";
import { dispatchPostQuadrantContest } from "@/store/quadrant/actions";
import {
  dispatchGetQuadrantContest,
  dispatchGetQuadrantContestProblems
} from "../../../store/quadcontest/actions";
import {
  readQuadrantContestState,
  readQuadrantProblemsState
} from "../../../store/quadcontest/getters";
import { getMonth } from "@/utils";
import { commitQCSetClear } from "@/store/quadcontest/mutations";
import ProblemPreview from "@/components/ProblemPreview.vue";
import UserPreview from "@/components/UserPreview.vue";
@Component({
  components: {
    QuadContestItem,
    ProblemPreview,
    UserPreview
  }
})
export default class QuadContest extends Vue {
  public get getUUID() {
    console.log("params", this.$route.params);
    return this.$route.params["id"];
  }

  public async beforeMount() {
    commitQCSetClear(this.$store);

    dispatchGetQuadrantContest(this.$store, this.getUUID);
    dispatchGetQuadrantContestProblems(this.$store, this.getUUID);
  }

  public get contestState() {
    return readQuadrantContestState(this.$store);
  }
  public get problemsState() {
    return readQuadrantProblemsState(this.$store);
  }
  public get contest() {
    return this.contestState.contest;
  }
  public get problems() {
    return this.problemsState.problems;
  }
  public getM(str: string) {
    return getMonth(Number(str));
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/css/global.scss";
.main-container {
  padding: 100px 100px 0 100px;
}

.split-left {
  height: 100%;
  width: 80%;
  position: fixed;
  top: 0;
  overflow-x: hidden;
  padding-top: 100px;
  // padding-left: 100px;
  left: 0;
}
.problems {
  padding-left: 100px;
  padding-right: 100px;
}
.problems-item {
  background-color: $xDark;
  margin: 5px 0;

  border-radius: 20px;
  padding: 10px 10px 10px 10px;
  &:hover {
    box-shadow: 0 0 15px 2px grey;
  }
}
.editbutton{
  margin-left:100px;
  margin-bottom: 100px;
}
.rankings-head {
  font-family: "b612";
  font-weight: bold;
  margin-bottom: 20px;
}
.rankings-main {
  background-color: $xDark;
  border-radius: 0 0 10px 10px;
  margin: 10px 0px 0 0px;
  width: 100%;
  // height: 300px;
  padding-top: 10px;
}
.split-right {
  height: 100%;
  width: 20%;
  position: fixed;
  padding-top: 100px;
  padding-left: 20px;
  background-color: rgb(255, 255, 255);
  top: 0;
  overflow-x: hidden;
  right: 0;
}
.fab a {
  text-decoration: none;
}
.fab {
  margin-bottom: 40px;
}
.problems-item a{
  text-decoration: none;
}
.error-f{
  padding-left:100px;
  color:grey;
}
</style>