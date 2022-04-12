<template>
  <v-main>
    <v-app-bar color="#fafafa" elevation="1" app>
      <v-list-item-action>
        <v-img src="@/assets/img/left-arrow.svg" @click.prevent="goback" width="30px"></v-img>
      </v-list-item-action>
    </v-app-bar>
    <br />

    <div v-if="contestState.error">Error encountered in retrieving contest. Try again Later.</div>
    <div class="contest-pre-container">
      <div class="contest-pre-main">
        <v-skeleton-loader width="100%" v-if="contestState.loading" class="mx-auto" type="card"></v-skeleton-loader>
        <ContestItem
          v-if="contestState.contest"
          class="item"
          :contest="contestState.contest"
          :key="contestState.contest.uuid"
        ></ContestItem>
        <div
          v-if="contestState.contest && contestState.contest.status=='Passed' && contestState.contest.contest_process"
        >
          <div v-if="contestState.contest.contest_process.status=='P'" class="status">
            <v-btn icon>
              <v-icon color="black">mdi-clock-time-five</v-icon>
            </v-btn>Rating Evaluations Pending
          </div>
          <div
            v-if="contestState.contest.contest_process.status=='X' && contestState.contest.contest_process.score.score_all"
          >
            <v-simple-table >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">All</th>
                    <th class="text-left">Physics</th>
                    <th class="text-left">Chemistry</th>
                    <th class="text-left">Maths</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <UserPreview :standing="contestState.contest.contest_process"></UserPreview>
                    </td>
                    <td>{{ contestState.contest.contest_process.score.score_all?contestState.contest.contest_process.score.score_all:'-' }}</td>
                    <td>{{ contestState.contest.contest_process.score.score_p?contestState.contest.contest_process.score.score_p:'-' }}</td>
                    <td>{{ contestState.contest.contest_process.score.score_c?contestState.contest.contest_process.score.score_c:'-' }}</td>
                    <td>{{ contestState.contest.contest_process.score.score_m?contestState.contest.contest_process.score.score_m:'-' }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>
        <br />
        <br />
        <v-tabs fixed-tabs color="deep-purple accent-4" class="tabs">
          <v-tab>Submission</v-tab>
          <v-tab>Standings</v-tab>
          <v-tab>Friends</v-tab>

          <v-tab-item>
            <div v-if="submissionsState.loading">
              <v-skeleton-loader
                type="list-item-three-line"
                width="100%"
                v-for="item in [0,1,2,3,4,5,6,7,8,9,10]"
                :key="item"
              ></v-skeleton-loader>
            </div>
            <div v-if="submissionsState.submissions.length>0">
              <div class="total">{{total}}m</div>
              <Submission
                v-for="(problem,index) in submissionsState.submissions"
                :key="index"
                :problem="problem"
                :index="index"
              ></Submission>
            </div>
          </v-tab-item>
          <v-tab-item>
            <br />

            <v-simple-table v-if="standingsState.standings">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">All</th>
                    <th class="text-left">Physics</th>
                    <th class="text-left">Chemistry</th>
                    <th class="text-left">Maths</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in standingsState.standings" :key="index">
                    <td>
                      <UserPreview :standing="item.user"></UserPreview>
                    </td>
                    <td>{{ item.score.score_all?item.score.score_all:'-' }}</td>
                    <td>{{ item.score.score_p?item.score.score_p:'-' }}</td>
                    <td>{{ item.score.score_c?item.score.score_c:'-' }}</td>
                    <td>{{ item.score.score_m?item.score.score_m:'-' }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <br />
            <div class="loading-center" v-if="standingsState.loading">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <br />
            <div class="text-center">
              <v-pagination
                v-model="page"
                v-if="standingsState.pages"
                :length="standingsState.pages"
              ></v-pagination>
            </div>
          </v-tab-item>
          <v-tab-item>
            <br />

            <v-simple-table v-if="friendsState.standings">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">All</th>
                    <th class="text-left">Physics</th>
                    <th class="text-left">Chemistry</th>
                    <th class="text-left">Maths</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in friendsState.standings" :key="index">
                    <td>
                      <UserPreview :standing="item.user"></UserPreview>
                    </td>
                    <td>{{ item.score.score_all?item.score.score_all:'-' }}</td>
                    <td>{{ item.score.score_p?item.score.score_p:'-' }}</td>
                    <td>{{ item.score.score_c?item.score.score_c:'-' }}</td>
                    <td>{{ item.score.score_m?item.score.score_m:'-' }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <br />
            <div class="loading-center" v-if="friendsState.loading">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
          </v-tab-item>
        </v-tabs>
      </div>
      <div class="contest-pre-side">
        <div class="rankings-head">Authors</div>
        <div class="rankings-main">
          <br />
          <div v-if="contestState.loading">
            <v-skeleton-loader
              v-for="(i,index) in [1,2,3,4,5]"
              :key="index"
              width="100%"
              class="mx-auto"
              type="list-item-avatar"
            ></v-skeleton-loader>
          </div>
          <div v-if="contestState.contest">
            <UserPreview
              v-for="(standing,index) in contestState.contest.writers"
              :key="index"
              :standing="standing"
            ></UserPreview>
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import UserPreview from "@/components/UserPreview.vue";
import { appName } from "@/env";
import ContestItem from "@/components/ContestItem.vue";
import { Contest } from "@/interfaces";
import {
  dispatchGetContestData,
  dispatchStandingState,
  dispatchSubmissions,
  dispatchFriends
} from "../../store/contest/actions";
import {
  readContestDataState,
  readStandingsState,
  readSubmissionsState,
  readFriendsState
} from "../../store/contest/getters";
import Submission from "@/components/Submission.vue";
function stringify(str: string) {
  console.log(str);
  if (str == "undefined") return "";
  return str;
}
@Component({
  components: {
    ContestItem,
    UserPreview,
    Submission
  }
})
export default class ContestPreview extends Vue {
  public page: number = 1;

  public total: number = NaN;
  public get contestState() {
    return readContestDataState(this.$store);
  }
  public get contestUUID() {
    return this.$route.params["contest_uuid"];
  }
  public get standingsState() {
    return readStandingsState(this.$store);
  }
  public get submissionsState() {
    console.log(readSubmissionsState(this.$store));
    return readSubmissionsState(this.$store);
  }
  public get friendsState() {
    console.log(readFriendsState(this.$store));
    return readFriendsState(this.$store);
  }
  public async beforeMount() {
    dispatchGetContestData(this.$store, this.contestUUID);
    dispatchStandingState(this.$store, {
      contest_uuid: this.contestUUID,
      page: 1
    });
    dispatchFriends(this.$store, {
      contest_uuid: this.contestUUID,
      page: 1
    });
    await dispatchSubmissions(this.$store, this.contestUUID);
    this.total = this.gettotal();
  }
  @Watch("page")
  public onPageChange(newPage, prevPage) {
    dispatchStandingState(this.$store, {
      contest_uuid: this.contestUUID,
      page: newPage
    });
  }
  public goback() {
    this.$router.go(-1);
  }
  public gettotal() {
    let total = 0;
    this.submissionsState.submissions.map((problem, i) => {
      total += this.isCorrect(problem);
    });
    return total;
  }
  public isCorrect(problem) {
    let marks = 0;
    if (!problem.submission) return 0;
    if (problem.problem_type == "I") {
      if (problem.correct_integer == problem.submission.integer_content)
        return 5;
      else return 0;
    }
    if (problem.problem_type == "S") {
      const c = problem.submission.options[0];
      return problem.options.find(item => item.uuid == c.uuid)["is_correct"]
        ? 3
        : -1;
    }
    if (problem.problem_type == "M") {
      problem.submission.options.map(option => {
        const opt = problem.options.find(item => item.uuid == option.uuid);
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

<style lang='scss'>
@import "@/assets/css/global.scss";
.contest-pre-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}
.wrap-item-btn {
  color: white;
  background-color: $green2;
  padding: 10px 40px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  text-decoration: none;
  border-radius: 1px;
  margin-top: 10px;
  height: 40px;
}
.contest-pre-main {
  padding-left: 50px;
  padding-right: 50px;
  @include sm {
    padding-left: 10px;
    padding-right: 10px;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}
.contest-pre-side {
  min-width: 500px;
  // background-color: $xMedium;
  padding: 10px 30px 0 30px;
  @include xl {
    display: none;
  }
}
.tabs {
  font-size: 10px;
}
.contest-name {
  font-family: "B612";
  font-size: 20px;
  font-weight: bold;
}
.rankings-main {
  background-color: rgb(247, 247, 247);
  margin: 20px 0 0 0;
  padding: 0px 0 0 10px;
  width: 100%;
}
.total {
  padding: 20px 0 20px 30px;
  margin: 20px 0 20px 0;
  font-family: "B612";
  font-weight: bold;
  font-size: 30px;
  color: $green2;
  background-color: rgb(218, 255, 218);
}
.loading-center {
  width: 100%;
  display: flex;
  justify-content: center;
}
.item {
  // box-shadow: 0 0 10px 0 rgb(190, 190, 190);
  padding: 20px;
}
.rankings-head {
  // margin-top: 20px;
  color: $xDark;
  font-family: "b612";
  font-weight: bold;
}
.resources {
  background-color: $xMedium;
  height: 500px;
  margin-top: 50px;
  width: 60vw;

  @include xl {
    width: 86vw;
  }
}
.status {
  background: rgb(255, 255, 215);
  padding: 10px 0 10px 10px;
  font-family: "B612";
  margin-top:10px;
}
</style>