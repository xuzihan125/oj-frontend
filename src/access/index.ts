import router from "@/router";
import store from "@/store";
import checkAccess from "@/access/checkAccess";
import AccessEnum from "@/access/accessEnum";
import { Modal } from "@arco-design/web-vue";

router.beforeEach(async (to, from, next) => {
  console.log("login info:", store.state.user.loginUser);
  let loginUser = store.state.user.loginUser;
  // get current user info
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  // check authorization
  const needAccess = to.meta?.access ?? AccessEnum.NOT_LOGIN;
  if (needAccess !== AccessEnum.NOT_LOGIN) {
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === AccessEnum.NOT_LOGIN
    ) {
      console.log("not login yet:");
      console.log(loginUser);
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (!checkAccess(loginUser, needAccess as string)) {
      Modal.error({
        title: "Error Notification",
        content:
          "You do not have access to this page. Please contact administrator for help",
      });
      next("/noAuth");
      return;
    }
  }
  next();
});
