<template>
<div class="thispage">
    <sidebar></sidebar>
    <div>
      <top></top>
      <div>你好我是會員管理</div>
    </div>
</div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import Top from "../components/Header.vue"
export default {
  components: {
    Sidebar,
    Top
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>