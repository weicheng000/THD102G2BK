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
              <vxe-input v-model="formData.ID" type="text" placeholder="請輸入訂單編號"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template #default>
              <vxe-button type="submit" status="primary" content="查詢"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>

      <template #OrderId="{ row }">
        <!-- 自定義的按鈕或其他內容 -->
        <span>{{ formatValue(row.ID, "OR") }}</span>
      </template>

      <template #MemberId="{ row }">
        <!-- 自定義的按鈕或其他內容 -->
        <span>{{ formatValue(row.MEMBER_ID, "MB") }}</span>
      </template>

      <template #view="{ row }">
        <!-- 自定義的按鈕或其他內容 -->
        <button type="button" class="btn btn-link" :disabled="row.ORDERSTAUS === '待審核'"
          @click="toPage(row.ID, row.ORDERSTAUS, row.MEMBER_ID)">
          <i class="vxe-icon-eye-fill"></i>
        </button>
      </template>
      <template #text="{ row }">
        <!-- 自定義的按鈕或其他內容 -->
        <button v-if="row.ORDERSTAUS === '待審核'" type="button" class="btn btn-link"
          @click="toPage(row.ID, row.ORDERSTAUS, row.MEMBER_ID)">
          待審核
        </button>
        <span v-else>{{ row.ORDERSTAUS }}</span>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import XEUtils from 'xe-utils';

const xGrid = ref();

const formData = reactive({
  ID: ''
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
    { field: "ID", title: "訂單編號", slots: { default: "OrderId" } },
    {
      field: "MEMBER_ID",
      title: "訂購人會員編號",
      slots: { default: "MemberId" },
    },
    { field: "ORDERDATE", title: "訂單日期" },
    { field: "ORDERSTAUS", title: "查看", slots: { default: "view" } },
    { field: "", title: "狀態", slots: { default: "text" } },
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
          `/thd102/g2/php/OrderTable/select.php?currentPage=${page.currentPage}&pageSize=${page.pageSize}&${XEUtils.serialize(queryParams)}`
        );

        const data = await res.json();
        const result = data.result;
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

// 跳頁邏輯
const router = useRouter();

const toPage = (orderId, info, memberId) => {
  router.push({ name: "OrderList", params: { OrderId: orderId, Info: info, MemberId: memberId } });
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
