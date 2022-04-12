<template>

<div class="navbar">
</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";


@Component
export default class NavBar extends Vue {


}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.navbar{
    height: 60px;
    background-color: black;
}
</style>
