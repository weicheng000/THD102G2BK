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

      <template #view="{ row }">
        <vxe-button status="primary" icon="vxe-icon-picture-fill" @click="val1 = true, modalShow(row)" circle></vxe-button>
      </template>

      <template #action="{ row }">
        <vxe-button type="text" icon="vxe-icon-warnion-circle-fill" content="下架" @click="toggle(row)"
          :disabled="row.Info == 0"></vxe-button>
        <vxe-button type="text" icon="vxe-icon-check" status="primary" content="復原" @click="toggle(row)"
          :disabled="row.Info == 1"></vxe-button>
      </template>
    </vxe-grid>

    <vxe-modal v-model="val1" title="圖片檢視" max-height="600" title-visible="false" mask-closable="true" resize destroy-on-close>
      <template #default>
        <div class="row justify-content-center">
          <img :src="modalData.src" alt="" class="inside">
        </div>
      </template>
    </vxe-modal>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { VXETable } from 'vxe-table'
import XEUtils from 'xe-utils';

const xGrid = ref();
const formData = reactive({
  ReportId: ''
})
const val1 = ref(false);
const modalData = reactive({
  src: '',
  ID:''
});

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
    { title: "圖片", slots: { default: "view" }, align: "center", width: "60px" },
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
          PaperId: item.STICKERS_ID,
          ReportDate: item.REPORTSDATE,
          ReportId: item.REPORTSMEMBER_ID,
          PhotoSrc: item.PIC,
          MemberId: item.MEMBER_ID,
          ReportEmail: item.EMAIL,
          PostDate: item.POSTDATE,
          Info: item.MODE = 0 ? true : false
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

const modalShow = (row) => {
  modalData.src = row.PhotoSrc;
  modalData.ID = row.PaperId
}


const toggle = (row) => {
  row.Info = !row.Info;
  const result = {
    token: row.PaperId,
    key: row.Info ? 1 : 0
  }
  console.log(result);

  fetch('/thd102/g2/php/ReportsTable/toggle.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  }).then(res => res.json()).then(data => {
    if (data.status === 'success') {
      const actionName = row.Info === true ? "上架" : "下架";
      VXETable.modal.message({ content: `${actionName}貼文編號: ${row.PaperId} 成功`, status: 'success' });
    } else {
      VXETable.modal.message({ content: `修改貼文編號: ${row.PaperId} 失敗`, status: 'error' });
    }
  }).catch((error) => {
    VXETable.modal.message({ content: `修改貼文編號: ${row.PaperId} 失敗`, status: 'error' });
  })
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
.inside{
  width: 100%;
}
</style>
