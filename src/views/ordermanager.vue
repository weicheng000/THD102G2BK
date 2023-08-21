<script>
import Sidebar from "../components/Sidebar.vue";
import Top from "../components/Header.vue";
import OrderTable from "../components/OrderTable.vue";
export default {
  components: {
    Sidebar,
    Top,
    OrderTable,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <div class="thispage">
    <sidebar></sidebar>
    <div>
      <top></top>
      <div class="container mt-4">
        <h2>訂單管理</h2>
        <div class="card mt-4 shadow-lg">
          <div class="card-header">
            <h5>訂單列表</h5>
          </div>
          <div class="card-body">
            <order-table></order-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>