from

<template>
<div class="quadcontestitem">
        <router-link :to="{name:'quadcontest',params:{id:contest.uuid}}">

<div class="wrap-item-head">
          <div>{{ contest.name }}</div>
          
</div>
<div class="chips-container">
          <span v-for="(chip,index) in contest.contest_chips" :key="index" class="wrap-item-chip">{{chip}}</span>
</div>
<div class="wrap-item-description">{{contest.description.slice(0,70)}} ...</div>

        <div class="wrap-item-body">
          <span class="timestamp">
{{getdate(contest.target_date)}} {{getM(getMonth(contest.target_date))}} {{getyear(contest.target_date)}}<br/>
{{gettime(contest.target_date)}} {{contest.duration}} min

</span>
          <v-spacer></v-spacer>
          <router-link
            :to="{
              name: 'quadcontest',
              params: { uuid: contest.uuid },
  
            }"
          >
          

            <span v-if=" contest.is_applied==false">
              <button class="wrap-item-btn" @click.stop="applyContest">Request Access</button>
            </span>
        <span v-if=" contest.is_applied==true && contest.is_attempted==false">
              <button class="wrap-item-btn-applied">Requested</button>
            </span>
              <span v-if="contest.is_applied==true && contest.is_attempted==true">
              <button class="wrap-item-btn-attempted">Accepted</button>
            </span>
            <!-- <div v-if="contest.contest_status=='P'"> -->
              <button style="margin-left:10px;" v-if="contest.contest_status=='P'" class="wrap-item-btn-done">Proposed</button>
            <!-- </div> -->
          </router-link>
        </div>
        </router-link>
</div>
</template>

<script lang="ts">
import moment from 'moment'
import { dispatchHomeGetContests ,dispatchApplyContests} from "@/store/home/actions";

import { Component, Vue, Watch,Prop } from "vue-property-decorator";
import {Contest} from '@/interfaces'
import {getMonth} from '@/utils'
@Component
export default class ContestItem extends Vue {
@Prop() contest:Contest|undefined;
@Prop() ind:number|undefined;
public getM(str:string){
    return getMonth(Number(str))

}
public getyear(t:Date){
    return (moment(t).local().format("YYYY"))

}
public getdate(t:Date){
    return (moment(t).local().format("DD"))

}
public getMonth(t:Date){
    return (moment(t).local().format("MM"))

}
public gettime(t:Date){
    return (moment(t).local().format("HH:mm"))

}
public applyContest(){
//   if(this.contest!=undefined)
//   dispatchApplyContests(this.$store,{'uuid':this.contest['uuid'],'id':this.ind});
}
}

</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";


.wrap-item-btn {
  color: rgb(255, 255, 255);
  background:  $green2;;
  padding: 6px 30px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  text-decoration: none;
  border-radius: 2px;
  box-shadow: 0px 0px 12px 0px rgb(180, 179, 179);
  margin-top: 10px;

  font-size: 13px;
}
.chips-container{
  display:flex;
  flex-wrap: wrap;
}
.wrap-item-btn-applied {
  color:$green2;
  background:  white;
  padding: 6px 30px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  text-decoration: none;
  border-radius: 2px;
  box-shadow: 0px 0px 12px 0px rgb(180, 179, 179);
  margin-top: 10px;
  font-size: 13px;
}
.quadcontestitem a{
  text-decoration: none;

}
.wrap-item-btn-attempted {
  color: rgb(255, 255, 255);
  background:  $green2;;
  padding: 6px 30px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  text-decoration: none;
  border-radius: 2px;
  box-shadow: 0px 0px 12px 0px rgb(180, 179, 179);
  margin-top: 10px;

  font-size: 13px;
}
.wrap-item-btn-done {
  color: rgb(255, 255, 255);
  background:  rgb(216, 214, 214);
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
.wrap-item-chip{
    color: #696868;
    font-weight: bold;
  background-color: rgb(226, 226, 223);
  padding: 2px 10px;
  margin:3px 10px 0 0;
//   width:100px;
  border-radius:10px;
  font-size:10px;
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
  color:rgb(97, 95, 95);
  font-family:'Montserrat';
//   background-color: rgb(247, 247, 242);
    // border: 1px solid rgb(194, 192, 192);
//   padding: 2px 10px;
  border-radius:10px;
  font-size:14px;
  font-weight: bold;
}
.wrap-item-description{
    font-size:14px;
    color: rgb(190, 188, 188);
}
</style>
