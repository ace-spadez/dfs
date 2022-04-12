<template>
  <v-main style="padding-left:50px;">
   
<h2>Update profile</h2>
<br/>
<br/>
    <FormulateForm v-model="profile" @submit="submit" class="form">
           <FormulateInput
              type="image"
              name="profile"
              label="Profile  image"
              help="Select a png, or jpg to upload."
              validation="mime:image/jpeg,image/png,image"
            />
     
         <FormulateInput
              name="bio"
              error-behavior="live"
              label="Bio"
              type="textarea"
            />
    <br />
     <FormulateInput v-if="!patchState.loading" type="submit" ><v-icon>upload</v-icon></FormulateInput>
            <FormulateInput v-if="patchState.loading" type="button" disabled>
              Loading
              <v-progress-circular size="20" color="white" indeterminate style="margin-left:6px;"></v-progress-circular>
            </FormulateInput>
    </FormulateForm>
   
  </v-main>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Contest, IPatchSelf } from "@/interfaces";
import { getMonth } from "@/utils";
import { ImagePicker, imageUploadingStates } from "@nagoos/vue-image-picker";
import { readUserProfile } from "@/store/main/getters";
import { readUserProfileState, readUserProfilePatchState } from "../../../store/user/getters";
import { dispatchGetUserProfile, dispatchPatchSelf } from "../../../store/user/actions";
import { commitAddNotification, commitRemoveNotification } from '../../../store/main/mutations';
@Component
export default class EditProfile extends Vue {
  profile: any = {
    bio: this.userProfile.bio
  };
  images: any;
  public get userProfile() {
    return readUserProfile(this.$store) as any;
  }
  public get patchState(){
     return readUserProfilePatchState(this.$store)
  }
  public get selfProfileState() {
    return readUserProfileState(this.$store);
  }
  public beforeMount() {
    dispatchGetUserProfile(this.$store, this.userProfile.username);
  }
  public async submit() {
  
      const patchSelf:IPatchSelf={
          bio:this.profile.bio,
      }
      if(this.profile.profile)
      patchSelf['profile'] = this.profile.profile.fileList[0];
      console.log('patchself',patchSelf)
      await dispatchPatchSelf(this.$store,patchSelf)
      const notif = {
      content: this.patchState.error
        ? "Error encountered"
        : "Profile Edited",
      color: this.patchState.error ? "danger" : "success"
    };
    commitAddNotification(this.$store, notif);
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    commitRemoveNotification(this.$store, notif);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
h2{
  font-family: 'Montserrat'
}
</style>