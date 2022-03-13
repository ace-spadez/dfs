<template>
 <v-main>
     <div v-if="selfProfileState.error"><Error></Error></div>
       <div v-if="selfProfileState.loading" class="biodata">
        <v-skeleton-loader
        type="image"
        width="150px"
        height="150px"
        style="object-fit:cover;border-radius:50%;"
      ></v-skeleton-loader>
           <v-skeleton-loader
        type="list-item"
        width="250px"
        style="margin-top:20px;"
           ></v-skeleton-loader>

            <v-skeleton-loader
        type="card"
        width="550px"
        style="margin-top:20px;"
           ></v-skeleton-loader>
    </div>
     <div v-if="selfProfileState.user" class="biodata">
        <img v-if="userProfile.profile_image==null"
        
            class="profile-image"
              src='@/assets/img/Intersect.png'
            height="150px"
            width="150px"
            style="object-fit:cover;border-radius:50%;"

          />
             <img v-if="userProfile.profile_image!=null"
         
            class="profile-image"
              :src='userProfile.profile_image'
            height="150px"
            style="object-fit:cover;border-radius:50%;"
            width="150px"

          />
          <div class="username">{{selfProfileState.user.username}}</div>
          <div class="bio">{{selfProfileState.user.bio}}</div>
     <br/>

     <v-btn outlined :to="{name:'editprofile'}">Edit</v-btn>
 <div class="chart">
     <chart ></chart>
     </div>
      </div>
    
     <br/>
 </v-main>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Contest } from "@/interfaces";
import { getMonth } from "@/utils";
import Chart from './Chart.vue'

import {
  readUserProfile,
} from "@/store/main/getters";
import { readUserProfileState } from '../../../store/user/getters';
import { dispatchGetUserProfile } from '../../../store/user/actions';
import Error from '@/components/Error.vue'
@Component({
  components:{
    Chart,Error
  }
})
export default class SelfProfile extends Vue {
  public get userProfile(){
      return  readUserProfile(this.$store) as any
  }
  public get selfProfileState(){

      return readUserProfileState(this.$store)
  }
  public  beforeMount(){
      dispatchGetUserProfile(this.$store,this.userProfile.username)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.username{
  font-size:20px;
  color: $xDark;
  font-weight: bold;
}
.bio{
  font-size:15px;
  color:grey;
  padding:0 10px;
}
.biodata{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.chart{
  margin-top:100px;
  width: 60vw;
  height: 60vh;
   @include lg{
     width : 90vw;
  }
}
</style>