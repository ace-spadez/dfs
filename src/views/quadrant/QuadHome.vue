<template>
  <v-main>
    
    <v-app-bar color="#fafafa" elevation="4" app>
          <v-list-item-action @click.prevent="back">
        <img
          src="@/assets/img/left-arrow.svg"
          width="30px"
       />
      </v-list-item-action>
  

      <img src="@/assets/img/logo.png" width="35px" />
      <div class="v-toolbar-title">Quadrant</div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
       

      <v-spacer></v-spacer>
      <div v-if="isLoggedIn" class="profile-name">
        {{ userProfile.username }}
      </div>

      <Menu></Menu>
    </v-app-bar>

   
    <v-main
      :class="'v-content'"
    >
      <router-view :key="$route.fullPath"> </router-view>
    </v-main>
  </v-main>
  <!-- </div> -->
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { appName } from "@/env";
import { readUserProfile,readIsLoggedIn } from '../../store/main/getters';
import { dispatchUserLogOut } from '../../store/main/actions';
import Menu from '@/components/Menu.vue'

const routeGuardMain = async (to, from, next) => {
  console.log(to.path)
  if (to.path === "/quadrant/" ||to.path==='/quadrant') {
    next("/quadrant/main");
  } else {
    next();
  }
};

@Component({
  components:{
    Menu
  }
})
export default class Main extends Vue {
  public appName = appName;
  public search = '';

  public beforeRouteEnter(to, from, next) {
    routeGuardMain(to, from, next);
  }

  public beforeRouteUpdate(to, from, next) {
    routeGuardMain(to, from, next);
  }

  get currentRoute() {
    return this.$route.path;
  }
    public get userProfile() {
    let profile = readUserProfile(this.$store)
    console.log("userProfile",profile)
    if(profile!=null)
    console.log("profile image",profile.profile_image)
    return readUserProfile(this.$store);
    }
        public get isLoggedIn() {
    return readIsLoggedIn(this.$store);
  }
  public async logout() {
    await dispatchUserLogOut(this.$store);
  }  

  public back(){
    this.$router.go(-1);
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/css/global.scss";

.a-nav-bar {
  background-color: #f5f5f5;
  z-index:1;
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

.v-toolbar-title {
  font-family: "valorant";
  // font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  // color: $color;
  color: $xDark;
  margin-left: 10px;
  font-size: 1.5em;
}

.profile-name {
  color: #686868;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
     @include sm{
     display : none;
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

.highlight {
  background-color: $xSemiDark;
  color: $gray5;
}


</style>
