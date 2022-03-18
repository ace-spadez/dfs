<template>
    <div>
    <div v-if="error">
      Some error occured. Please try again.
    </div>
    <div v-if="loading">
      <v-progress-circular></v-progress-circular>
    </div>
    <div v-if="success">
      Verified please login through localhost:8080/login .
    </div>
   </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { api } from "@/api";
import { appName } from "@/env";

@Component
export default class Login extends Vue {
  public loading: boolean = true;
  public error: boolean = false;
  public success: boolean = false;
  async mounted()
{
	try
	{
		var key = this.$route.query.ab;
		if(typeof key === "string")
		{
		var ls = await api.verify(key);
		console.log(ls.status);
	 if (ls.status===200) {
		 this.success=true;
	 }
	 else
		{
			this.error=true;
		}
		}
		else
		{
			this.error = true;
		}
	}
	catch
	{
		this.error=true;
	}
	finally
	{
		this.loading = false;
	}
}

  }
</script>
