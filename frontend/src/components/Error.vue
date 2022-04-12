<template>
 <div  class="error-message-div">
        <div class="error-message">Sorry, We couldn't grab this page!</div>
        <img src="@/assets/img/error-panda.png" style="width:100%;height:auto;"/>
      </div>
  
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component
export default class Error extends Vue {
  
}
</script>


<style scoped lang="scss">
@import "@/assets/css/global.scss";

.error-message-div {
  flex-direction: column;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.error-message {
  font-weight: bold;
  color: rgb(146, 146, 146);
  font-size: 30px;
  @include md {
    font-size: 20px;
  }
  font-family: "B612";
}

</style>