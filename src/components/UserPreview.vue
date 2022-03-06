<template>
<span class='ranking'>
   <span class='ranking-main-item-logo'>
            <img  v-if="standing['tier']=='5'" src="@/assets/img/tier/panda.svg"  width='30px'  height='30px' style='filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);'/>
            <img  v-if="standing['tier']=='4'" src="@/assets/img/tier/wolf.svg"  width='30px'  height='30px' style='filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);'/>
            <img  v-if="standing['tier']=='3'" src="@/assets/img/tier/lion.svg"  width='30px'  height='30px' style='filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);'/>
            <img  v-if="standing['tier']=='2'" src="@/assets/img/tier/unicorn.svg"  width='30px'  height='30px' style='filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);'/>
            <img  v-if="standing['tier']=='1'" src="@/assets/img/tier/dragon.svg"  width='30px'  height='30px' style='filter: invert(75%) sepia(67%) saturate(340%) hue-rotate(348deg) brightness(104%) contrast(103%);'/>
          </span>
          <span class='ranking-main-item-name' > {{standing['username']}}  ·  <span style='color:grey'>  {{standing['rating']['r_all']}} </span></span>
</span> 
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Contest } from "@/interfaces";
import { getMonth } from "@/utils";
@Component
export default class ProblemPreview extends Vue {
  @Prop() standing: any;
  
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.ranking-main-item-name{
  color:rgb(0, 0, 0);
  font-weight: bold;
  font-family: 'montserrat';
  margin-left:20px;

}

.ranking{
  display:flex;
  align-items: center;
  // justify-content: center;
}
</style>