<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-input v-model="searchName" placeholder="訂單編號"></vxe-input>
        <vxe-button status="primary">搜索</vxe-button>
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
          OrderId: "OR00001",
          MemberId: "MB00001",
          OrderDate: "2023-7-1",
          Info: 0,
        }
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
    type: 'xlsx',
    // 局部自定义类型
    types: ['xlsx', 'csv', 'html', 'xml', 'txt'],
    // 自定义数据量列表
    modes: ['current', 'all']
  },
  columns: [
    //控制欄位項目與屬性
    { field: "OrderId", title: "訂單編號" },
    { field: "MemberId", title: "訂購人會員編號" },
    { field: "OrderDate", title: "訂單日期" },
    { field: "Info", title: "查看"},
    { field: "Info", title: "狀態"}
  ],
  toolbarConfig: {
    slots: {
      buttons: 'toolbar_buttons'
    },
    export: {
      icon: 'vxe-icon-cloud-download'
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
