<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import UploadOpening from '../../components/UploadStart.vue';
import UploadMidCheck from '../../components/UploadMidCheck.vue';
import Upload_Final from '../../components/UploadFinal.vue';
import Upload_Defense from '../../components/UploadDefApply.vue';
import WaitingOpeningDefense from '../../components/WaitStartDef.vue';
import ShowFinalScore from '../../components/ShowFinalScore.vue';
import http from '@/utils/http';
import { message } from 'ant-design-vue';
import { getUserInfo } from '@/utils/auth';

const current = ref<number>();

const steps = [
  {
    title: '上传开题报告',
    content: UploadOpening
  },
  {
    title: '开题答辩',
    content: WaitingOpeningDefense
  },
  {
    title: '上传中期成果',
    content: UploadMidCheck
  },
  {
    title: '上传终稿',
    content: Upload_Final
  },
  {
    title: '上传答辩申请',
    content: Upload_Defense
  },
  {
    title: '最终成绩',
    content: ShowFinalScore
  }
];

const items = steps.map((item) => ({ key: item.title, title: item.title }));

defineExpose({ current, items });

onMounted(async () => {
  try {
    const response = await http.post('/stu/getState', { user_id: getUserInfo().user_id });
    current.value = response.data.stu_states;
  } catch (error) {
    message.error('未知错误, 请重试');
    console.error('获取当前步骤失败:', error);
  }
});
</script>

<template>
  <div>
    <a-steps :current="current" :items="items"></a-steps>
    <div class="steps-content" v-if="steps[current]">
      <component :is="steps[current].content" />
    </div>
  </div>
</template>

<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
