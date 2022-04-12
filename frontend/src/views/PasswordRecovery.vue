<template>
  <!-- <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{appName}} - Password Recovery</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <p class="subheading">A password recovery email will be sent to the registered account</p>
              <v-form @keyup.enter="submit" v-model="valid" ref="form" @submit.prevent="" lazy-validation>
                <v-text-field @keyup.enter="submit" label="Username" type="text" prepend-icon="person" v-model="username" v-validate="'required'" data-vv-name="username" :error-messages="errors.collect('username')" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="cancel">Cancel</v-btn>
              <v-btn @click.prevent="submit" :disabled="!valid">
                Recover Password
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content> -->




  <div class="container">
    
    <form @keyup.enter="submit">
     

      <input
        @keyup.enter="submit"
        v-model="email"
        prepend-icon="person"
        name="recovery"
        label="recovery"
        type="text"
        class="input"
        placeholder="Email"
        :class="invalidEmail? 'wrong' : ''"
        v-on:change="onchange"
      />
    </form>
    <br />
    <br />
    <button class="btn" @click.prevent="submit">Recover Password</button>
    
  </div>




</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { appName } from '@/env';
import { dispatchPasswordRecovery } from '@/store/main/actions';

@Component
export default class Login extends Vue {
  public valid = true;
  public username: string = '';
  public appName = appName;

  public invaidEEmail:boolean = false;

  public cancel() {
    this.$router.back();
  }



  public submit() {
    dispatchPasswordRecovery(this.$store, { username: this.username });
  }
}
</script>

<style lang="scss" scoped>

.container {
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
  width: 100%;
}
.label {
  color: red;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 10px;
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
  height: 60px;
  width: 400px;
  background-color: rgb(243, 243, 243);
  font-family: "Segoe UI";
  padding: 0px 0px 0px 20px;
  font-size: 15px;
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
</style>
