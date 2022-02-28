<template>
  <div class="main-container">
      <div style="margin: 20px 20px 20px 20px">
      <router-link to="/quadrant/addcontest/"><v-btn fab>
          <v-icon>add</v-icon>
      </v-btn>
      </router-link>
      </div>
      <br/>
    <div class="wrap">

 
        <QuadContestItem v-for="(contest, index) in contests" :key="index" class="wrap-item" :contest="contest" :ind="index"></QuadContestItem>


    </div>
    
    </div>
  
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { readQuadrantContestsState } from "@/store/quadrant/getters";
import ContestItem from '@/components/ContestItem.vue'
import QuadContestItem from '@/components/QuadContestItem.vue'
import { dispatchGetQuadrantContests} from "@/store/quadrant/actions";
import { Contest } from "@/interfaces";
@Component({
  components: {
    ContestItem,
    QuadContestItem
  },
})
export default class HomeMain extends Vue {
  public get contests() {
    return readQuadrantContestsState(this.$store).contests
  }


  public beforeCreate() {
    dispatchGetQuadrantContests(this.$store);
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
  width:330px;
  height: 250px;
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