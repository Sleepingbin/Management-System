<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import http from '@/utils/http';
import { getUserInfo } from '@/utils/auth';

const StuColumn: TableColumnsType = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '学号', width: 80, dataIndex: 'stu_id', key: '0', fixed: 'left' },
  { title: '性别', dataIndex: 'gender', key: '1', width: 100, align: 'center' },
  { title: '年龄', dataIndex: 'age', key: '2', width: 100, align: 'center' },
  { title: '专业', dataIndex: 'major', key: '3', width: 100, align: 'center' },
  { title: '班级', dataIndex: 'class', key: '4', width: 100, align: 'center' },
  { title: '联系方式', dataIndex: 'tel', key: '5', width: 100, align: 'center' }
];

const TeacherColumn: TableColumnsType = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '工号', width: 80, dataIndex: 'user_id', key: '0', fixed: 'left' },
  { title: '性别', dataIndex: 'gender', key: '1', width: 100, align: 'center' },
  { title: '年龄', dataIndex: 'age', key: '2', width: 100, align: 'center' },
  { title: '教师角色', dataIndex: 'teacher_type', key: '4', width: 110, align: 'center' },
  { title: '职称', dataIndex: 'title', key: '3', width: 100, align: 'center' },
  { title: '联系方式', dataIndex: 'tel', key: '5', width: 100, align: 'center' }
];

const dataSource = ref([]);
const showWhich = ref('学生');

onMounted(() => {
  reFetch();
});

function reFetch() {
  if (showWhich.value === '学生') {
    http
      .get('/admin/getStu', {
        params: {
          user_id: getUserInfo().user_id
        }
      })
      .then((response) => {
        dataSource.value = response.data.data.map((student: any) => ({
          stu_id: student.user_id,
          name: student.name,
          gender: student.gender,
          age: student.age,
          major: student.stu_major,
          class: student.stu_class,
          tel: student.tel
        }));
      })
      .catch((error) => {
        console.error('获取学生信息失败:', error);
      });
  } else {
    http
      .get('/admin/getTeacher', {
        params: {
          user_id: getUserInfo().user_id
        }
      })
      .then((response) => {
        dataSource.value = response.data.data.map((teacher: any) => ({
          user_id: teacher.user_id,
          name: teacher.name,
          gender: teacher.gender,
          age: teacher.age,
          teacher_type: teacher.teacher_type,
          title: teacher.title,
          tel: teacher.tel
        }));
      })
      .catch((error) => {
        console.error('获取老师信息失败:', error);
      });
  }
}
</script>

<template>
  <div style="margin-bottom: 20px">
    <a-radio-group button-style="solid" v-model:value="showWhich" @change="reFetch">
      <a-radio-button value="学生">学生</a-radio-button>
      <a-radio-button value="教师">教师</a-radio-button>
    </a-radio-group>
  </div>
  <a-watermark
    :content="[getUserInfo().user_id, 'Sensitive Information Contained', 'Do NOT Snapshot']">
    <a-table
      v-if="showWhich === '学生'"
      class="ant-table-striped"
      :columns="StuColumn"
      :data-source="dataSource"
      :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
      <template #bodyCell="{ column, record }">
        {{ record[column.dataIndex] }}
      </template>
    </a-table>
  </a-watermark>
  <a-watermark :content="[getUserInfo().user_id, 'All User Info', 'Do NOT Snapshot']">
    <a-table
      v-if="showWhich === '教师'"
      class="ant-table-striped"
      :columns="TeacherColumn"
      :data-source="dataSource"
      :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
      <template #bodyCell="{ column, record }">
        {{ record[column.dataIndex] }}
      </template>
    </a-table>
  </a-watermark>
</template>

<style scoped>
[data-doc-theme='light'] .ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}

[data-doc-theme='dark'] .ant-table-striped :deep(.table-striped) td {
  background-color: rgb(29, 29, 29);
}
</style>
