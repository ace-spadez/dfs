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

     <br/>
     <br/>
 <v-simple-table >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">All</th>
                    <th class="text-left">Machine Learning</th>
                    <th class="text-left">Artificial Intelligence</th>
                    <th class="text-left">Deep Learning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <UserPreview :standing="selfProfileState.user"></UserPreview>
                    </td>
                    <td>{{ selfProfileState.user.rating.r_all?selfProfileState.user.rating.r_all:'-' }}</td>
                    <td>{{ selfProfileState.user.rating.r_p?selfProfileState.user.rating.r_p:'-' }}</td>
                    <td>{{ selfProfileState.user.rating.r_c?selfProfileState.user.rating.r_c:'-' }}</td>
                    <td>{{ selfProfileState.user.rating.r_m?selfProfileState.user.rating.r_m:'-' }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
 <div class="chart"  v-if="!userRankingsState.loading &&  !userRankingsState.error">
    <v-tabs color="deep-purple accent-4" right>
          <v-tab>All</v-tab>
          <v-tab>Machine Learning</v-tab>
          <v-tab>Deep Learning</v-tab>
          <v-tab>Artificial Intelligence</v-tab>

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
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Contest } from "@/interfaces";
import { getMonth } from "@/utils";
import Chart from './Chart.vue'
import UserPreview from '@/components/UserPreview.vue';
import {
  readUserProfile,
} from "@/store/main/getters";
import { readUserProfileState, readUserRatingHistoryState } from '../../../store/user/getters';
import { dispatchGetUserProfile, dispatchGetUserRankings } from '../../../store/user/actions';
import Error from '@/components/Error.vue'
@Component({
  components:{
    Chart,Error,UserPreview
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
    dispatchGetUserRankings(this.$store, this.userProfile.username)
  }
    public get userRankingsState() {
    return readUserRatingHistoryState(this.$store);
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