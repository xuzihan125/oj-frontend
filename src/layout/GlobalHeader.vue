<template>
  <a-row id="globalHeader" class="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <HeaderIcon />
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "visitor" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import HeaderIcon from "@/components/HeaderIcon.vue";

const router = useRouter();
const store = useStore();

if (!store.state.user?.loginUser) {
  store.dispatch("user/getLoginUser");
}

const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (
      !item?.children &&
      checkAccess(store.state.user.loginUser, item?.meta?.access as string) &&
      !item.meta?.hideInMenu
    ) {
      return true;
    }
    return false;
  });
});

const visibleGroups = computed(() => {
  return routes.filter((item, index) => {
    if (
      item?.children &&
      checkAccess(store.state.user.loginUser, item?.meta?.access as string) &&
      !item.meta?.hideInMenu
    ) {
      return true;
    }
    return false;
  });
});

//default page
const selectedKeys = ref(["/"]);
//update menu
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped></style>

<a-dropdown @select="handleSelect" :popup-max-height="false">
<a-button>No Max Height
  <icon-down />
</a-button>
<template #content>
  <a-doption>Option 1</a-doption>
  <a-doption disabled>Option 2</a-doption>
  <a-doption>Option 3</a-doption>
  <a-doption>Option 4</a-doption>
  <a-doption>Option 5</a-doption>
  <a-doption>Option 6</a-doption>
  <a-doption>Option 7</a-doption>
  <a-doption>Option 8</a-doption>
  <a-doption>Option 9</a-doption>
</template>
</a-dropdown>
