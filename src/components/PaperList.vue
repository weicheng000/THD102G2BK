<template>
    <div>
        <vxe-grid ref="xGrid" v-bind="gridOptions">

            <template #toolbar_tools>
                <vxe-form :data="formData" @submit="searchEvent">
                    <vxe-form-item field="name">
                        <template #default>
                            <vxe-input v-model="formData.MEMBER_ID" type="text" placeholder="請輸入上傳者會員編號"></vxe-input>
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
                <img :src="row.PIC" alt="" class="inside">
            </template>

            <template #status="{ row }">
                <vxe-switch v-model="row.MODE" @click="toggleInfo(row)" size="medium" open-label="上架中" close-label="已下架"></vxe-switch>
            </template>

        </vxe-grid>
    </div>
</template>
  
<script setup>
import { reactive, ref } from 'vue'
import { VXETable } from "vxe-table";
import XEUtils from 'xe-utils';
const xGrid = ref();

const formData = reactive({
    MEMBER_ID: ''
})

const gridOptions = reactive({
    border: true,
    rowConfig: {
        keyField: 'id'
    },
    columnConfig: {
        resizable: true
    },
    filterConfig: {
        remote: true
    },
    checkboxConfig: {
        reserve: true
    },
    pagerConfig: {
        enabled: true,
        pageSize: 10
    },
    columns: [
        { field: 'PIC', title: '圖片', slots: { default: "view" }, height: "100px", align: "center" },
        { field: 'ID', title: '圖片編號', align: "center" },
        { field: 'POSTDATE', title: '上架日期', align: "center" },
        { field: 'MODE', title: '狀態', slots: { default: "status" }, align: "center" },
        { field: 'MEMBER_ID', title: '發文者', align: "center" }
    ],
    toolbarConfig: {
        slots: {
            buttons: "toolbar_buttons",
            tools: "toolbar_tools",
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
            result: 'result',
            total: 'page.total'
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
                    `/thd102/g2/php/ReportsTable/selectAll.php?currentPage=${page.currentPage}&pageSize=${page.pageSize}&${XEUtils.serialize(queryParams)}`
                )
                const data = await res.json();
                // todo: need to join images table
                const result = data.result.map((item) => ({
                    PIC: item.PIC,
                    ID: item.ID,
                    POSTDATE: item.POSTDATE,
                    MODE: item.MODE == 1 ? true : false,
                    MEMBER_ID: item.MEMBER_ID
                }));
                const total = data.page.totalPages;

                return { result, page: { total } }
            },
        }
    }
})

const searchEvent = () => {
  const $grid = xGrid.value
  if ($grid) {
    $grid.commitProxy('query')
  }
}

const toggleInfo = (row) => {
  !row.MODE;
  const result = {
    token: row.ID,
    key: row.MODE ? 1 : 0
  }
  fetch('/thd102/g2/php/ReportsTable/selectAlltogle.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  }).then(res => res.json()).then(data => {
    if (data.status === 'success') {
      const actionName = row.MODE === true ? "上架" : "下架";
      VXETable.modal.message({ content: `${actionName}貼文編號: ${row.ID} 成功`, status: 'success' });
    } else {
      VXETable.modal.message({ content: `修改貼文編號: ${row.ID} 失敗`, status: 'error' });
    }
  }).catch((error) => {
    VXETable.modal.message({ content: `修改貼文編號: ${row.ID} 失敗`, status: 'error' });
  })
}
</script>
<style scoped>
.inside {
    max-width: 100%;
    height: 100%;
}
</style>