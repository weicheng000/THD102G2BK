<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-input v-model="searchName" placeholder="訂單編號"></vxe-input>
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
// 模拟分页接口
const fetchApi = (currentPage, pageSize) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = [
        {
          ReportId: "MB00002",
          MemberId: "MB00001",
          ReportDate: "2023-01-28",
          ReportEmail: "abc2345@gmail.com",
          PostDate: "2023-01-23",
          Info: false,
        },
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
