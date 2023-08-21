<template>
<div class="thispage">
    <sidebar></sidebar>
    <div>
      <top></top>
      <div class="container mt-4">
        <h2>貼文管理</h2>
        <paper-table></paper-table>
      </div>
    </div>
</div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import Top from "../components/Header.vue"
import PaperTable from "../components/MemberTable.vue"
export default {
  components: {
    Sidebar,
    Top,
    PaperTable
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>