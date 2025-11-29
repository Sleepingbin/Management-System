<script lang="ts" setup>
import { ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message, Upload } from 'ant-design-vue';
import { getUserInfo } from '@/utils/auth';
import { beforeUploadPDF, beforeUploadZip } from '@/utils/uploadValid';

const midWork = ref([]);
const midReport = ref([]);

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const uploadMidWork = (info: any) => {
  if (info.file.status === 'done') {
    message.success('中期成果上传成功', 5);
  } else if (info.file.status === 'error') {
    message.error('中期成果失败, 请重新上传', 5);
  }
};

const uploadMidReport = (info: any) => {
  if (info.file.status === 'done') {
    message.success('中期报告上传成功', 5);
  } else if (info.file.status === 'error') {
    message.error('中期报告失败, 请重新上传', 5);
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
      <a-upload
        v-model:file-list="midWork"
        list-type="picture"
        accept=".zip"
        @change="uploadMidWork"
        :data="{ stu_id: getUserInfo().user_id, filename: '中期成果' }"
        action="http://192.168.30.5:5174/api/upload">
        <a-button size="large" v-if="midWork.length < 1">
          <upload-outlined />
          选择中期成果
        </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 14, span: 16 }">
      <a-upload
        v-model:file-list="midReport"
        list-type="picture"
        accept=".pdf"
        :before-upload="beforeUploadPDF"
        @change="uploadMidReport"
        :data="{ stu_id: getUserInfo().user_id, filename: '中期报告' }"
        action="http://192.168.30.5:5174/api/upload">
        <a-button size="large" v-if="midReport.length < 1">
          <upload-outlined />
          选择中期报告
        </a-button>
      </a-upload>
    </a-form-item>
  </a-form>
</template>
