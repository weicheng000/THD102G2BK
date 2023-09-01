<script>
export default {
  data() {
    return {
      adminID: "",
      password: "",
    };
  },
  methods: {
    navigateTo(routePath) {
      this.$router.push(routePath);
    },
    login() {
      const requestData = {
        adminID: this.adminID,
        password: this.password,
      };

      // 使用 Fetch API 發送 POST 請求至 API
      fetch("PHP/managers.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("登入成功！");
            this.navigateTo('/OrderManager');
          } else {
            alert("登入失敗：" + data.message);
          }
        })
        .catch((error) => {
          alert("發生錯誤", error);
        });
    },
  },
};
</script>

<template>
  <div class="loginpage">
    <div class="login">
      <div>
        <h1>登入</h1>
      </div>
      <div class="inputType">
        <label for="adminID">帳號</label>
        <input
          v-model="adminID"
          type="text"
          name="adminID"
          id="adminID"
          class="inputBar"
        />
      </div>
      <div class="inputType">
        <label for="bg_password">密碼</label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          class="inputBar"
        />
      </div>

      <div class="col-12">
        <button type="button" class="btn_1" @click="login">登入</button>
      </div>
      <div class="col-12">
        <button
          type="button"
          class="btn_0"
          @click="navigateTo('/OrderManager')"
        >
          神奇小按鈕 點我點我
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loginpage {
  background: conic-gradient(
    from 219deg at 67.12% 74.12%,
    #5741fa 0deg,
    #09003e 360deg
  );
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  display: flex;
  flex-direction: column;
  width: 500px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 40px;
  gap: 32px;
  align-items: center;
}

.inputType {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.inputBar {
  height: 48px;
  padding: 0px 12px;
  border-radius: 8px;
  border: 1px solid var(--gray-gray-03, #dee2e6);
  background: var(--white, #fff);
  font-size: 16px;
  font-weight: bold;
}
</style>