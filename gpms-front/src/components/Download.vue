<script setup lang="ts">
import http from '@/utils/http';
import { CloudDownloadOutlined } from '@ant-design/icons-vue';
import {getUserInfo} from "@/utils/auth";

const props = defineProps({
  button_text: String,
  userId: String,
  fileName: String,
  fileType: String
});

let filePath: string = '';
let response: any;

const handleDownload = async () => {
  try {
    console.log(getUserInfo().user_type);
    console.log('用户ID:', props.userId);
    console.log('文件名:', props.fileName);
    if (props.fileName === '评价手册' && (getUserInfo().user_type=='指导教师' || getUserInfo().user_type=='组长' || getUserInfo().user_type=='小组秘书兼评阅教师')) {
      console.log('导出评价手册');
      response = await http.get('/exportEva', {
        params: {
          stu_id: props.userId
        }
      });
    }else
      if (props.fileName === '评价手册' && getUserInfo().user_type=='学生'){
      console.log('导出评价手册');
      console.log(getUserInfo().user_type);
      console.log(getUserInfo().user_id);
      response = await http.get('/exportEva', {
        params: {
          stu_id: getUserInfo().user_id
        }
      });
    }
    else if (!props.userId) {
      response = await http.get('/stu/getFilePath', {
        params: {
          file: props.fileName
        }
      });
    } else {
      response = await http.get('/teacher/getFilePath', {
        params: {
          user_id: props.userId,
          file: props.fileName
        }
      });
    }
    console.log('获取文件路径:', response.data);
    filePath = response.data.path;
    console.log('文件路径:', filePath);
    // const serverBaseUrl = 'http://192.168.30.5:3333';
    const serverBaseUrl = 'http://192.168.30.5:3333';
    const fullFilePath = `${serverBaseUrl}/${filePath}`;
    console.log('完整文件路径:', fullFilePath);
    const link = document.createElement('a');
    link.href = fullFilePath;
    link.setAttribute('download', `${props.fileName}.${props.fileType}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('下载文件失败:', error);
  }
};
</script>

<template>
  <a-button type="primary" size="large" @click="handleDownload">
    <CloudDownloadOutlined />{{ props.button_text }}
  </a-button>
</template>
