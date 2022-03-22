<template>
  <v-main>
    <!-- <Navbar></Navbar> -->
    <!-- <div> -->
    <v-app-bar color="#fafafa" elevation="4" app>
      <!-- <v-toolbar-side-icon @click.stop="switchShowDrawer"> -->
      <v-list-item-action>
        <v-img @click.stop="switchShowDrawer" src="@/assets/img/menu.png"></v-img>
      </v-list-item-action>

      <!-- <img src="@/assets/img/logo.png" width="35px" /> -->
      <!-- </v-toolbar-side-icon> -->
      <div @click="moveToHome" class="v-toolbar-title">
        {{ appName }}
        <sup class="beta">BETA</sup>
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <!-- <span class="search-s">
        <span>
          <img src="@/assets/img/loupe.svg" width="15px" height="15px" />
        </span>
        <span style="marginLeft:5px;font-size:20px;">Search</span>
      </span> -->
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn" class="profile-name">{{ userProfile.username }}</div>

      <Menu></Menu>
    </v-app-bar>

    <v-navigation-drawer
      class="a-nav-bar"
      fixed
      floating
      :mini-variant="miniDrawer"
      v-model="showDrawer"
      elevation="2"
      main
    >
      <v-layout column fill-height>
        <v-list>
          <v-list-item
            :class="
              currentRoute == '/home/main'
                ? 'v-list-item highlight'
                : 'v-list-item'
            "
            to="/home/main"
          >
            <v-list-item-action>
              <v-img src="@/assets/img/home.png"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :class="currentRoute == '/home/main' ? 'highlight' : ''">Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :class="
              currentRoute == '/home/rankings'
                ? 'v-list-item highlight'
                : 'v-list-item'
            "
            to="/home/rankings"
          >
            <v-list-item-action>
              <v-img src="@/assets/img/ratings.png"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                :class="currentRoute == '/home/rankings' ? 'highlight' : ''"
              >Rankings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :class="
              currentRoute == '/home/problemsets'
                ? 'v-list-item highlight'
                : 'v-list-item'
            "
            to="/home/problemsets"
          >
            <v-list-item-action>
              <v-img src="@/assets/img/test.png"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                :class="currentRoute == '/home/problemsets' ? 'highlight' : ''"
              >Problemsets</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :class="
              currentRoute == '/home/contests'
                ? 'v-list-item highlight'
                : 'v-list-item'
            "
            to="/home/contests"
          >
            <v-list-item-action>
              <v-img src="@/assets/img/quiz.png"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                :class="currentRoute == '/home/contests' ? 'highlight' : ''"
              >Contests</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :class="
              currentRoute == '/home/quadrant'
                ? 'v-list-item highlight'
                : 'v-list-item'
            "
            to="/home/quadrant"
          >
            <v-list-item-action>
              <v-img src="@/assets/img/quadrant.png"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                :class="currentRoute == '/home/quadrant' ? 'highlight' : ''"
              >Quadrant</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="v-list-item-prime" to="/home/prime">
            <v-list-item-action>
              <v-img src="@/assets/img/crown.png"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="v-list-item-prime">Prime</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-spacer></v-spacer>
        <v-list>
          <v-list-item @click="switchMiniDrawer">
            <v-list-item-action>
              <v-icon v-html="miniDrawer ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Collapse</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
    <v-main
      :class="
        !showDrawer
          ? 'v-content margin0'
          : miniDrawer
          ? 'v-content margin50'
          : 'v-content margin300'
      "
    >
      <router-view></router-view>
    </v-main>
  </v-main>
  <!-- </div> -->
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { appName } from "@/env";
import {
  readDashboardMiniDrawer,
  readDashboardShowDrawer,
  readHasAdminAccess,
  readUserProfile,
  readIsLoggedIn
} from "@/store/main/getters";
import {
  commitSetDashboardShowDrawer,
  commitSetDashboardMiniDrawer
} from "@/store/main/mutations";
import { dispatchUserLogOut } from "@/store/main/actions";
import Navbar from "@/components/Navbar.vue";
import Menu from "@/components/Menu.vue";

const routeGuardMain = async (to, from, next) => {
  if (to.path === "/home") {
    next("/home/main");
  } else {
    next();
  }
};

@Component({
  components: {
    Navbar,
    Menu
  }
})
export default class Main extends Vue {
  public appName = appName;
  public search = "";

  public moveToHome() {
    console.log("here")
    if (this.currentRoute !== '/home/main' ) {
      this.$router.push('/home/main')
    }
  }

  public beforeRouteEnter(to, from, next) {
    routeGuardMain(to, from, next);
  }

  public beforeRouteUpdate(to, from, next) {
    routeGuardMain(to, from, next);
  }

  get currentRoute() {
    return this.$route.path;
  }
  public submit() {}
  public get isLoggedIn() {
    return readIsLoggedIn(this.$store);
  }
  public get userProfile() {
    return readUserProfile(this.$store);
  }
  public onchange() {}
  public getMargin() {
    console.log(
      `margin-left:${
        !this.showDrawer ? "0px" : this.miniDrawer ? "50px" : "300px"
      }`
    );
    return `margin-left:${
      !this.showDrawer ? "0px" : this.miniDrawer ? "50px" : "300px"
    }`;
  }

  get miniDrawer() {
    return readDashboardMiniDrawer(this.$store);
  }

  get showDrawer() {
    return readDashboardShowDrawer(this.$store);
  }

  public xshowDrawer(value) {
    commitSetDashboardShowDrawer(this.$store, value);
  }

  public switchShowDrawer() {
    commitSetDashboardShowDrawer(
      this.$store,
      !readDashboardShowDrawer(this.$store)
    );
  }

  public switchMiniDrawer() {
    commitSetDashboardMiniDrawer(
      this.$store,
      !readDashboardMiniDrawer(this.$store)
    );
  }
  public beforeMount(){
    if(this.$isMobile()) this.xshowDrawer(false)
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

.v-list-item {
  color: #686868;
}
.v-list-item-prime {
  color: rgb(64, 146, 223);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
}
.beta {
  font-family: "B612";
  color: black;
  font-size:12px;
  padding: 5px;
  border-radius: 5px;
 background: rgb(98,204,167);
background: linear-gradient(90deg, rgba(98,204,167,1) 3%, rgba(0,255,162,1) 57%);
}
.v-toolbar-title {
  font-family: "valorant";
  // font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  // color: $color;
  color: $xDark;
  margin-left: 10px;
  font-size: 1.4em;
}

.profile-name {
  color: #686868;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  @include sm {
    display: none;
  }
}
.profile-image {
  margin-left: 10px;
}
.v-content {
  // background-color: black;
  padding: 0px !important;
  // height:50px;
  // width:400px;
}
.dropdown {
  width: 256px;

  padding-top: 20px;
  padding-bottom: 20px;
}
.profile-info {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}
.margin300 {
  margin-left: 300px;
  @include lg {
    margin-left: 0px;
  }
}
.margin50 {
  margin-left: 50px;
  @include lg {
    margin-left: 0px;
  }
}
.margin0 {
  margin-left: 0px;
  @include lg {
    margin-left: 0px;
  }
}
.highlight {
  background-color: $xSemiDark;
  color: $gray5;
}
.search {
  width: 400px;
  background-color: $gray6;
  height: 40px;
  border-radius: 0 20px 20px 0px;
  padding: 0 0 0 10px;
  &:focus {
    border: none;
  }
  @include lg {
    display: none;
  }
}
.search-s {
  display: none;
  @include lg {
    display: block;
  }
}
#searchtype {
  background-color: $gray5;

  height: 40px;
  border-radius: 20px 0 0 20px;
  padding: 0 10px 0 20px;
  color: $gray3;
  font-weight: bold;
  @include lg {
    display: none;
  }
}
</style>
