<template>
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions">

      <template #toolbar_tools>
        <vxe-form :data="formData" @submit="searchEvent">
          <vxe-form-item field="name">
            <template #default>
              <vxe-input v-model="formData.id" type="text" placeholder="請輸入會員編號"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template #default>
              <vxe-button type="submit" status="primary" content="查詢"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>

      <template #memberId="{ row }">
        <span>
          {{ formatValue(row.id, "MB") }}
        </span>
      </template>

      <template #view="{ row }">
        <!-- 自定義的按鈕或其他內容 -->
        <span v-if="row.status == '停權'">停權</span>
        <span v-if="row.status == '黑名單'">黑名單</span>
        <span v-if="row.status == '正常'">正常</span>
      </template>
      <template #action="{ row }">
        <select class="form-select" v-model="row.status" @change="changeEvents(row)">
          <option value="正常" :selected="row.status == '正常'">正常</option>
          <option value="停權" :selected="row.status == '停權'">停權</option>
          <option value="黑名單" :selected="row.status == '黑名單'">黑名單</option>
        </select>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { VXETable } from "vxe-table";
import XEUtils from 'xe-utils';
const xGrid = ref();

const formData = reactive({
  id: ''
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
    { field: "id", title: "會員編號", slots:{ default: "memberId"}},
    { field: "name", title: "會員姓名" },
    { field: "email", title: "電子郵箱" },
    { field: "status", title: "會員狀態", slots: { default: "view" } },
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
        const queryParams = { ...formData};

        filters.forEach(({ field, values }) => {
          queryParams[field] = values.join(',')
        })

        await new Promise((resolve) => setTimeout(resolve, 10));
        const res = await fetch(
          `/api/members/page/${page.currentPage}/${page.pageSize}?${XEUtils.serialize(queryParams)}`
        );

        const response = await res.json();
        
        if(response.code === 1){
          const result = response.data.rows;
          const total = response.data.total;
          return { result, page: { total } }
        }
      },
    },
  },
});

/**
 * 美化資料的方法
 * 私心非常想刪除... <Jason>
 * @param {Number} value 傳入的值
 * @param {String} tittle 要給他加上的開頭
 * @param {String} return 還你一個擴充為5位數加上title的字串 Ex: 1 => MB00001
 */
function formatValue(value, tittle) {
  const outPutValue = value.toString().padStart(5, "0");
  return `${tittle}${outPutValue}`;
}

/**
 * 主表查詢功能
 * 在vxe-grid外調用vxe-grid的proxy方法
 */
const searchEvent = () => {
  const $grid = xGrid.value
  if ($grid) {
    $grid.commitProxy('query')
  }
}

/**
 * 從主表修改會員狀態
 * @param {Array<Row>} row 主表中的資料
 */
const changeEvents = (row) => {
  const result = {
    id: row.id,
    status: row.status
  }
  
  fetch('/api/members', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  }).then(res => res.json()).then(data => {
    if (data.code === 1) {
      VXETable.modal.message({ content: `更改會員 ${row.name} 狀態為 ${row.status} 成功`, status: 'success' });
    } else {
      VXETable.modal.message({ content: `更改會員 ${row.name} 狀態失敗`, status: 'error' });
    }
  }).catch((error) => {
    VXETable.modal.message({ content: `更改會員 ${row.name} 狀態失敗`, status: 'error' });
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
</style>
