<template>
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions">

      <template #toolbar_buttons>
        <vxe-button icon="vxe-icon-square-plus" @click="insertEvent()">新增旅宿</vxe-button>
      </template>

      <template #toolbar_tools>
        <vxe-form :data="formData" @submit="searchEvent">
          <vxe-form-item field="name">
            <template #default>
              <vxe-input v-model="formData.HotelId" type="text" placeholder="請輸入編號"></vxe-input>
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
        <span v-if="row.Info === false">已下架</span>
        <span v-else>上架中</span>
      </template>
      <template #edit="{ row }">
        <vxe-switch v-model="row.Info" @click="toggleInfo(row)"></vxe-switch>
      </template>
      <template #icon="{ row }">
        <vxe-button @click="editEvent(row)" circle><i class="vxe-icon-edit"></i></vxe-button>
      </template>
    </vxe-grid>

    <!-- 真 彈窗 實際開發用 -->
    <vxe-modal :title="selectColumn ? '编辑&保存' : '新增&保存'" v-model="showEdit" width="1000" resize destroy-on-close>
      <template #default>
        <vxe-form :data="newformData" @submit="submitEvent">
          <vxe-form-item title="旅宿基本資料" title-align="left" :title-width="200" :span="24"
            :title-prefix="{ icon: 'vxe-icon-comment' }"></vxe-form-item>

          <vxe-form-item field="name" title="旅宿名稱:" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.HotelName" placeholder="請輸入旅宿名稱"></vxe-input>
            </template>
          </vxe-form-item>

          <vxe-form-item field="Address" title="旅宿地址:" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.Address" placeholder="請輸入地址"></vxe-input>
            </template>
          </vxe-form-item>

          <vxe-form-item field="RomeType" title="房型:" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-checkbox-group v-model="data.RoomType">
                <vxe-checkbox label="狗套房" content="狗套房"></vxe-checkbox>
                <vxe-checkbox label="貓套房" content="貓套房"></vxe-checkbox>
              </vxe-checkbox-group>
            </template>
          </vxe-form-item>

          <vxe-form-item field="RomeSet" title="設施:" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-checkbox-group v-model="data.RomeSet">
                <vxe-checkbox label="衛生" content="衛生"></vxe-checkbox>
                <vxe-checkbox label="冷氣" content="冷氣"></vxe-checkbox>
                <vxe-checkbox label="監控" content="監控"></vxe-checkbox>
                <vxe-checkbox label="濕度" content="濕度"></vxe-checkbox>
                <vxe-checkbox label="濾水器" content="濾水器"></vxe-checkbox>
              </vxe-checkbox-group>
            </template>
          </vxe-form-item>

          <vxe-form-item title="旅宿環境:" :span="24"></vxe-form-item>

          <vxe-form-item :span="24">
            <template #default="{ data }">
              <div class="row justify-content-between p-3">
                <drag-image ref="imageRefs" v-for="(item, index) in imageComponents" :key="index" :name="item.name"
                  :url="data.PicUrl[index]"></drag-image>
              </div>
            </template>
          </vxe-form-item>

          <vxe-form-item title="旅館簡介" title-align="left" :title-width="200" :span="24" :title-prefix="{
            message: '請注意字數不得超過125字',
            icon: 'vxe-icon-info-circle-fill',
          }"></vxe-form-item>

          <vxe-form-item field="Comment" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-textarea v-model="data.Comment" :autosize="{ minRows: 4, maxRows: 7 }" :show-word-count="true"
                placeholder="請輸入..." :maxlength="125"></vxe-textarea>
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
/**
 * 這頁設計的其實挺失敗的，為了省事強行將兩頁內容合成一頁實在不是明智之舉
 * 應該把彈窗的Code獨立成一個組件
 * 如果還沒找到工作，就接著改吧... 2023/10/11
 */
import { reactive, ref } from "vue";
import XEUtils from "xe-utils"; // 處理 String 的工具，這裡主要用來將物件快速轉換為queryParam
import DragImage from "./DragImage.vue"; // 拖動圖片的插件，手刻，包擴上傳圖片的功能
import { VXETable } from "vxe-table";

const xGrid = ref();
const selectColumn = ref();
const showEdit = ref(false);
const newEvents = ref(true);

const formData = reactive({
  HotelId: '',
  HotelName: '',
  Info: '',
  Address: '',
  RoomType: [],
  RomeSet: [],
  Comment: '',
  PicUrl: []
});

const newformData = reactive({
  HotelId: '',
  HotelName: '',
  Info: '',
  Address: '',
  RoomType: [],
  RomeSet: [],
  Comment: '',
  PicUrl: []
});


const imageRefs = ref([]); // 用于存储子组件的引用的数组

// 创建一个数组来模拟多个子组件
const imageComponents = [
  { name: '01' },
  { name: '02' },
  { name: '03' },
  { name: '04' },
  { name: '05' }
];

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
  editConfig: {
    trigger: 'manual',
    mode: 'row',
    showStatus: true
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
    filter: true,
    form: true,
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
          `/api/hotels/page/${page.currentPage}/${page.pageSize}?${XEUtils.serialize(queryParams)}`
        )
        const response = await res.json();
        // todo: need to join images table
        if (response.code === 1) {

          const result = response.data.rows.map((item) => ({
            HotelId: item.id,
            HotelName: item.hotelName,
            Info: item.mode == "1" ? true : false,
            Address: item.hotelAddress,
            RoomType: [
              item.dogRoom == "1" ? '狗套房' : '', item.catRoom == "1" ? '貓套房' : ''],
            RomeSet: [
              item.san == "1" ? '衛生' : '',
              item.ac == "1" ? '冷氣' : '',
              item.cctv == "1" ? '監控' : '',
              item.hum == "1" ? '濕度' : '',
              item.wf == "1" ? '濾水器' : ''
            ],
            Comment: item.hotelInfo,
          }));

          const total = response.data.total;

          return { result, page: { total } }
        }
      }
    },
  },
});

/**
 * 搜索功能，直接映射到vxe-grid的proxy的設定
 */
const searchEvent = () => {
  const $grid = xGrid.value
  if ($grid) {
    $grid.commitProxy('query')
  }
}

/**
 * 修改現有旅館時導入數據的方法
 * @param {Array<Row>} row 從主表導入的資料
 */
const editEvent = (row) => {
  Object.assign(newformData, row);
  selectColumn.value = row;
  showEdit.value = true;
  newEvents.value = true;
};

/**
 * 開啟新增旅館按鍵時進行初始化操作
 */
const insertEvent = () => {
  Object.assign(newformData, {
    HotelId: '',
    HotelName: '',
    Info: '',
    Address: '',
    RoomType: [],
    RomeSet: [],
    Comment: '',
  });
  selectColumn.value = null;
  showEdit.value = true;
  newEvents.value = false;
};


/**
 * 提交功能
 * 寫得那麼長看的煩 <Jason>
 */
const submitEvent = async () => {
  const $grid = xGrid.value;
  if ($grid) {
    /**
     * 別在意這個判斷，變數是錯的，但結果是對的懶得改了
     */
    if (newEvents.value === false) {
      /**
       * 此段為新增操作
       */
      showEdit.value = false;
      const returnData = {
        hotelName: newformData.HotelName,
        mode: 1,
        hotelAddress: newformData.Address,
        dogRoom: newformData.RoomType.includes('狗套房') ? 1 : 0,
        catRoom: newformData.RoomType.includes('貓套房') ? 1 : 0,
        san: newformData.RomeSet.includes('衛生') ? 1 : 0,
        ac: newformData.RomeSet.includes('冷氣') ? 1 : 0,
        cctv: newformData.RomeSet.includes('監控') ? 1 : 0,
        hum: newformData.RomeSet.includes('濕度') ? 1 : 0,
        wf: newformData.RomeSet.includes('濾水器') ? 1 : 0,
        hotelInfo: newformData.Comment,
      };

      try {
        const response = await fetch('/thd102/g2/php/TourTable/alter.php', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(returnData),
        });

        const data = await response.json();

        if (data.status === 'success') {
          VXETable.modal.message({ content: `新增旅宿:${JSON.stringify(returnData.HotelName)}`, status: 'success' });

          const newID = data.newID

          const returnUrl = [];

          for (const imageRef of imageRefs.value) {
            if (imageRef) {
              const result = await imageRef.uploadImage();
              returnUrl.push(result);
            }
          }

          VXETable.modal.message({ content: `旅宿:${JSON.stringify(returnData.HotelName)} 圖片已上傳`, status: 'success' });

          const InsertPicData = {
            hotelid: newID,
            url: returnUrl
          }

          insertPic(InsertPicData);

        } else {
          return;
        }
      } catch (error) {
        console.error('Error:', error);
        VXETable.modal.message({ content: '新增旅宿失敗', status: 'error' });
      }
    } else {
      /**
       * 此段為修改操作
       */
      Object.assign(selectColumn.value, newformData);
      showEdit.value = false;
      const returnData = {
        HotelId: newformData.HotelId,
        HotelName: newformData.HotelName,
        Address: newformData.Address,
        DOGROOM: newformData.RoomType.includes('狗套房') ? 1 : 0,
        CATROOM: newformData.RoomType.includes('貓套房') ? 1 : 0,
        SAN: newformData.RomeSet.includes('衛生') ? 1 : 0,
        AC: newformData.RomeSet.includes('冷氣') ? 1 : 0,
        CCTV: newformData.RomeSet.includes('監控') ? 1 : 0,
        HUM: newformData.RomeSet.includes('濕度') ? 1 : 0,
        WF: newformData.RomeSet.includes('濾水器') ? 1 : 0,
        Comment: newformData.Comment,
      };

      try {
        const response = await fetch('/thd102/g2/php/TourTable/alter.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(returnData),
        });

        if (!response.ok) {
          throw new Error('网络请求失败');
        }

        const data = await response.json();

        if (data.status === 'success') {
          VXETable.modal.message({ content: `修改旅宿:${JSON.stringify(returnData.HotelName)}`, status: 'success' });

          const returnUrl = [];

          for (const imageRef of imageRefs.value) {
            if (imageRef) {
              const result = await imageRef.uploadImage();
              returnUrl.push(result);
            }
          }

          VXETable.modal.message({ content: `旅宿:${JSON.stringify(returnData.HotelName)} 圖片已上傳`, status: 'success' });

          const InsertPicData = {
            hotelid: returnData.HotelId,
            url: returnUrl
          }

          insertPic(InsertPicData);

        } else {
          return;
        }
      } catch (error) {
        console.error('Error:', error);
        VXETable.modal.message({ content: `修改旅宿: ${JSON.stringify(returnData.HotelName)} 失敗`, status: 'error' });
      }
    }
  }
};

/**
 * 修改主表的會員狀態
 * @param {Array<Row>} row 從主表傳入的資料
 */
const toggleInfo = (row) => {
  /**
   * 什麼傻逼，前後端用不同格式的名字
   * 常量才用全大寫，資料庫從設計就是全大寫
   * 搞得我500行Code有一半的篇幅在處理資料格式
   * 不管哪家套件的自動裝箱都處理不了這種屎命名
   * 硬生生手刻，簡稱為搬磚
   * 重寫到這，實在忍不了了，小噴一波不留名
   */
  !row.Info;
  const result = {
    id: row.HotelId,
    mode: row.Info ? 1 : 0
  }
  fetch('/api/hotels', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  }).then(res => res.json()).then(data => {
    if (data.code === 1) {
      const actionName = row.Info === true ? "上架" : "下架";
      VXETable.modal.message({ content: `${actionName}旅宿: ${row.HotelName} 成功`, status: 'success' });
    } else {
      VXETable.modal.message({ content: `修改旅宿: ${row.HotelName} 失敗， ${data.msg}`, status: 'error' });
    }
  }).catch((error) => {
    VXETable.modal.message({ content: `修改旅宿: ${row.HotelName} 失敗`, status: 'error' });
  })
}

/**
 * 新增旅館的方法
 * @param {Array<Row>} array 
 */
const insertPic = async (array) => {
  try {
    const response = await fetch('/thd102/g2/php/TourTable/insertPic.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(array),
    });

    if (!response.ok) {
      throw new Error('網路連線失敗');
    }

    const res = await response.json();

    if (res.status === 'success') {
      VXETable.modal.message({ content: '圖片路徑上傳完成', status: 'success' });
    } else {
      VXETable.modal.message({ content: '圖片路徑上傳失敗,請聯絡工作人員', status: 'error' });
    }

  } catch (error) {
    console.error('Error:', error);
    // 在失敗時顯示錯誤消息
    VXETable.modal.message({ content: '發送請求失敗', status: 'error' });
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

.preview {
  width: 173px;
  height: 156px;
  background-color: blue;
}
</style>
