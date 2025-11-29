<script lang="ts" setup>
import http from '@/utils/http';
import { thisScore } from '@/utils/ScoreData';
import { getUserInfo } from '@/utils/auth';
import Download from '@/components/Download.vue';

http.post('/stu/getScore', { stu_id: getUserInfo().user_id }).then((res) => {
  thisScore.value = res.data;
});
</script>

<template>
  <template v-if="thisScore.finalEva === null">
    <a-result status="info">
      <template #title> 总评成绩尚未出炉<br />请在成绩页面查看其他得分详情</template>
    </a-result>
  </template>
  <template v-else>
    <a-result status="success" :title="'最终成绩为：' + thisScore.finalScore">
      <template #extra>
        <Download
          button_text="点击下载评价手册"
          :user-id="getUserInfo().user_id"
          file-name="评价手册"
          file-type="docx"></Download>
      </template>
    </a-result>
  </template>
</template>

<style scoped></style>
