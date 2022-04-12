<template>
  <div class="login-container">

  <div class="main">

      <div>
        <img src="@/assets/img/logo.png" width="80px" />
      </div>
      <div class="sign-in">Sign In</div>
    <br />
    <br />
    <form @keyup.enter="submit">
      <label v-if="loginError && !change" class="label">
        Incorrect email or password
      </label>
      <br />
      <input
        @keyup.enter="submit"
        v-model="email"
        prepend-icon="person"
        name="login"
        label="Login"
        type="text"
        class="input"
        placeholder="Username or Email"
        :class="loginError && !change ? 'wrong' : ''"
        v-on:change="onchange"
      />
      <br />
      <br />
      <input
        @keyup.enter="submit"
        v-model="password"
        prepend-icon="lock"
        name="password"
        label="Password"
        id="password"
        type="password"
        class="input"
        placeholder="Password"
        :class="loginError && !change ? 'wrong' : ''"
        v-on:change="onchange"
      />
    </form>
    <br />
    <br />
    <button class="btn" @click.prevent="submit">Login</button>
    <br />
    <br />
    <router-link to="/register">
      <button class="register">Not a user? Register</button>
    </router-link>

    <br />
    <router-link to="/recover-password">
      <button class="forgot">Forgot Password?</button>
    </router-link>
    <br />
    <br />

    <br />
    <div v-if="logInProgress">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
  <div class="side-log">
  </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { api } from "@/api";
import { appName } from "@/env";
import { readLoginError, readLogInProgress } from "@/store/main/getters";
import { dispatchLogIn } from "@/store/main/actions";

@Component
export default class Login extends Vue {
  public email: string = "";
  public password: string = "";
  public appName = appName;

  public change: boolean = true;

  public get loginError() {
    return readLoginError(this.$store);
  }

  public get logInProgress() {
    return readLogInProgress(this.$store);
  }

  public onchange() {
    // this.change = true;
  }

  @Watch('email')
  public onEmailChange(i,f){
    this.change= true;

  }

  @Watch('password')
  public onpasswordChange(i,f){
    this.change= true;

  }

  public submit() {
    this.change = false;

    dispatchLogIn(this.$store, {
      username: this.email,
      password: this.password,
    });
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.login-container{
  display: flex;
    // padding:20%;
    margin: none;
  height: 100%;
  width: 100%;

}
.side-log{
  height: 100vh;
  background-color: $xDark;
  width: 100%;
  overflow-y: scroll;
  @include lg{
    display: none;
  }
}
.main {
  // margin-left: auto;
  // margin-right: auto;
  // padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;

  // padding:20%;
  height: 100%;
  max-width: 700px;
    @include lg{
    width: 100%;
    max-width: 100%;
  }
}
.label {
  color: red;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 10px;
  margin:0 20px;
  font-family: "Montserrat";
}
.heading {
  font-family: "Segoe UI";
  font-size: 40px;
  color: #686868;

  margin-left: 30px;

  font-weight: bold;
}

.logo {
  // display: flex;
  align-items: center;
}
.input {
  height: 60px;
  margin: 0 40px;
  width: 400px;
  margin: 0 20px;
  background-color: rgb(243, 243, 243);
  border-radius: 4px;
  font-family: "Montserrat";
  padding: 0px 0px 0px 20px;
  font-size: 15px;
  @include lg{
  height: 40px;
    width: 300px;
  }
}

.wrong {
  border: 1px solid rgb(255, 0, 0);
  // font-size: 10px;
}
.btn {
  background-color: rgb(77, 77, 77);
  color: white;
  font-weight: bold;
  font-family: "Segoe UI";
  padding: 12px 100px;
  border-radius: 8px;

  &:hover {
    background-color: rgb(90, 90, 90);
  }
}
.forgot,
.register {
  color: rgb(165, 165, 165);
  &:hover {
    color: rgb(133, 133, 133);
  }
}
.sign-in{
  font-family: 'Montserrat';
  font-weight: bold;
  font-size: 20px;
}
</style>
