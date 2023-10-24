<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <HeaderIcon />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">online Judge by Zihan Xu</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  /*text-align: center;*/
}

#userLayout .header {
  margin-top: 16px;
  margin-bottom: 16px;
  align-items: center;
  display: flex;
  justify-content: center;
}

#userLayout .content {
  padding: 20px;
  display: flex;
  justify-content: center;
}

#userLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script>
import { defineComponent } from "vue";
import HeaderIcon from "@/components/HeaderIcon.vue";

export default defineComponent({
  components: { HeaderIcon },
});
</script>
