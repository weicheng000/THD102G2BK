<template>
<div class="thispage">
    <sidebar></sidebar>
    <div>
      <top></top>
      <div class="container mt-4">
        <h2>貼文管理</h2>
        <div class="card mt-4 shadow-lg">
          <div class="card-header">
            <h5>貼文列表</h5>
          </div>
          <div class="card-body">
            <paper-table></paper-table>
          </div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import Top from "../components/Header.vue"
import PaperTable from "../components/PaperTable.vue"
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