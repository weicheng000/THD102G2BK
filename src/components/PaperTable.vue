<template>
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions">


      <template #toolbar_tools>
        <vxe-form :data="formData">
          <vxe-form-item field="ReportId" @submit="searchEvent" @reset="resetEvent">
            <template #default>
              <vxe-input v-model="formData.ReportId" type="text" placeholder="請輸入檢舉者會員編號"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template #default>
              <vxe-button type="submit" status="primary" content="查詢"></vxe-button>
              <vxe-button type="reset" content="重置"></vxe-button>
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

const xGrid = ref();
const formData = reactive({
  ReportId: ''
})

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
    props: {
      result: "result",
      total: "page.total",
    },
    ajax: {
      query: async ({ page }) => {
        console.log("currentPage:", page.currentPage);
        console.log("pageSize:", page.pageSize);
        await new Promise((resolve) => setTimeout(resolve, 10)); // 延遲10毫秒
        // 在xampp部屬時要更改為/php/index.php
        const response = await fetch(
          `PHP/index.php?currentPage=${page.currentPage}&pageSize=${page.pageSize}`
        );

        const data = await response.json();
        const result = data.result;
        const total = data.page.totalPages;

        return { result, page: { total } };
      },
    },
  },
});

const searchEvent = () => {
  const $grid = xGrid.value
  if ($grid) {
    console.log($grid);
    $grid.commitProxy('query')
  }
}
const resetEvent = () => {
  const $grid = xGrid.value
  if ($grid) {
    $grid.commitProxy('reload')
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
