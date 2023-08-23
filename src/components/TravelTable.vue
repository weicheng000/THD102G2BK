<template>
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-input type="text" placeholder="請輸入名稱"></vxe-input>
        <vxe-button status="primary">查詢</vxe-button>
        <vxe-button icon="vxe-icon-square-plus" @click="insertEvent()"
          >新增旅宿</vxe-button
        >
      </template>

      <template #toolbar_tools>
        <vxe-form>
          <vxe-form-item>
            <template>
              <vxe-input type="text" placeholder="請输入名稱"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template>
              <vxe-button
                type="submit"
                status="primary"
                content="查詢"
              ></vxe-button>
              <vxe-button type="reset" content="重置"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
      <template #view="{ row }">
        <!-- 自定義的按鈕或其他內容 -->
        <span v-if="row.Info === false">已下架</span>
        <span v-else>上架中</span>
      </template>
      <template #edit="{ row }">
        <vxe-switch v-model="row.Info"></vxe-switch>
      </template>
      <template #icon="{ row }">
        <vxe-button @click="showdetail(row)" circle
          ><i class="vxe-icon-edit"></i
        ></vxe-button>
      </template>
    </vxe-grid>

    <!-- 第一彈窗 測試用 -->
    <vxe-modal
      v-model="showDetails"
      title="旅宿詳情"
      width="600"
      height="500"
      show-footer
    >
      <template #default>
        <h6>請雙擊欄位以啟用編輯模式</h6>
        <vxe-table
          border="inner"
          auto-resize
          show-overflow
          height="auto"
          ref="xTable"
          :row-config="{ isHover: true }"
          :show-header="false"
          :sync-resize="showDetails"
          :edit-config="{ trigger: 'dblclick', mode: 'cell' }"
          :data="detailData"
        >
          <vxe-column field="label" width="25%"></vxe-column>
          <vxe-column field="value" :edit-render="{}">
            <template #edit="{ row }">
              <vxe-input
                v-model="row.value"
                type="text"
                placeholder="{ row }"
              ></vxe-input>
            </template>
          </vxe-column>
        </vxe-table>
      </template>
    </vxe-modal>

    <!-- 真 彈窗 實際開發用 -->
    <vxe-modal
      title="新增旅宿"
      v-model="showEdit"
      width="1000"
      resize
      destroy-on-close
    >
      <template #default>
        <vxe-form>
          <vxe-form-item
            title="旅宿基本資料"
            title-align="left"
            :title-width="200"
            :span="24"
            :title-prefix="{ icon: 'vxe-icon-comment' }"
          ></vxe-form-item>

          <vxe-form-item
            field="name"
            title="旅宿名稱:"
            :span="12"
            :item-render="{}"
          >
            <template #default>
              <vxe-input placeholder="請輸入旅宿名稱"></vxe-input>
            </template>
          </vxe-form-item>

          <vxe-form-item
            field="Address"
            title="旅宿地址:"
            :span="12"
            :item-render="{}"
          >
            <template #default>
              <vxe-input placeholder="請輸入地址"></vxe-input>
            </template>
          </vxe-form-item>

          <vxe-form-item
            field="RomeType"
            title="房型:"
            :span="12"
            :item-render="{}"
          >
            <template #default>
              <vxe-checkbox-group v-model="val1">
                <vxe-checkbox label="1" content="狗套房"></vxe-checkbox>
                <vxe-checkbox label="2" content="貓套房"></vxe-checkbox>
              </vxe-checkbox-group>
            </template>
          </vxe-form-item>

          <vxe-form-item
            field="RomeSet"
            title="設施:"
            :span="12"
            :item-render="{}"
          >
            <template #default>
              <vxe-checkbox-group v-model="val2">
                <vxe-checkbox label="1" content="衛生"></vxe-checkbox>
                <vxe-checkbox label="2" content="冷氣"></vxe-checkbox>
                <vxe-checkbox label="3" content="監控"></vxe-checkbox>
                <vxe-checkbox label="4" content="濕度"></vxe-checkbox>
                <vxe-checkbox label="5" content="濾水器"></vxe-checkbox>
              </vxe-checkbox-group>
            </template>
          </vxe-form-item>

          <vxe-form-item
            field="RomeSet"
            title="旅宿環境:"
            :span="24"
          ></vxe-form-item>

          <vxe-form-item :span="24">
            <template #default>
              <div class="row justify-content-between p-3">
                <drag-image></drag-image>
                <drag-image></drag-image>
                <drag-image></drag-image>
                <drag-image></drag-image>
                <drag-image></drag-image>
              </div>
            </template>
          </vxe-form-item>

          <vxe-form-item
            title="旅館簡介"
            title-align="left"
            :title-width="200"
            :span="24"
            :title-prefix="{
              message: '請注意字數不得超過125字',
              icon: 'vxe-icon-info-circle-fill',
            }"
          ></vxe-form-item>

          <vxe-form-item field="Comment" :span="24" :item-render="{}">
            <template #default>
              <vxe-textarea
                :autosize="{ minRows: 4, maxRows: 7 }"
                :show-word-count="true"
                placeholder="請輸入..."
                :maxlength="125"
              ></vxe-textarea>
            </template>
          </vxe-form-item>

          <vxe-form-item align="center" title-align="left" :span="24">
            <template #default>
              <vxe-button type="submit">提交</vxe-button>
              <vxe-button type="reset">重置</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-modal>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import XEUtils from "xe-utils";
import DragImage from "./DragImage.vue";

const val1 = ref([]);
const val2 = ref([]);

const showDetails = ref(false);
const detailData = ref([]);
const xTable = ref();
const xGrid = ref();
const selectRow = ref();
const showEdit = ref(false);

// 模擬分頁接口
const fetchApi = (currentPage, pageSize) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = [
        {
          HotelId: "SH00001",
          HotelName: "快樂寵物旅館",
          Info: true,
          Address: "新北市三峽區大學路126號",
          RoomType: "狗套房,貓套房",
          RomeSet: "衛生,冷氣,監控,濕度,濾水器",
          Comment: "歡迎寵物入住，環境舒適，設施齊全。",
        },
        {
          HotelId: "SH00002",
          HotelName: "狗狗假期",
          Info: false,
          Address: "台北市中山區中山北路100號",
          RoomType: "狗套房",
          RomeSet: "衛生,冷氣",
          Comment: "專業照顧狗狗，提供優質住宿環境。",
        },
        {
          HotelId: "SH00003",
          HotelName: "貓咪天地",
          Info: true,
          Address: "新竹市東區光復路200號",
          RoomType: "貓套房",
          RomeSet: "監控,濕度",
          Comment: "寵物貓專屬的度假天堂，您的貓會愛上這裡。",
        },
        {
          HotelId: "SH00004",
          HotelName: "寵物樂園",
          Info: false,
          Address: "台中市西區中興街50號",
          RoomType: "狗套房,貓套房",
          RomeSet: "濾水器",
          Comment: "讓寵物在這裡玩得開心，是最好的選擇。",
        },
        {
          HotelId: "SH00005",
          HotelName: "愛心寵物屋",
          Info: true,
          Address: "高雄市左營區博愛路300號",
          RoomType: "狗套房,貓套房",
          RomeSet: "衛生,濕度,玩具",
          Comment: "我們以愛心照顧每一隻寵物，讓牠們感受到家的溫馨。",
        },
        {
          HotelId: "SH00006",
          HotelName: "快樂動物城",
          Info: false,
          Address: "台南市中西區民權路10號",
          RoomType: "狗套房,貓套房",
          RomeSet: "衛生,冷氣,監控",
          Comment: "動物王國，讓寵物們過上快樂的生活。",
        },
        {
          HotelId: "SH00007",
          HotelName: "愛寵家園",
          Info: true,
          Address: "基隆市安樂區和一路500號",
          RoomType: "狗套房",
          RomeSet: "衛生,冷氣,濕度,濾水器,玩具",
          Comment: "這裡是您寵物的第二個家，期待與您見面。",
        },
        {
          HotelId: "SH00008",
          HotelName: "小動物樂園",
          Info: false,
          Address: "桃園市中壢區中大路800號",
          RoomType: "貓套房",
          RomeSet: "衛生,濕度",
          Comment: "專為小動物打造的樂園，讓牠們玩得盡興。",
        },
        {
          HotelId: "SH00009",
          HotelName: "寵物夢想家",
          Info: true,
          Address: "新竹縣竹北市文化路20號",
          RoomType: "狗套房,貓套房",
          RomeSet: "冷氣,監控,濕度,濾水器,食物供應",
          Comment: "我們的目標是實現您和寵物的夢想，一同共創美好回憶。",
        },
        {
          HotelId: "SH00010",
          HotelName: "歡樂寵物園",
          Info: false,
          Address: "彰化縣彰化市成功路100號",
          RoomType: "貓套房",
          RomeSet: "冷氣,監控,濿水器",
          Comment: "在這裡，每一個寵物都能找到屬於自己的快樂。",
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
  height: 600,
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
    pageSize: 10
  },
  exportConfig: {},
  columns: [
    //控制欄位項目與屬性
    { field: "HotelId", title: "旅宿編號" },
    { field: "HotelName", title: "旅宿名稱" },
    { field: "Info", title: "上架狀態", slots: { default: "view" } },
    {
      field: "",
      title: "上/下架",
      slots: { default: "edit" },
      align: "center",
    },
    { field: "", title: "編輯", slots: { default: "icon" }, align: "center" },
  ],
  toolbarConfig: {
    slots: {
      buttons: "toolbar_buttons",
      tools: "toolbar_tools",
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
// 彈窗查看詳情&編輯&保存邏輯
const showdetail = (row) => {
  // console.log(row);
  detailData.value = [
    "HotelId",
    "HotelName",
    "Address",
    "RoomType",
    "RomeSet",
    "Comment",
  ].map((field) => {
    return { label: field, value: row[field] };
  });
  selectRow.value = row;
  showDetails.value = true;
};

const insertEvent = () => {
  // Object.assign(formData, {
  //   HotelId: 0,
  //   HotelName: '',
  //   Address: '',
  //   RoomType: [],
  //   RomeSet: [],
  //   Comment: "",
  // })
  showEdit.value = true;
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
.preview {
  width: 173px;
  height: 156px;
  background-color: blue;
}
</style>
