<script lang="ts" setup>
import { getUserInfo, isLoggedIn } from '@/utils/auth';
</script>

<template>
  <a-result status="403" title="您暂时无权对该学生进行打分" sub-title="请等待同组教师完成评分">
    <template #extra>
      <p>当前您的学工号为: {{ getUserInfo().user_id }}</p>
      <p>您的用户类型为: {{ getUserInfo().user_type }}</p>
      <a-button type="primary" @click="() => { $router.push('/showStu') }">返回学生列表</a-button>
    </template>
  </a-result>
</template>
