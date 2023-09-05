<template>
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <!-- <template #toolbar_buttons>
        <vxe-input placeholder="訂單編號"></vxe-input>
        <vxe-button status="primary">搜索</vxe-button>
      </template> -->

      <template #toolbar_tools>
        <vxe-form :data="formData" @submit="searchEvent">
          <vxe-form-item field="name">
            <template #default>
              <vxe-input v-model="formData.MemberId" type="text" placeholder="請輸入會員編號"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template #default>
              <vxe-button type="submit" status="primary" content="查詢"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
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
import XEUtils from 'xe-utils';
const xGrid = ref();

const formData = reactive({
  MemberId: ''
})

const gridOptions = reactive({
  border: true,
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
  filterConfig: {
    remote: true
  },
  pagerConfig: {
    //控制是否可以分頁
    enabled: true,
    pageSize: 10
  },
  exportConfig: {},
  columns: [
    //控制欄位項目與屬性
    { field: "MemberId", title: "會員編號" },
    { field: "Name", title: "會員姓名" },
    { field: "Email", title: "電子郵箱" },
    { field: "Info", title: "會員狀態", slots: { default: "view" } },
    { title: "動作", slots: { default: "action" } },
  ],
  toolbarConfig: {
    slots: {
      buttons: 'toolbar_buttons',
      tools: 'toolbar_tools',
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
    filter: true,
    props: {
      result: "result",
      total: "page.total",
    },
    ajax: {
      // 接收 Promise
      query: async ({ page, filters }) => {
        const queryParams = Object.assign({}, formData);

        filters.forEach(({ field, values }) => {
          queryParams[field] = values.join(',')
        })

        await new Promise((resolve) => setTimeout(resolve, 10));
        const res = await fetch(
          `/thd102/g2/php/MemberTable/select.php?currentPage=${page.currentPage}&pageSize=${page.pageSize}&${XEUtils.serialize(queryParams)}`
        );

        const data = await res.json();
        const result = data.result.map((item) => ({
          MemberId: formatValue(item.ID, 'MB'),
          Name: item.NAME,
          Email: item.EMAIL,
          Info: formatInfo(item.STATUS)
        }));
        const total = data.page.totalPages;

        return { result, page: { total } }
      },
    },
  },
});

function formatValue(value, tittle) {
  const outPutValue = value.toString().padStart(5, "0");
  return `${tittle}${outPutValue}`;
}

function formatInfo(value){
  switch (value){
    case '正常':
      return 0;
    case '停權':
      return 1;
    case '黑名單':
      return 2;
    default:
      return 3;
  }
}

const searchEvent = () => {
  const $grid = xGrid.value
  if ($grid) {
    $grid.commitProxy('query')
  }
}
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
