<template>
  <div class="main-container" >
  <!-- {{standings}} -->
    <div class="wrap" >

          <!-- <router-link
            :to="{
              name: 'contest',
              params: { uuid: contest.uuid },
  
            }"
          > -->
           
        
        <ContestItem v-for="(contest, index) in contests" :key="index" class="wrap-item" :contest="contest" :ind="index"></ContestItem>
          <!-- </router-link> -->


    </div>
    <v-spacer></v-spacer>
    <div class="right-space">
      <div class="rankings-head">Rankings</div>
      <div class="rankings-main">
        <div v-for='(standing,ind) in standings'  :key='ind' class='ranking-main-item'>

          <span class='raking-main-item-logo'>
            <img  src="@/assets/img/tier/dragon.svg"  width='30px'  height='30px' style='filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);'/>
          </span>
          <span class='ranking-main-item-name' > {{standing['username']}}  ·  <span style='color:grey'>  {{standing['rating']['r_all']}} </span> #{{ind+1}}</span>
        </div>
        

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { appName } from "@/env";
import { readHomeContests,readHomeStandings } from "@/store/home/getters";
import ContestItem from '@/components/ContestItem.vue'
import { dispatchHomeGetContests ,dispatchApplyContests,dispatchHomeStandings} from "@/store/home/actions";
import { Contest } from "@/interfaces";
import { readUserProfile } from '../../../store/main/getters';
@Component({
  components: {
    ContestItem,
  },
})
export default class HomeMain extends Vue {
  public get contests() {
    return readHomeContests(this.$store);
  }
  public get standings(){
    return readHomeStandings(this.$store)
  }

  public beforeCreate() {
    this.$forceUpdate();
    dispatchHomeGetContests(this.$store);
    dispatchHomeStandings(this.$store);
  }
  public beforeMount(){
    console.log('created home main')

    this.$forceUpdate();
  }

  public get profile(){
    console.log('profile.username',(readUserProfile(this.$store)as any).username)
    return readUserProfile(this.$store)
  }

}
</script>

<style scoped lang="scss">
@import "@/assets/css/global.scss";
.main-container{
  display: flex;
  width: 100%;
  height: 100%;
}
.right-space{
  min-width:600px;
  box-shadow: 0 0 12px 0 grey;
  border-radius:10px;
  background-color: $xMedium;
  float:right;
  padding: 50px 0px 0 0px;
     @include xl{
     display : none;
  }
 
  

}
.ranking-main-item{
  margin-left:20px;
  margin-top: 15px;
  display: flex;
  // justify-content: center;
  align-items: center;
}
.ranking-main-item-name{
  color:white;
  font-weight: bold;
  font-family: 'montserrat';
  margin-left:20px;

}
.rankings-main{
background-color: $xDark;
border-radius: 0 0 10px 10px;
margin: 10px 0px 0 0px;
width: 100%;
// height: 300px;
padding-top:10px;
}
.rankings-head{
  margin-left:20px;
  color: white;
  font-family: 'b612';
  font-weight: bold;

}
.wrap {
  padding-left: 20px;
  padding-right: 20px;
    @include sm{
 padding-left: 0px;
  padding-right: 0px;
  }
  /* padding-top:20px; */
  display: flex;
  flex-wrap: wrap;
}
.wrap-item {
  // width: 40vw;
  width:296px;
  height: 220px;
  margin-top: 20px;
  margin-right:20px;
  // margin-right: 40px;
  padding: 10px;
   @include sm{
     margin-right:0px;
  width:100vw;
  border-radius: 0px;


  }
  box-shadow: 1px 1px 20px 3px rgb(226, 224, 224);
  border-radius: 10px;
}


</style>