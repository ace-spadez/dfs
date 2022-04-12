<template>
  <div class="main-container">
<div v-if="loginState.loading" class="quadrant-loading"> 
    <v-progress-circular></v-progress-circular>   
  </div>
  <div v-if="loginState.error" class="quadrant-error"> 


      <form>
      
             <v-textarea
          outlined
          name="input-7-4"
          label="Standard Operationg Procedure"
          v-model="sop"
          class="sop"
        ></v-textarea>
      </form>
              <button class="wrap-item-btn" @click.stop="applyQuadrant">
                <span v-if="!postSOP.loading">Apply</span>
                 <v-progress-circular style="margin-left:10px;"
                 v-if="postSOP.loading"
      :size="20"
      color="white"
      indeterminate
    ></v-progress-circular>
              </button>

        </div>
  <div v-if="loginState.message=='Accepted'">
              <router-link to="/quadrant"> <button class="wrap-item-btn">Enter Quadrant</button></router-link>
  </div>
  
    <div v-if="loginState.message=='Applied'">
      <!-- <div class='sop-area'>{{loginState.SOP}}</div> -->
       <form>
      
             <v-textarea
          outlined
          name="input-7-4"

          label="Standard Operationg Procedure"
          v-model="sop"
          class="sop"
        ></v-textarea>
      </form>
              <button class="wrap-item-btn-done">Applied</button>

             <button class="wrap-item-btn" @click.stop="applyQuadrant">
                <span >Update SOP</span>
              <!-- <v-progress-circular v-if="postSOP.loading"></v-progress-circular> -->
                 <v-progress-circular style="margin-left:10px;"
                 v-if="postSOP.loading"
      :size="20"
      color="white"
      indeterminate
    ></v-progress-circular>

              </button>
            
  
  </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { dispatchUserLogOut } from "@/store/main/actions";
import {
  
  readIsLoggedIn,
} from "@/store/main/getters";
import { appName } from "@/env";
import {commitAddNotification,commitRemoveNotification} from '@/store/main/mutations'
import { 
    readLoginState, readQuadrantPostSOP,
 } from "@/store/quadrant/getters";
import ContestItem from '@/components/ContestItem.vue'
import {
    dispatchGetQuadrant,dispatchPostSOP
} from "@/store/quadrant/actions";
import { Contest } from "@/interfaces";
@Component
export default class HomeMain extends Vue {
  sop:string = this.loginState && this.loginState.SOP?this.loginState.SOP:''
public get loginState(){
    return readLoginState(this.$store)
}
public get postSOP(){
  return readQuadrantPostSOP(this.$store)
}

  public beforeCreate() {
    dispatchGetQuadrant(this.$store);
    this.sop = this.loginState && this.loginState.SOP?this.loginState.SOP:'';

  }
  public async applyQuadrant(){
    await dispatchPostSOP(this.$store,this.sop);
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 100));
    console.log(this.postSOP)

    const notif = { 
      content: this.postSOP.error?'Error encountered': 'Updated SOP',
       color: this.postSOP.error?'danger': 'success' }
    commitAddNotification(this.$store,notif );
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
    commitRemoveNotification(this.$store,notif)


  }

}
</script>

<style scoped lang="scss">
@import "@/assets/css/global.scss";
.main-container{
  display: flex;
  width: 100%;
  // height: 90vh;
  padding-top:100px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-content: center;

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
  margin-right:20px;

  // box-shadow: 0px 0px 12px 0px rgb(180, 179, 179);
//   margin: 10px;
  font-size: 13px;
}
.quadrant-loading{
  align-self:center;
  justify-self: center;
}
.quadrant-error{
  align-self:center;
  justify-self: center;
}
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
.sop{
  // background-color: rgb(233, 230, 230);
  width: 50vw;
  // height: 100px;
  // border-radius: 20px;
  // padding-left:10px;

}
</style>