<template>
  <div class="out col-12">
    <div class="dragArea shadow-sm" @dragover.prevent @drop="handleDrop" @click="triggerFileInput">
      <div class="preViewSide">
        <img v-if="previewImage" :src="previewImage" alt="Preview" />
        <img v-else :src="url" alt="Now">
      </div>
      <input ref="fileInput" type="file" name="image" accept="image/*" style="display: none" @change="handleFileSelect" />
    </div>
    <button type="button" style="display: none" @click="uploadImage()">上傳圖片</button>
  </div>
</template>
<script>
export default {
  props: {
    name: String, // 声明一个 name 的 prop
    url: String
  },
  data() {
    return {
      previewImage: null,
      selectedFile: null
    };
  },
  methods: {
    handleDrop(event) {
      event.preventDefault(); //用來防止圖片拖進瀏覽器的預設事件

      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        this.selectedFile = file;
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
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    uploadImage() {
      if (this.previewImage === null) {
        return Promise.resolve(null); // 直接返回空值的 Promise
      }

      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        formData.append('name', this.name);

        fetch('/thd102/g2/php/TourTable/upload.php', {
          method: 'POST',
          body: formData,
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // 解析 JSON 数据
          })
          .then(data => {
            if (data.status === 'success') {
              resolve(data.filePath); // 返回成功时的文件路径
            } else {
              reject(null); // 返回空值
            }
          })
          .catch(() => {
            reject(null); // 返回空值
          });
      });
    }
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

.preViewSide {
  width: 100%;
  height: 100%;
}

img {
  width: 100%;
  height: 100%;
}
</style>
