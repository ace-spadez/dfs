<template>
  <span class="ranking">
    <span class="ranking-main-item-logo">
      <img
        v-if="tier=='5'"
        src="@/assets/img/tier/panda.svg"
        width="30px"
        height="30px"
        style="filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);"
      />
      <img
        v-if="tier=='4'"
        src="@/assets/img/tier/wolf.svg"
        width="30px"
        height="30px"
        style="filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);"
      />
      <img
        v-if="tier=='3'"
        src="@/assets/img/tier/lion.svg"
        width="30px"
        height="30px"
        style="filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);"
      />
      <img
        v-if="tier=='2'"
        src="5@/assets/img/tier/unicorn.svg"
        width="30px"
        height="30px"
        style="filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);"
      />
      <img
        v-if="tier=='1'"
        src="@/assets/img/tier/dragon.svg"
        width="30px"
        height="30px"
        style="filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);"
      />
    </span>
    <span class="ranking-main-item-name">
      <router-link
        :to="{name:'usersprofile',params:{username:standing['username']}}"
      >{{standing['username']}}</router-link>·
      <span style="color:grey">{{Math.round(standing['rating']['r_all'])}}</span>
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Contest } from "@/interfaces";
import { getMonth } from "@/utils";
@Component
export default class ProblemPreview extends Vue {
  @Prop() standing: any;

  public get tier(){
    const  rt=this.standing.rating.r_all;
    return rt<1800?'5':
      rt<2100?'4':
      rt<2400?'3':
      rt<2700?'2':'1';
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.ranking-main-item-name {
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-family: "montserrat";
  margin-left: 20px;
}
.ranking-main-item-name a{
  text-decoration: none;
}

.ranking {
  display: flex;
  align-items: center;
  // justify-content: center;
}
</style>
