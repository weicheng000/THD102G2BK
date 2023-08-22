<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-input placeholder="訂單編號"></vxe-input>
        <vxe-button status="primary">搜索</vxe-button>
      </template>
      <template #view="{ row }">
        <!-- 自定義的按鈕或其他內容 -->
        <span v-if="row.Info == 1">停權</span>
        <span v-if="row.Info == 2">黑名單</span>
        <span v-if="row.Info == 0">正常</span>
      </template>
      <template #action="{ row }">
        <select class="form-select" v-model="row.Info">
          <option value="0" :selected="row.Info == 0">正常</option>
          <option value="1" :selected="row.Info == 1">停權</option>
          <option value="2" :selected="row.Info == 2">黑名單</option>
        </select>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const xGrid = ref();
// 模拟分页接口
const fetchApi = (currentPage, pageSize) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = [
        {
          OrderId: "MB00001",
          Name: "王緯育",
          Email: "abc2345@gmail.com",
          Info: 0,
        },
        {
          OrderId: "MB00002",
          Name: "張美娟",
          Email: "def6789@gmail.com",
          Info: 0,
        },
        {
          OrderId: "MB00003",
          Name: "陳宏志",
          Email: "ghi1234@gmail.com",
          Info: 0,
        },
        {
          OrderId: "MB00004",
          Name: "林雅玲",
          Email: "jkl5678@gmail.com",
          Info: 1,
        },
        {
          OrderId: "MB00005",
          Name: "黃信弘",
          Email: "mno9012@gmail.com",
          Info: 2,
        },
        {
          OrderId: "MB00006",
          Name: "劉怡君",
          Email: "pqr3456@gmail.com",
          Info: 1,
        },
        {
          OrderId: "MB00007",
          Name: "許明峰",
          Email: "stu7890@gmail.com",
          Info: 0,
        },
        {
          OrderId: "MB00008",
          Name: "吳佳蓉",
          Email: "vwx1234@gmail.com",
          Info: 1,
        },
        {
          OrderId: "MB00009",
          Name: "李宜倫",
          Email: "yzab5678@gmail.com",
          Info: 0,
        },
        {
          OrderId: "MB00010",
          Name: "陳明達",
          Email: "cdef9012@gmail.com",
          Info: 2,
        },
      ];
      resolve({
        result: list,
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
  maxHeight: 600,
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
  exportConfig: {},
  columns: [
    //控制欄位項目與屬性
    { field: "OrderId", title: "會員編號" },
    { field: "Name", title: "會員姓名" },
    { field: "Email", title: "電子郵箱" },
    { field: "Info", title: "會員狀態", slots: { default: "view" } },
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
