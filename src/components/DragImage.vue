<template>
  <div
    class="dragArea"
    @dragover.prevent
    @drop="handleDrop"
    @click="triggerFileInput"
  >
    <div class="preViewSide">
      <img v-if="previewImage" :src="previewImage" alt="Preview" />
    </div>
    <input
      ref="fileInput"
      type="file"
      style="display: none"
      @change="handleFileSelect"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
        previewImage: null
    };
  },
  methods: {
    handleDrop(event) {
      event.preventDefault(); //用來防止圖片拖進瀏覽器的預設事件

      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    uploadImage() {
      console.log("上傳圖片:", this.previewImage);
    },
  },
};
</script>
<style scoped>
    .dragArea{
        width: 175px;
        height: 156px;
        background-color: #e0e0e0;
    }
    img{
        width: 100%;
    }
</style>
