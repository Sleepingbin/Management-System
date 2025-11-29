<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import http from '@/utils/http';
import { formatScore, ScoreData } from '@/utils/ScoreData';
import { getUserInfo } from '@/utils/auth';

const columns = ref([
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left', align: 'center' },
  { title: '学号', width: 80, dataIndex: 'stu_id', key: '0', fixed: 'left', align: 'center' },
  { title: '翻译成绩', dataIndex: 'transScore', key: '1', width: 100, align: 'center' },
  { title: '开题成绩', dataIndex: 'startScore', key: '2', width: 100, align: 'center' },
  { title: '中期成绩', dataIndex: 'midScore', key: '3', width: 100, align: 'center' },
  { title: '终稿成绩', dataIndex: 'teachScore', key: '4', width: 100, align: 'center' },
  { title: '评阅成绩', dataIndex: 'readScore', key: '5', width: 100, align: 'center' },
  { title: '答辩成绩', dataIndex: 'defScore', key: '6', width: 100, align: 'center' },
  { title: '总评成绩', dataIndex: 'finalScore', key: '7', width: 100, align: 'center' }
]);

const dataSource = ref([]);

onMounted(async () => {
  try {
    const response = await http.get('/admin/getAllScore', {
      params: { user_id: getUserInfo().user_id }
    });
    dataSource.value = response.data.map((student: any) => ({
      stu_id: student.stu_id,
      name: student.name,
      transScore: formatScore(student.transScore),
      startScore: formatScore(student.startScore),
      midScore: formatScore(student.midScore),
      teachScore: formatScore(student.teachScore),
      readScore: formatScore(student.readScore),
      defScore: formatScore(student.defScore),
      finalScore: formatScore(student.finalScore)
    }));
  } catch (error) {
    console.error('获取评分数据失败:', error);
  }
});
</script>

<template>
  <a-watermark
    :content="[getUserInfo().user_id, 'Sensitive Information Contained', 'Do NOT Snapshot']">
    <a-table :columns="columns" :data-source="dataSource">
      <template #students="{ record }">
        {{ record.students }}
      </template>
    </a-table>
  </a-watermark>
</template>
