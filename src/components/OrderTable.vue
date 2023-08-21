<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-input placeholder="訂單編號"></vxe-input>
        <vxe-button status="primary">搜索</vxe-button>
      </template>
      <template #view="{ row }">
        <!-- 自定義的按鈕或其他內容 -->
        <button type="button" class="btn btn-link" :disabled="row.Info === 0"
         @click="toPage(row.OrderId, row.Info)">
          <i class="vxe-icon-eye-fill"></i>
        </button>
      </template>
      <template #text="{ row }">
        <!-- 自定義的按鈕或其他內容 -->
        <button v-if="row.Info === 0" type="button" class="btn btn-link"
        @click="toPage(row.OrderId, row.Info)">
          待審核
        </button>
        <span v-else-if="row.Info === 1">已核准</span>
        <span v-else>已取消</span>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { reactive,ref } from "vue";
import { useRouter } from 'vue-router';
// 模拟分页接口
const fetchApi = (currentPage, pageSize) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = [
        {
          OrderId: "OR00001",
          MemberId: "MB00001",
          OrderDate: "2023-07-01",
          Info: 0,
        },
        {
          OrderId: "OR00002",
          MemberId: "MB00002",
          OrderDate: "2023-07-02",
          Info: 1,
        },
        {
          OrderId: "OR00003",
          MemberId: "MB00003",
          OrderDate: "2023-07-03",
          Info: 2,
        },
        {
          OrderId: "OR00004",
          MemberId: "MB00004",
          OrderDate: "2023-07-04",
          Info: 0,
        },
        {
          OrderId: "OR00005",
          MemberId: "MB00005",
          OrderDate: "2023-07-05",
          Info: 1,
        },
        {
          OrderId: "OR00006",
          MemberId: "MB00006",
          OrderDate: "2023-07-06",
          Info: 2,
        },
        {
          OrderId: "OR00007",
          MemberId: "MB00007",
          OrderDate: "2023-07-07",
          Info: 0,
        },
        {
          OrderId: "OR00008",
          MemberId: "MB00008",
          OrderDate: "2023-07-08",
          Info: 1,
        },
        {
          OrderId: "OR00009",
          MemberId: "MB00009",
          OrderDate: "2023-07-09",
          Info: 2,
        },
        {
          OrderId: "OR00010",
          MemberId: "MB00010",
          OrderDate: "2023-07-10",
          Info: 0,
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
    remote: true,
    // 默认选中类型
    type: "csv",
    // 局部自定义类型
    types: ["csv", "html", "xml", "txt"],
    // 自定义数据量列表
    modes: ["current", "all"],
  },
  columns: [
    //控制欄位項目與屬性
    { field: "OrderId", title: "訂單編號" },
    { field: "MemberId", title: "訂購人會員編號" },
    { field: "OrderDate", title: "訂單日期" },
    { field: "Info", title: "查看", slots: { default: "view" } },
    { field: "", title: "狀態", slots: { default: "text" } },
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

// 跳頁邏輯
const router = useRouter();

const toPage = (orderId, info) => {
  router.push({ name: 'OrderList', params: { OrderId: orderId, Info: info } });
};
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
