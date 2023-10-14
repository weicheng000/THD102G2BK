<template>
    <div>
        <vxe-modal @close="handleModalClose"
            :title="$props.initialData.HotelId == null ? '编辑&保存' : '新增&保存'" v-model="$props.isShow" width="1000" resize destroy-on-close>
            <template #default>
                <vxe-form :data="$props.initialData" @submit="submitEvent">
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
                                <drag-image ref="imageRefs" v-for="(item, index) in imageComponents" :key="index"
                                    :name="item.name" :url="data.PicUrl[index]"></drag-image>
                            </div>
                        </template>
                    </vxe-form-item>

                    <vxe-form-item title="旅館簡介" title-align="left" :title-width="200" :span="24" :title-prefix="{
                        message: '請注意字數不得超過125字',
                        icon: 'vxe-icon-info-circle-fill',
                    }"></vxe-form-item>

                    <vxe-form-item field="Comment" :span="24" :item-render="{}">
                        <template #default="{ data }">
                            <vxe-textarea v-model="data.Comment" :autosize="{ minRows: 4, maxRows: 7 }"
                                :show-word-count="true" placeholder="請輸入..." :maxlength="125"></vxe-textarea>
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
import { reactive, ref, watch, onMounted, defineProps, defineEmits} from "vue";
import XEUtils from "xe-utils"; // 處理 String 的工具，這裡主要用來將物件快速轉換為queryParam
import DragImage from "@/components/DragImage.vue"; // 拖動圖片的插件，手刻，包擴上傳圖片的功能
import { VXETable } from "vxe-table";

/**
 * 接收父元件資料
 * 存入initialData
 * 必須傳入
 * 不然無法啟動彈窗
 */
const props = defineProps({
    isShow: {
        type: Boolean,
        default: false,
        required: true
    },
    initialData: {
        type: Object,
        required: true
    }
});

const emits = defineEmits();
/**
 * 通知他爸他要關了
 */
 function handleModalClose({ type }) {
  if (type === 'close') {
    // 在 vxe-modal 的 close 事件触发时，同时触发自定义的 update 事件
    props.isShow = false; // 修改 isShow 的值，可以触发外部组件的 update 事件
    // 触发 update 事件
    emits('update:isShow', false); // 传递新的值，触发父组件的 update 事件
  }
}

const imageComponents = [
  { name: '01' },
  { name: '02' },
  { name: '03' },
  { name: '04' },
  { name: '05' }
];

</script>
<style scoped></style>