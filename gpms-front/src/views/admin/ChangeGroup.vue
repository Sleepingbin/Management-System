<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['stu_group_id'].includes(column.dataIndex)">
        <div>
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">确定</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">修改</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash-es';
import { onMounted, reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';
import { getUserInfo } from '@/utils/auth';
import http from '@/utils/http';

const columns = [
  { title: '姓名', dataIndex: 'name', width: '25%' },
  { title: '学号', dataIndex: 'user_id', width: '15%' },
  { title: '组号', dataIndex: 'stu_group_id', width: '40%' },
  { title: '修改组号', dataIndex: 'operation' }
];
interface DataItem {
  key: string;
  name: string;
  user_id: string;
  stu_group_id: number;
}
const data: DataItem[] = [];
const dataSource = ref(data);

http.get('/admin/changeGroup', { params: { user: getUserInfo().user_id } }).then();

const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
};

const save = async (key: string) => {
  try {
    const updatedItem = editableData[key];
    console.log(updatedItem.user_id)
    console.log(updatedItem.stu_group_id)
    const response = await http.put('/admin/updateGroup', {
      user_id: getUserInfo().user_id,
      stu_id: updatedItem.user_id,
      stu_group_id: updatedItem.stu_group_id
    });

    if (response.status === 200) {
      // 更新数据源
      const itemToUpdate = dataSource.value.find(item => item.key === key);
      if (itemToUpdate) {
        Object.assign(itemToUpdate, updatedItem);
      }

      // 删除可编辑数据
      delete editableData[key];
    } else {
      console.error('更新分组数据失败:', response.statusText);
    }
  } catch (error) {
    console.error('更新分组数据时发生错误:', error);
  }
};
const cancel = (key: string) => {
  delete editableData[key];
};
onMounted(async () => {
  try {
    const response = await http.get('/admin/changeGroup', {
      params: { user_id: getUserInfo().user_id }
    });
    dataSource.value = response.data.map((item: any) => ({
      key: item.user_id,
      name: item.name || '',
      user_id: item.user_id || '',
      stu_group_id: item.stu_group_id || 0
    }));
  } catch (error) {
    console.error('获取分组数据失败:', error);
  }
});
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
