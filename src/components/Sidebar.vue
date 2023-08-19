<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <div class="container">
    <div class="logo">
      <img src="@/assets/images/PetpaGo.svg" />
    </div>
    <ul class="select">
      <router-link to="/OrderManager">
        <li class="list">
          <img src="@/assets/images/note-01.svg" alt="" />
          <p>訂單管理</p>
        </li>
      </router-link>
      <router-link to="/TourManager">
        <li class="list">
          <img src="@/assets/images/home-3.svg" alt="" />
          <p>旅宿管理</p>
        </li>
      </router-link>
      <router-link to="/MemberManager">
        <li class="list">
          <img src="@/assets/images/user-group.svg" alt="" />
          <p>會員管理</p>
        </li>
      </router-link>
      <router-link to="/PaperManager">
        <li class="list">
          <img src="@/assets/images/copy-2.svg" alt="" />
          <p>貼文管理</p>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<style scoped>
.container {
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
}

.list {
  color: #fff;
  font-family: "Noto Sans TC";
  display: flex;
  gap: 12px;
  padding: 10px 0;
  cursor: pointer;
}
</style>