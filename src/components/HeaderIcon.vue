<template>
  <div class="title-bar">
    <img class="logo" src="../assets/oj-logo.svg" />
    <div class="title">Online Judge</div>
  </div>
</template>

<script>
export default {
  name: "HeaderIcon",
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
}

.title {
  color: #444;
  margin-left: 16px;
}
</style>
