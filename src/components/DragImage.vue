<template>
  <div class="out col-12">
    <div
      class="dragArea shadow-sm"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      previewImage: null,
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
.out {
  width: 185px;
  padding: 10px;
}
.dragArea {
  width: 175px;
  height: 156px;
  background-image: url(@/assets/images/Group.svg);
  background-repeat: no-repeat;
  background-position: center center;
}
.preViewSide{
    width: 100%;
    height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
</style>
