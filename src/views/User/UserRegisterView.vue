<template>
  <div id="userLogin">
    <a-form
      class="loginForm"
      label-align="left"
      :model="user"
      @submit="handleSubmit"
      auto-label-width="true"
    >
      <a-form-item
        field="userAccount"
        tooltip="Please enter your account"
        label="account"
      >
        <a-input
          v-model="user.userAccount"
          placeholder="please enter your account..."
        />
      </a-form-item>
      <a-form-item
        field="post"
        label="Password"
        tooltip="Please enter your password"
      >
        <a-input-password
          v-model="user.userPassword"
          placeholder="please enter your password"
        />
      </a-form-item>
      <a-form-item
        field="post"
        tooltip="Please enter your password again"
        label="Reenter Password"
      >
        <a-input-password
          v-model="user.checkPassword"
          placeholder="please reenter your password..."
        />
      </a-form-item>
      <a-form-item class="registerButton">
        <a-button html-type="submit">Submit</a-button>
      </a-form-item>
      <a-form-item class="loginButton">
        <a-button html-type="text" @click="handleLogin">back to login</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import {
  UserAddRequest,
  UserControllerService,
  UserLoginRequest,
  UserRegisterRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * user info
 */
const user = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);

console.log("loading!!!");
const router = useRouter();
const store = useStore();
const route = useRoute();

/**
 * submit login info
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(user);
  // login success
  if (res.code === 0) {
    // const { "checkPassword", ...data } = reactive as ;
    const login = {
      userAccount: user.userAccount,
      userPassword: user.userPassword,
    } as UserLoginRequest;
    const res = await UserControllerService.userLoginUsingPost(login);
    store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("login fail" + JSON.stringify(res.message));
  }
};

const handleLogin = () => {
  if (route.query?.redirect) {
    router.push({
      path: `/user/login?redirect=${route.query?.redirect as string}`,
      replace: true,
    });
  } else {
    router.push({
      path: `/user/login`,
      replace: true,
    });
  }
};
</script>
