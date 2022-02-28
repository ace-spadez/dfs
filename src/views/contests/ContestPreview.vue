<template>
  <v-main>
    <v-app-bar color="#fafafa" elevation="0" app>
      <v-list-item-action>
        <v-img src="@/assets/img/left-arrow.svg" @click.prevent='goback' width="30px"></v-img>
      </v-list-item-action>
    </v-app-bar>
    <div v-if="contest == null">
      <v-progress-circular></v-progress-circular>
    </div>
    <div v-else class="contest-pre-container">
      <div class="contest-pre-main">
         <div class="contest-name"> {{contest.contest_name}}</div>
            <router-link
            :to="{
              name: 'contest',
              params: { id: contest.id },
              query: contest,
            }"
          >
         <div>
         <button class="wrap-item-btn">Apply

        <img src="@/assets/img/information.svg" width="15px"/>

         </button></div></router-link>
         <div class="resources">

         </div>
      </div>
      <div class="contest-pre-side">
           <div class="rankings-head">Authors</div>
      <div class="rankings-main">
      </div>
 <div class="rankings-head">Rankings</div>
      <div class="rankings-main">
      </div>


      </div>
    </div>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { appName } from "@/env";

import { Contest } from "@/interfaces";
function stringify(str: string) {
  console.log(str);
  if (str == "undefined") return "";
  return str;
}
@Component
export default class ContestPreview extends Vue {
  public get contest() {
    // const query = this.$route.query;
    // const contest: Contest = {
    //   id: String(query.id),
    //   contest_name: String(query.contest_name),
    //   category: stringify(String(query.category)),
    //   contest_duration: Number(query.contest_duration),
    //   difficulty: stringify(String(query.difficulty)),
    //   contest_total_questions: Number(query.contest_total_questions),
    // };
    // return contest;
    return 0
  }
  public goback(){
    this.$router.go(-1);
  }
}
</script>

<style lang='scss'>
@import "@/assets/css/global.scss";
.contest-pre-container {
  display: flex;  width: 100%;
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
    @include sm{
 padding-left: 10px;
  padding-right: 10px;
  }
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}
.contest-pre-side {
   min-width:500px;
  background-color: $xMedium;
  padding: 50px 30px 0 30px;
     @include xl{
     display : none;
  }

}
.contest-name{
    font-family: 'B612';
    font-size: 20px;
    font-weight: bold;
}
.rankings-main{
background-color: $xDark;
margin: 20px 0 0 0;
width: 100%;
height: 300px;
}
.rankings-head{
    margin-top: 20px;
  color: white;
  font-family: 'b612';
  font-weight: bold;

}
.resources{
    background-color: $xMedium;
    height : 500px;
    margin-top: 50px;
    width: 60vw;

     @include xl{
    width: 86vw;
  }
}
</style>