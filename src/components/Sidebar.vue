<script>
export default {
  data() {
    return {};
  },
  methods: {
    navigateTo(routePath) {
      this.$router.push(routePath);
    }
  }
};
</script>

<template>
  <div class="content">
    <div class="logo">
      <img src="@/assets/images/PetpaGo.svg" />
    </div>
    <ul class="select">
      <li class="list" @click="navigateTo('/OrderManager')">
        <img src="@/assets/images/note-01.svg" alt="" />
        <p>訂單管理</p>
      </li>
      <li class="list" @click="navigateTo('/TourManager')">
        <img src="@/assets/images/home-3.svg" alt="" />
        <p>旅宿管理</p>
      </li>
      <li class="list" @click="navigateTo('/MemberManager')">
        <img src="@/assets/images/user-group.svg" alt="" />
        <p>會員管理</p>
      </li>
      <li class="list" @click="navigateTo('/PaperManager')">
        <img src="@/assets/images/copy-2.svg" alt="" />
        <p>貼文管理</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  flex-shrink: 0;
  background: linear-gradient(136deg, #6e60f6 0%, #2500ff 100%);
  box-sizing: border-box;
}

.select {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
  margin: 0;
  padding: 0;
}

.list {
  padding: 0;
  color: #fff;
  font-family: "Noto Sans TC";
  display: flex;
  gap: 12px;
  padding: 10px 0;
  cursor: pointer;
}

.list>p {
  margin: 0;
}
</style>