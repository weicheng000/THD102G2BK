<template>
<div class="thispage">
    <sidebar></sidebar>
    <div>
      <top></top>
      <div class="container mt-4">
        <h2>會員管理</h2>
        <div class="card mt-4 shadow-lg">
          <div class="card-header">
            <h5>會員列表</h5>
          </div>
          <div class="card-body">
            <member-table></member-table>
          </div>
        </div>
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