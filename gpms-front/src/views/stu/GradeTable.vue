<template>
  <a-table :columns="columns" :data-source="dataSource" :pagination="false"></a-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import http from '@/utils/http';
import { formatEvaluation, formatScore, ScoreData } from '@/utils/ScoreData';
import { getUserInfo } from '@/utils/auth';

const columns = ref([
  {
    title: '',
    dataIndex: 'column1',
    key: 'column1'
  },
  {
    title: '得分',
    dataIndex: 'score',
    key: 'score'
  },
  {
    title: '评价',
    dataIndex: 'evaluation',
    key: 'evaluation'
  }
]);

const dataSource = ref([]);

const scoreData = ref<ScoreData>();

onMounted(async () => {
  try {
    const response = await http.post('/stu/getScore', { stu_id: getUserInfo().user_id });
    scoreData.value = response.data;

    dataSource.value = [
      {
        key: '1',
        column1: '开题报告',
        score: formatScore(scoreData.value.startScore)
      },
      {
        key: '2',
        column1: '外文翻译',
        score: formatScore(scoreData.value.transScore)
      },
      {
        key: '3',
        column1: '中期检查',
        score: formatScore(scoreData.value.midScore),
        evaluation: formatEvaluation(scoreData.value.midEva)
      },
      {
        key: '4',
        column1: '指导老师',
        score: formatScore(scoreData.value.teachScore),
        evaluation: formatEvaluation(scoreData.value.teachEva)
      },
      {
        key: '5',
        column1: '评阅老师',
        score: formatScore(scoreData.value.readScore),
        evaluation: formatEvaluation(scoreData.value.readEva)
      },
      {
        key: '6',
        column1: '答辩记录',
        score: null,
        evaluation: formatEvaluation(scoreData.value.defRecord)
      },
      {
        key: '7',
        column1: '答辩小组',
        score: formatScore(scoreData.value.defScore),
        evaluation: formatEvaluation(scoreData.value.defEva)
      },
      {
        key: '8',
        column1: '委员会总评',
        score: formatScore(scoreData.value.finalScore),
        evaluation: formatEvaluation(scoreData.value.finalEva)
      }
    ];
  } catch (error) {
    console.error('获取评分数据失败:', error);
  }
});
</script>

<style scoped></style>
