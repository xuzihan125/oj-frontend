<template>
  <div id="userLogin">
    <a-form
      class="loginForm"
      label-align="left"
      :model="form"
      @submit="handleSubmit"
      auto-label-width="true"
    >
      <a-form-item
        field="userAccount"
        tooltip="Please enter your account"
        label="account"
      >
        <a-input
          v-model="form.userAccount"
          placeholder="please enter your account..."
        />
      </a-form-item>
      <a-form-item
        field="post"
        label="Password"
        tooltip="Please enter your password"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="please enter your password"
        />
      </a-form-item>
      <a-form-item class="loginButton">
        <a-button html-type="submit">Submit</a-button>
      </a-form-item>
      <a-form-item class="registerButton">
        <a-button html-type="text" @click="handleRegister">Register</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#userLogin {
}

#userLogin .loginForm {
  max-width: 400px;
}

#userLogin .loginButton {
  display: flex;
  justify-content: center;
}
</style>

<script setup lang="ts">
import { reactive } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { UserControllerService, UserLoginRequest } from "../../../generated";

/**
 * user info
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();
const route = useRoute();

/**
 * submit login info
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // login success
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: (route.query?.redirect as string) ?? "/",
      replace: true,
    });
  } else {
    message.error("login fail" + JSON.stringify(res.message));
  }
  // alert(JSON.stringify(form));
};

const handleRegister = () => {
  if (route.query?.redirect as string) {
    console.log(`/user/register?redirect=${route.query?.redirect as string}`);
    router.push({
      path: `/user/register?redirect=${route.query?.redirect as string}`,
      replace: true,
    });
  } else {
    router.push({
      path: `/user/register`,
      replace: true,
    });
  }
};
</script>
