<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import http from '@/utils/http';

const columns = ref([
  { title: '组号', dataIndex: 'group_id', align: 'center', key: 'group_id' },
  { title: '教师名单', dataIndex: 'teachers', key: 'teachers', align: 'center' },
  { title: '学生名单', dataIndex: 'students', key: 'students', align: 'center' }
]);

const dataSource = ref([]);

onMounted(async () => {
  try {
    const response = await http.get('/admin/getGroup');
    if (response.data.code === 200) {
      dataSource.value = response.data.data.map((item: any) => ({
        group_id: item.group_id,
        teachers: item.teacher_list.split(',').join(' '),
        students: item.stu_list.split(',').join(' ')
      }));
    } else {
      console.error('获取分组数据失败:', response.data.msg);
    }
  } catch (error) {
    console.error('获取分组数据失败:', error);
  }
});
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource">
    <template #students="{ record }">
      {{ record.students }}
    </template>
  </a-table>
</template>

<style scoped></style>
