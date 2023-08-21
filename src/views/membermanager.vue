<template>
<div class="thispage">
    <sidebar></sidebar>
    <div>
      <top></top>
      <div class="container mt-4">
        <h2>會員管理</h2>
        <member-table></member-table>
      </div>
    </div>
</div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import Top from "../components/Header.vue";
import MemberTable from "../components/MemberTable.vue";
export default {
  components: {
    Sidebar,
    Top,
    MemberTable
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>