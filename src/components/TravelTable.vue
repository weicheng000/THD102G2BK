<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-input v-model="searchName" placeholder="訂單編號"></vxe-input>
        <vxe-button status="primary">搜索</vxe-button>
      </template>
      <template #view="{ row }">
        <!-- 自定義的按鈕或其他內容 -->
        <span v-if="row.Info === false">已下架</span>
        <span v-else>上架中</span>
      </template>
      <template #edit="{ row }">
        <vxe-switch v-model="row.Info"></vxe-switch>
      </template>
      <template #icon>
        <i class="vxe-icon-setting-fill"></i>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
// 模拟分页接口
const fetchApi = (currentPage, pageSize) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = [
        { OrderId: "SH00001", MemberId: "快樂寵物旅館", Info: true },
        { OrderId: "SH00002", MemberId: "狗狗假期", Info: false },
        { OrderId: "SH00003", MemberId: "貓咪天地", Info: true },
        { OrderId: "SH00004", MemberId: "寵物樂園", Info: false },
        { OrderId: "SH00005", MemberId: "愛心寵物屋", Info: true },
        { OrderId: "SH00006", MemberId: "快樂動物城", Info: false },
        { OrderId: "SH00007", MemberId: "愛寵家園", Info: true },
        { OrderId: "SH00008", MemberId: "小動物樂園", Info: false },
        { OrderId: "SH00009", MemberId: "寵物夢想家", Info: true },
        { OrderId: "SH00010", MemberId: "歡樂寵物園", Info: false },
      ];
      resolve({
        page: {
          total: list.length,
        },
        result: list.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        ),
      });
    }, 100);
  });
};
const gridOptions = reactive({
  border: true,
  height: 650,
  rowConfig: {
    keyField: "id",
  },
  columnConfig: {
    //控制是否可以更改欄位寬度
    resizable: true,
  },
  checkboxConfig: {
    //控制是否可以有checkbox屬性
    reserve: true,
  },
  pagerConfig: {
    //控制是否可以分頁
    enabled: true,
    pageSize: 10,
    pageSizes: [10, 50, 100, 20, 50, 100, 200, 500, 1000],
  },
  exportConfig: {
    // 默认选中类型
    type: "xlsx",
    // 局部自定义类型
    types: ["xlsx", "csv", "html", "xml", "txt"],
    // 自定义数据量列表
    modes: ["current", "all"],
  },
  columns: [
    //控制欄位項目與屬性
    { field: "OrderId", title: "旅宿編號" },
    { field: "MemberId", title: "旅宿名稱" },
    { field: "Info", title: "上架狀態", slots: { default: "view" } },
    { field: "", title: "上/下架", slots: { default: "edit" } },
    { field: "", title: "編輯", slots: { default: "icon" } },
  ],
  toolbarConfig: {
    slots: {
      buttons: "toolbar_buttons",
    },
    export: {
      icon: "vxe-icon-cloud-download",
    },
    zoom: {
      iconIn: "vxe-icon-fullscreen",
      iconOut: "vxe-icon-minimize",
    },
    refresh: {
      icon: "vxe-icon-refresh",
      iconLoading: "vxe-icon-refresh roll",
    },
  },
  proxyConfig: {
    seq: true,
    props: {
      result: "result",
      total: "page.total",
    },
    ajax: {
      // 接收 Promise
      query: ({ page }) => {
        return fetchApi(page.currentPage, page.pageSize);
      },
    },
  },
});
</script>
<style scoped>
* {
  font-size: 1em;
}
.btn {
  margin: 0;
  padding: 0;
}
</style>
