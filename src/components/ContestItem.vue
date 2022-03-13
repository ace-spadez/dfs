<template>
  <div :class="countdownOngoing!=''?'allgreen':''">
    <div class="wrap-item-head">
      <div>{{ contest.name }}</div>
    </div>
    <div class="chips-container">
      <span
        v-for="(chip,index) in contest.contest_chips"
        :key="index"
        class="wrap-item-chip"
      >{{chip}}</span>
      <span v-if=" countdown!=''" class="countdown">{{countdown}}</span>
      <span v-if="countdownOngoing!=''" class="countdownOngoing">Active: {{countdownOngoing}}</span>
    </div>

    <div class="wrap-item-description">{{contest.description.slice(0,70)}} ...</div>

    <div class="wrap-item-body">
      <span class="timestamp">
        {{contest.target_date.slice(8,10)}} {{getM(contest.target_date.slice(5,7))}} {{contest.target_date.slice(0,4)}}
        <br />
        {{contest.target_date.slice(11,16)}} {{contest.duration}} min
      </span>
      <v-spacer></v-spacer>
      <router-link
        :to="{
              name: 'contest',
              params: { id: contest.uuid },
  
            }"
      >
        <div v-if="contest.is_applied==false && countdown!=''">
          <button class="wrap-item-btn" @click.stop="applyContest">Remind Me</button>
        </div>
         <div v-if="countdownOngoing!=''">
          <button class="wrap-item-btn" @click.stop="applyContest">Enter Contest</button>
        </div>
        <div v-if="contest.is_applied==true && countdown!=''">
          <button class="wrap-item-btn-applied">Reminder On</button>
        </div>
        <div v-if="contest.status=='Passed' && countdown=='' && countdownOngoing==''">
          <button class="wrap-item-btn-done">Contest Over</button>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {
  dispatchHomeGetContests,
  dispatchApplyContests
} from "@/store/home/actions";

import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Contest } from "@/interfaces";
import { getMonth } from "@/utils";
@Component
export default class ContestItem extends Vue {
  @Prop() contest: Contest | undefined;
  @Prop() ind: number | undefined;

  countdown: string = "";
  countdownOngoing: string = "";
  public getM(str: string) {
    return getMonth(Number(str));
  }
  public applyContest() {
    if (this.contest != undefined)
      dispatchApplyContests(this.$store, {
        uuid: this.contest["uuid"],
        id: this.ind
      });
  }
  public getDurationData(millis) {
    var now = new Date().getTime() + +(5.5 * 60 * 60 * 1000);

    var distance = millis - now;

    if (distance < 0) return -1;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return {
      days,
      hours,
      minutes,
      seconds
    };
  }

  public runOnce(){
    const countDownDate = Date.parse((this.contest as any).target_date);
      const object = this.getDurationData(countDownDate);

      if (object != -1)
        this.countdown =
          object.days +
          "d " +
          object.hours +
          "h " +
          object.minutes +
          "m "
          //  +
          // object.seconds +
          // "s ";
      else {
        this.countdown = "";
        const endDate = Date.parse((this.contest as any).end_date);
        const durationData = this.getDurationData(endDate);
        if (durationData != -1)
          this.countdownOngoing =
            durationData.hours +
            "h " +
            durationData.minutes +
            "m "
            //  +
            // durationData.seconds +
            // "s ";
        else {
          this.countdownOngoing = "";
        }
      }
  }
  public getime() {
    this.runOnce();
    var x = setInterval(() => {
      const countDownDate = Date.parse((this.contest as any).target_date);
      const object = this.getDurationData(countDownDate);

      if (object != -1)
        this.countdown =
          object.days +
          "d " +
          object.hours +
          "h " +
          object.minutes +
          "m ";
          //  +
          // object.seconds +
          // "s ";
      else {
        this.countdown = "";
        const endDate = Date.parse((this.contest as any).end_date);
        const durationData = this.getDurationData(endDate);
        if (durationData != -1)
          this.countdownOngoing =
            durationData.hours +
            "h " +
            durationData.minutes +
            "m ";
            //  +
            // durationData.seconds +
            // "s ";
        else {
          clearInterval(x);
          this.countdownOngoing = "";
        }
      }
    }, 60*1000);
  }

  public created() {
    this.getime();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

.wrap-item-btn {
  color: rgb(255, 255, 255);
  background: $green2;
  padding: 6px 30px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  text-decoration: none;
  border-radius: 2px;
  box-shadow: 0px 0px 12px 0px rgb(180, 179, 179);
  margin-top: 10px;

  font-size: 13px;
}
.chips-container {
  display: flex;
  flex-wrap: wrap;
}
.wrap-item-btn-applied {
  color: $green2;
  background: rgb(237, 255, 246);
  padding: 6px 30px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  text-decoration: none;
  border-radius: 12px;
  // box-shadow: 0px 0px 12px 0px rgb(180, 179, 179);
  margin-top: 10px;
  font-size: 13px;
}
.allgreen {
  background-color: rgb(234, 255, 234);
}
.wrap-item-btn-done {
  color: rgb(255, 255, 255);
  background: rgb(216, 214, 214);
  padding: 6px 30px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 10px;

  // box-shadow: 0px 0px 12px 0px rgb(180, 179, 179);
  //   margin: 10px;
  font-size: 13px;
}
.wrap-item-chip {
  color: #696868;
  font-weight: bold;
  background-color: rgb(226, 226, 223);
  padding: 2px 10px;
  margin: 3px 10px 0 0;
  //   width:100px;
  border-radius: 10px;
  font-size: 10px;
}
.wrap-item-head {
  font-size: 1.2em;
  //   padding: 10px;
  width: 100%;
  //   height: 50px;
  align-items: center;
  color: $xDark;
  font-weight: bold;
}
.category {
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.wrap-item-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.timestamp {
  //   margin-right: 10px;
  margin-top: 10px;
  color: rgb(97, 95, 95);
  font-family: "Montserrat";
  //   background-color: rgb(247, 247, 242);
  // border: 1px solid rgb(194, 192, 192);
  //   padding: 2px 10px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
}
.wrap-item-description {
  font-size: 14px;
  color: rgb(190, 188, 188);
}
.countdown {
  padding: 2px 10px;
  font-size: 10px;
  background-color: $xMedium;
  // background-color:grey;
  font-weight: bold;
  color: rgb(216, 216, 216);
  border-radius: 10px;
  margin: 3px 10px 0 0;

  font-family: "Montserrat";
  box-shadow: 0 0 10px 0 rgb(184, 184, 184);
}
.countdownOngoing {
  padding: 2px 10px;
  font-size: 10px;
  background-color: $green2;
  // background-color:grey;
  font-weight: bold;
  color: rgb(216, 216, 216);
  border-radius: 10px;
  margin: 3px 10px 0 0;

  font-family: "Montserrat";
  box-shadow: 0 0 10px 0 rgb(184, 184, 184);
}
</style>
