<script setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { reactive, onMounted, computed } from 'vue';
import { updateUserState } from '@/utils/auth.ts';
import router from '@/router/index.js';
import http from '@/utils/http';
import { message } from 'ant-design-vue';

const formState = reactive({
  userID: null,
  passwd: null,
  remember: true
});

// 在组件加载时，从本地存储中读取用户名和密码
onMounted(() => {
  const storedUsername = localStorage.getItem('rememberedUserID');
  const storedPassword = localStorage.getItem('rememberedPasswd');

    // 如果存储中有数据，填充到表单中，并设置“记住我”选项为true
    if (storedUsername && storedPassword) {
      formState.userID = storedUsername;
      formState.passwd = storedPassword;
      formState.remember = true;
    }
});

const disabled = computed(() => {
  return !(formState.userID && formState.passwd);
});

const onSubmit = async () => {
  const response = await http.post('/login', {
    user_id: formState.userID,
    password: formState.passwd
  });

  if (response.data.code === 20001 || response.data.code === 20002) {
    message.success('登录成功');
    //登录成功，获取服务器返回的用户信息
    sessionStorage.setItem('user_id', formState.userID);
    sessionStorage.setItem('user_type', response.data.data.type);

    // 更新用户状态
    updateUserState(true, formState.userID, response.data.data.type);

    // 如果选择了“记住我”，将用户名和密码存储到本地存储中
    if (formState.remember) {
      localStorage.setItem('rememberedUserID', formState.userID);
      localStorage.setItem('rememberedPasswd', formState.passwd);
      localStorage.setItem('isLoggedIn', true);
    } else {
      // 如果没有选择“记住我”，清除本地存储中的用户名和密码
      localStorage.removeItem('rememberedUserID');
      localStorage.removeItem('rememberedPasswd');
    }
    // 跳转到首页
    await router.push({ name: 'overview' });
  } else {
    // 账号密码错误，弹出错误信息
    alert(response.data.message || '用户名或密码错误');
  }
};
</script>

<template>
  <div class="login">
    <div class="login-box">
      <div class="top">
        <div class="logo">
          <img src="/book2.png">
        </div>
      </div>
      <div class="mid">
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 10 }"
          autocomplete="off">
          <a-form-item class="custom-label" label="用户名" name="username">
            <a-input v-model:value="formState.userID">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item label="密码" name="password">
            <a-input-password v-model:value="formState.passwd">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ offset: 10, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
            <div class="item-btn">
              <a-button type="primary" @click="onSubmit" :disabled="disabled">登录</a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div class="bottom">Copyright © 2024 Biid</div>
    </div>
  </div>
</template>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/login-bg.png') no-repeat;
  background-size: cover;
  position: fixed;

  .login-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    padding-top: 10%;

    .top {
      margin-bottom: 30px;
      text-align: center;

      .logo {
        font-size: 0;
        max-width: 50%;
        margin: 0 auto;
      }
    }

    .mid {
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .item-btn {
        width: 410px;
        margin-top: 20px;

        input {
          border: 0;
          width: 100%;
          height: 40px;
          background: #1f87e8;
          color: #fff;
          border-radius: 3px;
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 10%;
      width: 100%;
      color: #999;
      font-size: 12px;
      text-align: center;
    }
  }
}

.logo {
  width: 90px;
  height: 90px;
}

.logo img {
  width: 100%;
  height: auto;
  transform: scale(0.8);
}
</style>
