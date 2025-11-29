<template>
  <div>
    <div class="steps-content">
      <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="horizontal"
        style="max-width: 600px">
        <div class="form-container">
          <a-form-item label="任务书: ">
            <a-textarea v-model:value="tempDoc.task" :autosize="{ minRows: 6, maxRows: 10 }" />
          </a-form-item>
          <a-form-item label="指导书: ">
            <a-textarea v-model:value="tempDoc.guide" :autosize="{ minRows: 6, maxRows: 10 }" />
          </a-form-item>
        </div>
        <a-form-item :wrapper-col="{ offset: 9, span: 12 }">
          <a-button size="large" type="primary" @click="handleSubmit" style="width: 200px"
            >提交</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import http from '@/utils/http';
import { getUserInfo } from '@/utils/auth';
import { message } from 'ant-design-vue';

const labelCol = { span: 6 };
const wrapperCol = { span: 18 };

const tempDoc = ref({
  task: null,
  guide: null
});

const thisDoc = ref({
  task: null,
  guide: null
});

const handleSubmit = async () => {
  thisDoc.value = tempDoc.value;
  try {
    const response = await http.post('/teacher/uploadRequirement', {
      user_id: getUserInfo().user_id,
      task: thisDoc.value.task,
      guide: thisDoc.value.guide
    });

    if (response.data.code === 200200) {
      message.success('上传成功');
      tempDoc.value.task = null;
      tempDoc.value.guide = null;
    } else {
      message.error('上传失败');
    }
  } catch (error) {
    message.error('网络错误, 请重试');
  }
};
</script>

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
