<template>
  <v-main>
    <v-app-bar color="#fafafa" elevation="4" app>
      <v-list-item-action @click.prevent="back">
        <img src="@/assets/img/left-arrow.svg" width="30px" />
      </v-list-item-action>

      <img src="@/assets/img/logo.png" width="35px" />
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <div v-if="isLoggedIn" class="profile-name">{{ userProfile.username }}</div>

      <Menu></Menu>
    </v-app-bar>

    <div v-if="userProfileState.loading" class="biodata">
      <v-skeleton-loader
        type="image"
        width="150px"
        height="150px"
        style="object-fit:cover;border-radius:50%;"
      ></v-skeleton-loader>
      <v-skeleton-loader type="list-item" width="250px" style="margin-top:20px;"></v-skeleton-loader>

      <v-skeleton-loader type="card" width="550px" style="margin-top:20px;"></v-skeleton-loader>
    </div>
    <div v-if="userProfileState.error">
      <Error></Error>
    </div>
    <div v-if="userProfileState.user" class="biodata">
      <img
        v-if="userProfileState.user.profile_image==null"
        class="profile-image"
        src="@/assets/img/Intersect.png"
        width="150px"
        height="150px"
        style="object-fit:cover;border-radius:50%;"
      />
      <img
        v-if="userProfileState.user.profile_image!=null"
        class="profile-image"
        :src="userProfileState.user.profile_image"
        width="150px"
        height="150px"
        style="object-fit:cover;border-radius:50%;"
      />

      <div class="username">@{{userProfileState.user.username}}</div>
      <div class="bio">{{userProfileState.user.bio}}</div>
      <br />
      <div v-if="!watchFriendState.loading && userProfile.username!=userProfileState.user.username">
        <v-btn
          outlined
          v-if="!watchFriendState.loading &&!userProfileState.user.is_friend"
          @click="toggle"
        >Add To Watchlist</v-btn>
        <v-btn
          color="black"
          style="color:white;"
          v-if="userProfileState.user.is_friend"
          @click="toggle"
        >Watching :)</v-btn>
        <FormulateInput v-if="watchFriendState.loading" type="button" disabled>
          Loading
          <v-progress-circular size="20" color="white" indeterminate style="margin-left:6px;"></v-progress-circular>
        </FormulateInput>
      </div>
      <div v-else>
        <v-btn disabled>This is you</v-btn>
      </div>
      <br />
      <!-- <div class="rank-tiles">
        <div class="rank-tile dragon">
          <img src="@/assets/img/tier/dragon.svg" width="100px" />
        </div>
        <div class="rank-tile unicorn">
          <img src="@/assets/img/tier/unicorn.svg" width="100px" />
        </div>
      </div>-->
      <div v-if="!userRankingsState.loading &&  !userRankingsState.error" class="chart">
        <v-tabs color="deep-purple accent-4" right>
          <v-tab>All</v-tab>
          <v-tab>Physics</v-tab>
          <v-tab>Maths</v-tab>
          <v-tab>Chemistry</v-tab>

          <v-tab-item>
            <chart :ratinghistory="userRankingsState.ratingHistory" category="all"></chart>
          </v-tab-item>
          <v-tab-item>
            <chart :ratinghistory="userRankingsState.ratingHistory" category="physics"></chart>
          </v-tab-item>
          <v-tab-item>
            <chart :ratinghistory="userRankingsState.ratingHistory" category="maths"></chart>
          </v-tab-item>
          <v-tab-item>
            <chart :ratinghistory="userRankingsState.ratingHistory" category="chemistry"></chart>
          </v-tab-item>
        </v-tabs>
      </div>
    </div>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Chart from "./views/Chart.vue";
import { appName } from "@/env";
import { readUserProfile, readIsLoggedIn } from "../../store/main/getters";
import { dispatchUserLogOut } from "../../store/main/actions";
import {
  readUserProfileState,
  readAddToWatchlistyState,
  readUserRatingHistoryState
} from "@/store/user/getters";
import {
  dispatchGetUserProfile,
  dispatchWatchToggle,
  dispatchGetUserRankings
} from "@/store/user/actions";
import Menu from "@/components/Menu.vue";
import {
  commitAddNotification,
  commitRemoveNotification
} from "../../store/main/mutations";
import Error from "@/components/Error.vue";

@Component({
  components: {
    Menu,
    Chart,
    Error
  }
})
export default class Profile extends Vue {
  public get username() {
    if (this.$route.params["username"]) {
      return this.$route.params["username"];
    } else return (this.userProfile as any)["username"];
  }
  public get watchFriendState() {
    return readAddToWatchlistyState(this.$store);
  }
  public get userProfileState() {
    return readUserProfileState(this.$store) as any;
  }
  public get userRankingsState() {
    return readUserRatingHistoryState(this.$store);
  }
  public async beforeMount() {
    dispatchGetUserProfile(this.$store, this.username);
    dispatchGetUserRankings(this.$store, this.username);
  }
  public get userProfile() {
    return readUserProfile(this.$store);
  }
  public get isLoggedIn() {
    return readIsLoggedIn(this.$store);
  }
  public async logout() {
    await dispatchUserLogOut(this.$store);
  }
  public async toggle() {
    await dispatchWatchToggle(this.$store, {
      username: this.userProfileState.user.username,
      value: !this.userProfileState.user.is_friend
    });
    const notif = {
      content: this.watchFriendState.error
        ? "Error encountered"
        : "Watch toggled",
      color: this.watchFriendState.error ? "danger" : "success"
    };
    commitAddNotification(this.$store, notif);
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    commitRemoveNotification(this.$store, notif);
  }
  public back() {
    this.$router.go(-1);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/css/global.scss";
.a-nav-bar {
  background-color: #f5f5f5;
  z-index: 1;
  padding-top: 70px;
}
.username {
  font-size: 20px;
  color: $xDark;
  font-weight: bold;
}
.subject {
  margin: 0 50px;
}
.bio {
  font-size: 15px;
  color: grey;
  padding: 10px;
}
.biodata {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}
.chart {
  margin-top: 100px;
  width: 60vw;
  @include lg {
    width: 90vw;
  }
  height: 60vh;
}
.rank-tile {
  padding: 30px 20px;
  background-color: rgb(251, 227, 92);
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 0 20px 0 rgb(124, 124, 124);
}
.unicorn {
  background-color: rgb(235, 235, 235);
}
.rank-tiles {
  display: flex;
  color: rgb(208, 255, 255);
}
</style>
