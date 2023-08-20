<template>
<div class="thispage">
    <sidebar></sidebar>
    <div>
      <top></top>
      <div class="container mt-4">
        <h2>旅宿管理</h2>
      </div>
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