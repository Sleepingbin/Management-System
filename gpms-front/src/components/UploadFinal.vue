<script lang="ts" setup>
import { ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { beforeUploadPDF } from '@/utils/uploadValid';
import { getUserInfo } from '@/utils/auth';
import Download from '@/components/Download.vue';

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const Draft = ref([]);

const uploadDraft = (info: any) => {
  if (info.file.status === 'done') {
    message.success('终稿上传成功', 5);
  } else if (info.file.status === 'error') {
    message.error('终稿提交失败, 请重新上传', 5);
  }
};
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px"
    ><a-form-item :wrapper-col="{ offset: 14, span: 16 }">
      <Download
        :button_text="'下载毕业论文模板'"
        file-name="毕业论文模板"
        file-type="doc"></Download>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 14, span: 16 }">
      <a-upload
        v-model:file-list="Draft"
        list-type="picture"
        accept=".pdf"
        @change="uploadDraft"
        :before-upload="beforeUploadPDF"
        :data="{ stu_id: getUserInfo().user_id, filename: '毕业论文终稿' }"
        action="http://192.168.30.5:5174/api/upload">
        <a-button size="large" v-if="Draft.length < 1" style="width: 180px">
          <upload-outlined />
          选择终稿
        </a-button>
      </a-upload>
    </a-form-item>
  </a-form>
</template>
