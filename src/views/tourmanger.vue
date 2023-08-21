<template>
<div class="thispage">
    <sidebar></sidebar>
    <div>
      <top></top>
      <div class="container mt-4">
        <h2>旅宿管理</h2>
        <div class="card shadow-lg mt-4">
          <div class="card-header">
            <h5>旅宿列表</h5>
          </div>
          <div class="card-body">
            <tour-table></tour-table>
          </div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import Top from "../components/Header.vue"
import TourTable from "../components/TravelTable.vue"
export default {
  components: {
    Sidebar,
    Top,
    TourTable
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>