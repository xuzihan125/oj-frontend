// initial state
import { StoreOptions } from "vuex";
// import { UserControllerService } from "../../generated";
import AccessEnum from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

// actions
// const actions = {
//   async getLoginUser({ commit, state }, payload) {
//     // const products = await shop.getProducts();
//     commit("setProducts", { userName: "User 1024" });
//   },
// };

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "visitor",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: AccessEnum.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
