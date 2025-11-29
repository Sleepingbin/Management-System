<script lang="ts" setup>
import { ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message, Upload } from 'ant-design-vue';
import { getUserInfo } from '@/utils/auth';
import { beforeUploadPDF } from '@/utils/uploadValid';
import Download from '@/components/Download.vue';

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const defApply = ref([]);

const uploadDefApply = (info: any) => {
  if (info.file.status === 'done') {
    message.success('答辩申请上传成功', 5);
  } else if (info.file.status === 'error') {
    message.error('答辩申请失败, 请重新上传', 5);
  }
};
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px">
    <a-form-item :wrapper-col="{ offset: 14, span: 16 }">
      <Download button_text="下载答辩申请表模板" file-name="答辩申请模板" file-type="docx" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 14, span: 16 }">
      <a-upload
        v-model:file-list="defApply"
        list-type="picture"
        accept=".pdf"
        :before-upload="beforeUploadPDF"
        @change="uploadDefApply"
        :data="{ stu_id: getUserInfo().user_id, filename: '答辩申请表' }"
        action="http://192.168.30.5:5174/api/upload">
        <a-button size="large" v-if="defApply.length < 1">
          <upload-outlined />
          选择答辩申请表
        </a-button>
      </a-upload>
    </a-form-item>
  </a-form>
</template>
