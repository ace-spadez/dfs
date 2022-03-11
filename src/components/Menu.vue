<template>
<v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <img v-if="userProfile.profile_image==null"
            v-on="on"
            v-bind="attrs"
            class="profile-image"
              src='@/assets/img/Intersect.png'
            width="35px"
            height="35px"
            style="object-fit:cover;border-radius:50%;"

          />
             <img v-if="userProfile.profile_image!=null"
            v-on="on"
            v-bind="attrs"
            class="profile-image"
              :src='userProfile.profile_image'
            height="35px"
            width="35px"
            style="object-fit:cover;border-radius:50%;"

          />
        </template>

        <div class="dropdown" style="background-color:white;">
          <div class="profile-info">
            <!-- <v-spacer></v-spacer> -->

            <span v-if="isLoggedIn" class="profile-name">
              {{ userProfile.username }}
            </span>
            <img v-if="userProfile.profile_image==null"
              class="profile-image"
              src='@/assets/img/Intersect.png'
              width="70px"
              height="70px"
            style="object-fit:cover;border-radius:50%;"
            />
            <img v-if="userProfile.profile_image!=null"
              class="profile-image"
              :src="userProfile.profile_image"
              height="70px"
              width="70px"
            style="object-fit:cover;border-radius:50%;"
            />
          </div>

          <v-layout column fill-height>
            <v-list>
              <v-list-item class="v-list-item" to="/self/profile">
                <v-list-item-action>
                  <v-img 
                  src="@/assets/img/profile-user.png"
                  ></v-img>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="v-list-item" to="">
                <v-list-item-action>
                  <v-img src="@/assets/img/analysis.png"></v-img>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Analysis</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="v-list-item" to="">
                <v-list-item-action>
                  <v-img src="@/assets/img/settings.png"></v-img>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Settings</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="logout" class="v-list-item">
                <v-list-item-action>
                  <v-img src="@/assets/img/logout.png"></v-img>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Log out</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-layout>
        </div>
      </v-menu>
  
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Contest } from "@/interfaces";
import { getMonth } from "@/utils";
import {dispatchUserLogOut} from '@/store/main/actions'
import {readUserProfile,readIsLoggedIn} from '@/store/main/getters'
@Component
export default class Menu extends Vue {
    public async logout() {
  
    await dispatchUserLogOut(this.$store);
  }
    public get userProfile() {
   
    return readUserProfile(this.$store);
  }
  public get isLoggedIn() {
    return readIsLoggedIn(this.$store);
  }
}
</script>


<style scoped lang="scss">
@import "@/assets/css/global.scss";

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

</style>