<template>
  <v-main>
    
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn" class="profile-name">
        {{ userProfile }}
      </div>
  </v-main>
  <!-- </div> -->
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { appName } from "@/env";
import { readUserProfile,readIsLoggedIn } from '../../store/main/getters';
import { dispatchUserLogOut } from '../../store/main/actions';


@Component
export default class Main extends Vue {
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
}
</script>
