<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-input placeholder="訂單編號"></vxe-input>
        <vxe-button status="primary">搜索</vxe-button>
      </template>
      <template #action="{ row }">
        <vxe-button
          type="text"
          icon="vxe-icon-warnion-circle-fill"
          content="下架"
          :disabled="row.Info == true"
        ></vxe-button>
        <vxe-button
          type="text"
          icon="vxe-icon-check"
          status="primary"
          content="復原"
          :disabled="row.Info == false"
        ></vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { reactive } from "vue";
// API接口
const serveApiUrl = "/api";

const gridOptions = reactive({
  border: true,
  maxHeight: 650,
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
    // pageSize: 10,
    // pageSizes: [10, 50, 100, 200, 500, 1000],
  },
  exportConfig: {},
  columns: [
    //控制欄位項目與屬性
    { field: "ReportDate", title: "檢舉日期" },
    { field: "ReportId", title: "檢舉者會員編號" },
    { field: "MemberId", title: "被檢舉者會員編號" },
    { field: "ReportEmail", title: "電子信箱" },
    { field: "PostDate", title: "貼文張貼日期" },
    { title: "動作", slots: { default: "action" } },
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
      query: async ({ page }) => {
        console.log("currentPage:", page.currentPage);
        console.log("pageSize:", page.pageSize);
        await new Promise((resolve) => setTimeout(resolve, 10)); // 延遲10毫秒

        const response = await fetch(
          `${serveApiUrl}/index.php?currentPage=${page.currentPage}&pageSize=${page.pageSize}`
        );

        const data = await response.json();
        const result = data.result;
        const total = data.page.totalPages;

        return { result, page: { total } };
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
