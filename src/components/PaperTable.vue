<template>
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions">


      <template #toolbar_tools>
        <vxe-form :data="formData" @submit="searchEvent">
          <vxe-form-item field="name">
            <template #default>
              <vxe-input v-model="formData.ReportId" type="text" placeholder="請輸入會員編號"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template #default>
              <vxe-button type="submit" status="primary" content="查詢"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
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
import { reactive, ref } from "vue";
import XEUtils from 'xe-utils';

const xGrid = ref();
const formData = reactive({
  ReportId: ''
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
    pageSize: 10,
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
      query: async ({ page, filters }) => {
        const queryParams = Object.assign({}, formData);

        filters.forEach(({ field, values }) => {
          queryParams[field] = values.join(',')
        })

        await new Promise((resolve) => setTimeout(resolve, 10)); // 延遲10毫秒
        // 在xampp部屬時要更改為/php/index.php
        const response = await fetch(
          `/thd102/g2/php/ReportsTable/select.php?currentPage=${page.currentPage}&pageSize=${page.pageSize}&${XEUtils.serialize(queryParams)}`
        );

        const data = await response.json();
        const result = data.result.map((item) => ({
          ReportDate: item.REPORTSDATE,
          ReportId: formatValue(item.REPORTSMEMBER_ID, 'MB'),
          MemberId: formatValue(item.MEMBER_ID, 'MB'),
          ReportEmail: item.EMAIL,
          PostDate: item.POSTDATE,
          Info: item.MODE = 0 ? true: false
        }));
        const total = data.page.totalPages;

        return { result, page: { total } };
      },
    },
  },
});

function formatValue(value, tittle) {
  const outPutValue = value.toString().padStart(5, "0");
  return `${tittle}${outPutValue}`;
}

const searchEvent = () => {
  const $grid = xGrid.value
  if ($grid) {
    $grid.commitProxy('query')
  }
}
// const resetEvent = () => {
//   const $grid = xGrid.value
//   if ($grid) {
//     $grid.commitProxy('reload')
//   }
// }

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
