<script lang="ts" setup>
import { getUserInfo, isLoggedIn } from '@/utils/auth';
</script>

<template>
  <a-result status="403" title="403" sub-title="未经授权的访问">
    <template #extra>
      <p>当前您的学工号为: {{ getUserInfo().user_id }}</p>
      <p>您的用户类型为: {{ getUserInfo().user_type }}</p>
      <p>当前状态: {{isLoggedIn()}}</p>
    </template>
  </a-result>
</template>


