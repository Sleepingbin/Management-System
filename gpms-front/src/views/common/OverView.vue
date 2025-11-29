<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { Avatar, FormItem, Row, Col, Space } from 'ant-design-vue';
import { getUserInfo } from '@/utils/auth';
import http from '@/utils/http';
import { thisFullUserInfo } from '@/utils/UserInfo';

const defaultAvatar = () => {
  return 'default_avatar_path';
};

const currentTime = ref(new Date().toLocaleString());

const greeting = computed(() => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 8) {
    return '早上好';
  } else if (currentHour >= 8 && currentHour < 12) {
    return '上午好';
  } else if (currentHour >= 12 && currentHour < 14) {
    return '中午好';
  } else if (currentHour >= 14 && currentHour < 18) {
    return '下午好';
  } else if (currentHour >= 18 && currentHour < 24) {
    return '晚上好';
  } else {
    return '夜深了, 早点休息哦';
  }
});

const updateTime = () => {
  currentTime.value = new Date().toLocaleString();
};

http.post('/getFullInfo', { user_id: getUserInfo().user_id }).then((res) => {
  thisFullUserInfo.value = res.data;
});

let timer: any;

const showRequirement = ref({
  task: null,
  guide: null
});


onMounted(() => {
  timer = setInterval(updateTime, 1000); // 每秒更新时间
  if(getUserInfo().user_type === '学生'){
    http.get('/stu/getRequirement', { params: { stu_id: getUserInfo().user_id, type: getUserInfo().user_type } }).then((res) => {
      console.log(res.data);
      showRequirement.value = res.data.data;
    });
  }
});

onUnmounted(() => {
  clearInterval(timer); // 组件销毁时清除定时器
});
</script>

<template>
  <div class="container">
    <div class="navbar">
      <!-- Avatar Section -->
      <a-row gutter="16">
        <a-col span="6">
          <a-form-item>
            <a-avatar
              :size="60"
              src="path_to_image"
              @error="defaultAvatar"
              style="margin-top: 20px">
              <template #icon><UserOutlined /></template>
            </a-avatar>
          </a-form-item>
        </a-col>
      </a-row>
      <span style="margin-left: 20px; font-size: 24px; color: black">
        {{ greeting }}, {{ thisFullUserInfo.name }}
      </span>
    </div>
    <div class="content">
      <h1 style="font-size: 24px; font-weight: bold">欢迎来到毕业设计管理系统</h1>
      <!-- 显示当前时间 -->
      <p style="font-size: 18px">当前时间：{{ currentTime }}</p>
    </div>
    <div v-if="getUserInfo().user_type === '学生'">
      <a-row gutter="36">
        <a-col span="12">
          <a-card title="任务书">
            <p>{{ showRequirement.task }}</p>
          </a-card>
        </a-col>
        <a-col span="12">
          <a-card title="指导书">
            <p>{{ showRequirement.guide }}</p>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 70vh; /* 使用视口高度使容器填满屏幕 */
}

.navbar {
  background-color: rgba(231, 231, 231, 0.82); /* 深灰色 */
  color: white;
  padding: 5px 20px; /* 上下10px，左右20px的填充 */
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.content {
  display: flex;
  flex: 1; /* 占据剩余的空间 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  flex-direction: column; /* 设置方向为列 */
  background: rgba(255, 255, 255, 0.3);
}

h1,
p {
  text-align: center; /* 文本居中 */
}
</style>
