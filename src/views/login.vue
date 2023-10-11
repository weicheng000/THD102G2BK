<script>
import { reactive, onMounted } from 'vue';
import router from '@/router';

export default {
  setup() {
    const account = reactive({
      username: '',
      password: ''
    });

    // const checkLogin = () => {
    //   const user = JSON.parse(localStorage.getItem('user'));

    //   if (user && user.login === true) {
    //     // 如果用戶已經登入，自動導向登入後的頁面
    //     router.push('/OrderManager');
    //   }
    // };

    // onMounted(() => {
    //   checkLogin();
    // });

    const login = async () => {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(account)
        });

        const responseText = await res.text(); // 将响应内容转换为字符串
        const responseJson = JSON.parse(responseText);

        if (responseJson.code === 1) {
          // console.log('login!');
          // const user = {
          //   account: account.account,
          //   login: true
          // }
          // localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(responseJson.data));
          router.push('/OrderManager')

        } else {
          console.log(responseJson.msg);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const TypeAuto = () => {
      account.username = 'petpago';
      account.password = 'a123456'
    }

    return {
      account,
      login,
      TypeAuto
    }
  }

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
        <input v-model="account.username" type="text" class="inputBar" />
      </div>
      <div class="inputType">
        <label for="bg_password">密碼</label>
        <input v-model="account.password" type="password" class="inputBar" />
      </div>

      <div class="col-12">
        <button type="button" class="btn_1" @click="login">登入</button>
      </div>
      <div class="col-12">
        <button type="button" class="btn_0" @click="TypeAuto()">
          神奇小按鈕 點我點我
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loginpage {
  background: conic-gradient(from 219deg at 67.12% 74.12%,
      #5741fa 0deg,
      #09003e 360deg);
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