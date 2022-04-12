<template>
  <div id="app">
    <v-app>
      <v-main v-if="loggedIn===null">
        <v-container fill-height>
          <v-layout align-center justify-center>
            <v-flex>
              <div class="auth-loader">
                <v-spacer></v-spacer>
                <!-- <v-progress-circular size="100" indeterminate color="primary"></v-progress-circular> -->
                <div>Checking your browser...</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;"
                  width="200px"
                  height="200px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                >
                  <circle cx="84" cy="50" r="10" fill="#e15b64">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="0.25s"
                      calcMode="spline"
                      keyTimes="0;1"
                      values="10;0"
                      keySplines="0 0.5 0.5 1"
                      begin="0s"
                    />
                    <animate
                      attributeName="fill"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="discrete"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="#e15b64;#abbd81;#f8b26a;#f47e60;#e15b64"
                      begin="0s"
                    />
                  </circle>
                  <circle cx="16" cy="50" r="10" fill="#e15b64">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="0;0;10;10;10"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="0s"
                    />
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="16;16;16;50;84"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="0s"
                    />
                  </circle>
                  <circle cx="50" cy="50" r="10" fill="#f47e60">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="0;0;10;10;10"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.25s"
                    />
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="16;16;16;50;84"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.25s"
                    />
                  </circle>
                  <circle cx="84" cy="50" r="10" fill="#f8b26a">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="0;0;10;10;10"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.5s"
                    />
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="16;16;16;50;84"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.5s"
                    />
                  </circle>
                  <circle cx="16" cy="50" r="10" fill="#abbd81">
                    <animate
                      attributeName="r"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="0;0;10;10;10"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.75s"
                    />
                    <animate
                      attributeName="cx"
                      repeatCount="indefinite"
                      dur="1s"
                      calcMode="spline"
                      keyTimes="0;0.25;0.5;0.75;1"
                      values="16;16;16;50;84"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                      begin="-0.75s"
                    />
                  </circle>
                  <!-- [ldio] generated by https://loading.io/ -->
                </svg>
                <v-spacer></v-spacer>

              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
      <router-view v-else />
      <NotificationsManager></NotificationsManager>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NotificationsManager from "@/components/NotificationsManager.vue";
import { readIsLoggedIn } from "@/store/main/getters";
import { dispatchCheckLoggedIn } from "@/store/main/actions";
@Component({
  components: {
    NotificationsManager
  }
})
export default class App extends Vue {
  get loggedIn() {
    return readIsLoggedIn(this.$store);
  }

  public async created() {
    await dispatchCheckLoggedIn(this.$store);
  }
}
</script>
<style lang='scss'>
@font-face {
  font-family: "valorant";
  src: url("assets/font/valorant.ttf") format("truetype");
}
@import url("https://fonts.googleapis.com/css2?family=B612&family=Montserrat&family=Raleway&display=swap");
@import "../node_modules/@braid/vue-formulate/themes/snow/snow.scss";
@import "../node_modules/mathlive/dist/mathlive.core.css";
@import "../node_modules/mathlive/dist/mathlive.css";
$valoFont: "valorant";
.auth-loader {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  color:grey;
  font-family: 'B612';
}
</style>