<template>
<div class="thispage">
    <sidebar></sidebar>
    <div>
      <top></top>
      <div class="container mt-4">
        <h2>貼文管理</h2>
        <div class="card mt-4 shadow-lg">
          <div class="card-header d-flex justify-content-between">
            <h5>貼文列表</h5>
            <div>
              <vxe-switch v-model="show" size="medium" open-label="全文瀏覽" close-label="舉報處理"></vxe-switch>
            </div>
          </div>
          <div class="card-body">
            <template v-if="show === false">
              <paper-table></paper-table>
            </template>
            <template v-if="show === true">
              <paper-list></paper-list>
            </template>
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
import PaperList from "../components/PaperList.vue"
export default {
  components: {
    Sidebar,
    Top,
    PaperTable,
    PaperList
  },
  data() {
    return {
      show: false
    };
  },
};
</script>
<style scoped>
</style>