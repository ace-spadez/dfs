<template>
  <div class="login-container">

  <div v-if="!registerSuccess" class="main">
      <div>
        <img src="@/assets/img/logo.png" width="80px" />
      </div>
            <div class="sign-in">Sign Up</div>

    <form @keyup.enter="submit">
      <!-- <label v-if='registerError && !change' class="label">
        Incorrect email or password
    </label> -->
      <br />
      <label v-if="invalidEmail" class="label">
        Invalid email
      </label>
      <br />
      <input
        @keyup.enter="submit"
        v-model="email"
        prepend-icon="person"
        name="register"
        label="Register"
        type="text"
        class="input"
        placeholder="Email"
        :class="(registerError && error)| invalidEmail ? 'wrong' : ''"
      />
      <br />
      <label v-if="invalidUsername" class="label">
        Invalid username
      </label>
      <br />
      <input
        @keyup.enter="submit"
        v-model="username"
        prepend-icon="person"
        name="register"
        label="Register"
        type="text"
        class="input"
        placeholder="Username"
        :class="(registerError && error) || invalidUsername ? 'wrong' : ''"
      />
      <br />
      <label v-if="invalidPassword" class="label">
        invalid Password
      </label>
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
        :class="invalidPassword ? 'wrong' : ''"
      />
      <br />
      <label v-if="passwordNotMatching" class="label">
        Passwords not matching
      </label>

      <label v-if="invalidPassword" class="label">
        invalid Password
      </label>
      <br />
      <input
        @keyup.enter="submit"
        v-model="confirmedPassword"
        prepend-icon="lock"
        name="password"
        label="Password"
        id="password"
        type="password"
        class="input"
        placeholder="Confirm Password"
        :class="passwordNotMatching || invalidPassword ? 'wrong' : ''"
      />
    </form>
    <br />
    <br />

    <button class="btn" @click.prevent="submit">Register</button>
    <br />
    <br />

    <router-link to="/login">
      <button class="register">Already a user? login</button>
    </router-link>
    <br />

    <br />
    <br />

    <br />
    <div v-if="registerInProgress">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-if="!registerInProgress" style="height:32px">
      
    </div>
  </div>
  <div v-if="registerSuccess" class="main">
    Registration Successful. Verify the email by clicking on the link we have sent you in mail and then <router-link to="/login">login</router-link>
  </div>
<div class="side-log">
    hello
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { api } from "@/api";
import { appName } from "@/env";
import {
  readRegisterError,
  readRegisterInProgress,
  readRegisterSuccess
} from "@/store/register/getters";
import { dispatchRegister } from "@/store/register/actions";

@Component
export default class Register extends Vue {
  public email: string = "";
  public username: string = "";
  public password: string = "";
  public confirmedPassword: string = "";
  public appName = appName;

  public passwordNotMatching: boolean = false;
  public emailExists: boolean = false;
  public usernameExists: boolean = false;
  public invalidPassword: boolean = false;
  public invalidUsername: boolean = false;
  public invalidEmail: boolean = false;
  public error : boolean = false;

  public get registerError() {
    return readRegisterError(this.$store);
  }
  public get registerSuccess() {
    return readRegisterSuccess(this.$store);
  }

  public get registerInProgress() {
    return readRegisterInProgress(this.$store);
  }

  @Watch("confirmedPassword")
  public onConfirmedPasswordChange(newPassword, oldPassword) {
    if (newPassword != this.password) {
      this.passwordNotMatching = true;
    } else {
      this.passwordNotMatching = false;
    }
    this.invalidPassword = false;
  }
    @Watch("password")
  public onPasswordChange(newPassword, oldPassword) {
    if (newPassword != this.password) {
      this.passwordNotMatching = true;
    } else {
      this.passwordNotMatching = false;
    }
    this.invalidPassword = false;
  }

  @Watch("email")
  public onEmailChange(ne, oe) {
    this.invalidEmail = false;
    this.error = false;

  }

  @Watch("username")
  public onUsernameChange(ne, oe) {
    this.error = false;
    this.invalidUsername = false;
  }

  public submit() {
    if (this.passwordNotMatching == true) {
      return;
    }

    if (this.email === "") {
      this.invalidEmail = true;
      return;
    }
    if (this.username === "") {
      this.invalidUsername = true;
      return;
    }
    if (this.confirmedPassword === "") {
      this.invalidPassword = true;

      return;
    }
    if (this.password === "") {
      this.invalidPassword = true;

      return;
    }
    this.error = true;

    dispatchRegister(this.$store, {
      username: this.username,
      password: this.password,
      email: this.email,
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
  background-color: $xDark;  overflow-y: scroll;

  width: 100%;
    @include lg{
    display: none;
  }
}
.main {
justify-content:center;
align-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  max-width: 700px;
    @include lg{
    width: 100%;
    max-width: 100%;
  }

}
.label {
  color: red;
}
.heading {
  font-family: "Segoe UI";
  font-size: 40px;
  color: #686868;

  margin-left: 30px;

  font-weight: bold;
}

.logo {
  display: flex;
  align-items: center;

  // margin: auto;
}
.input {
  margin: 0 40px;
  height: 60px;
  width: 400px;
  background-color: rgb(243, 243, 243);
  font-family: "Segoe UI";
  padding: 0px 0px 0px 20px;
  font-size: 15px;
  @include lg{
  height: 40px;
    width: 300px;
  }
}
.wrong {
  border: 1px solid rgb(255, 0, 0);
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
