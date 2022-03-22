<template>
  <div class="login-container">
    <div class="main">
      Registration Successful. Verify the email by clicking on the link we have sent you in mail and then
      <router-link to="/login">login</router-link>
    </div>
    <div class="side-log">hello</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { api } from "@/api";
import { appName } from "@/env";
import {
  readRegisterError,
  readRegisterErrorMessage,
  readRegisterInProgress,
  readRegisterSuccess
} from "@/store/register/getters";
import { dispatchRegister } from "@/store/register/actions";
import { commitAddNotification, commitRemoveNotification } from "@/store/main/mutations";

@Component
export default class Register extends Vue {
  public email: string = "";
  public username: string = "";
  public password: string = "";
  public confirmedPassword: string = "";
  public appName = appName;
  public data = {};
  public passwordNotMatching: boolean = false;
  public emailExists: boolean = false;
  public usernameExists: boolean = false;
  public invalidPassword: boolean = false;
  public invalidUsername: boolean = false;
  public invalidEmail: boolean = false;
  public error: boolean = false;

  public get registerError() {
    return readRegisterError(this.$store);
  }
  public get registerSuccess() {
    return readRegisterSuccess(this.$store);
  }

  public get registerInProgress() {
    return readRegisterInProgress(this.$store);
  }

  public get registerErrorMessage() {
    return readRegisterErrorMessage(this.$store);
  }

  
  @Watch("username")
  public onUsernameChange(ne, oe) {
    this.error = false;
    this.invalidUsername = false;
  }

  public async submit() {
   

   

    await dispatchRegister(this.$store, {
      username: (this.data as any).username,
      password: (this.data as any).password,
      email: (this.data as any).email
    });
    
    if ( this.registerError ) {
      console.log("In Register view", String(this.registerErrorMessage));
      const notif = {
      content: String(this.registerErrorMessage),
      color: "danger"
      };
      commitAddNotification(this.$store, notif);
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
      commitRemoveNotification(this.$store, notif);
    }
      

  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.login-container {
  display: flex;
  // padding:20%;
  margin: none;
  height: 100%;
  width: 100%;
}
.side-log {
  height: 100vh;
  background-color: $xDark;
  overflow-y: scroll;

  width: 100%;
  @include lg {
    display: none;
  }
}
.main {
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  width: 800px;
  @include lg {
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
  @include lg {
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
  width:80%;
  margin: 0 40px;
  left:calc(50% - 60px)

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
.sign-in {
  font-family: "Montserrat";
  font-weight: bold;
  font-size: 20px;
}
.login-form {
  padding: 2em;
  // border: 1px solid #a8a8a8;
  width:100%;
  border-radius: .5em;
  // max-width: 500px;
  box-sizing: border-box;
}
.form-title {
  margin-top: 0;
}
.login-form::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}
@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide .formulate-input {
    flex-grow: 1;
    width: calc(50% - .5em);
  }
  .double-wide .formulate-input:first-child {
    margin-right: .5em;
  }
  .double-wide .formulate-input:last-child {
    margin-left: .5em;
  }
}
</style>
