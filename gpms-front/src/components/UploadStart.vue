<script lang="ts" setup>
import { ref } from 'vue';
import { UploadOutlined, SendOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getUserInfo } from '@/utils/auth';
import { beforeUploadPDF } from '@/utils/uploadValid';
import Download from '@/components/Download.vue';
import http from '@/utils/http';

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const isOutSchool = ref<boolean>(false);
const outApply = ref([]);
const trans = ref([]);
const startReport = ref([]);

const uploadOutApply = (info: any) => {
  if (info.file.status === 'done') {
    message.success('校外毕设申请上传成功', 5);
  } else if (info.file.status === 'error') {
    message.error('校外毕设申请失败, 请重新上传', 5);
  }
};

const uploadTrans = (info: any) => {
  if (info.file.status === 'done') {
    message.success('外文翻译上传成功', 5);
  } else if (info.file.status === 'error') {
    message.error('外文翻译上传失败, 请重新上传', 5);
  }
};

const uploadReport = (info: any) => {
  if (info.file.status === 'done') {
    message.success('开题报告上传成功', 5);
  } else if (info.file.status === 'error') {
    message.error('开题报告失败, 请重新上传', 5);
  }
};
const paperTitle = ref<string | null>(null);

const setTitle = async () => {
  try {
    const response = http.put('/stu/setTitle', {
      stu_id: getUserInfo().user_id,
      title: paperTitle.value
    });
    if ((await response).data.code === 200200) {
      message.success('论文标题提交成功', 3);
    } else {
      message.error('论文标题提交失败', 3);
    }
  } catch (error) {
    message.error('网络错误, 请重试', 3);
  }
};
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 1100px">
    <!--    第一行-->
    <a-row>
      <a-col span="6"></a-col>
      <a-col span="6">
        <a-form-item>
          <Download
            button_text="下载校外毕设申请表"
            file-name="校外毕设申请表"
            file-type="docx"></Download>
        </a-form-item>
      </a-col>
      <a-col span="6">
        <a-form-item>
          <Download
            button_text="下载开题报告模板"
            :stu_id="getUserInfo().user_id"
            file-name="开题报告模板"
            file-type="docx"></Download>
        </a-form-item>
      </a-col>
    </a-row>
    <!--    第二行-->
    <a-row>
      <a-col span="6"></a-col>
      <a-col span="6">
        <!--    勾选是否校外毕设-->
        <a-form-item>
          <a-button size="large" style="height: 42px; width: 200px">
            <a-checkbox size="large" v-model:checked="isOutSchool" style="font-weight: bold"
              >是否在校外进行毕设
            </a-checkbox>
          </a-button>
        </a-form-item>
      </a-col>
      <a-col span="6">
        <!--    上传校外毕设申请-->
        <a-form-item v-if="isOutSchool">
          <a-upload
            v-model:file-list="outApply"
            list-type="picture"
            accept=".pdf"
            @change="uploadOutApply"
            :before-upload="beforeUploadPDF"
            :data="{ stu_id: getUserInfo().user_id, filename: '校外毕设申请' }"
            action="http://192.168.30.5:5174/api/upload">
            <a-button size="large" v-if="outApply.length < 1">
              <upload-outlined />
              选择校外毕设申请
            </a-button>
          </a-upload>
        </a-form-item>
      </a-col>
    </a-row>
    <!--    第三行-->
    <a-row>
      <a-col span="6"></a-col>
      <a-col span="6">
        <!--    上传外文翻译-->
        <a-form-item>
          <a-upload
            v-model:file-list="trans"
            list-type="picture"
            accept=".pdf"
            @change="uploadTrans"
            :before-upload="beforeUploadPDF"
            :data="{ stu_id: getUserInfo().user_id, filename: '外文翻译' }"
            action="http://192.168.30.5:5174/api/upload">
            <a-button size="large" v-if="trans.length < 1" style="width: 200px">
              <upload-outlined />
              选择外文翻译
            </a-button>
          </a-upload>
        </a-form-item>
      </a-col>
      <a-col span="6">
        <!--    上传开题报告-->
        <a-form-item>
          <a-upload
            v-model:file-list="startReport"
            list-type="picture"
            accept=".pdf"
            @change="uploadReport"
            :before-upload="beforeUploadPDF"
            :data="{ stu_id: getUserInfo().user_id, filename: '开题报告' }"
            action="http://192.168.30.5:5174/api/upload">
            <a-button size="large" v-if="startReport.length < 1" style="width: 182px">
              <upload-outlined />
              选择开题报告
            </a-button>
          </a-upload>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row>
      <a-col span="6"></a-col>
      <a-col span="6">
        <!--    论文标题-->
        <a-form-item>
          <a-input
            placeholder="请输入论文标题"
            size="large"
            style="width: 200px"
            v-model:value="paperTitle" />
        </a-form-item>
      </a-col>
      <a-col span="6">
        <a-form-item>
          <a-button type="primary" size="large" @click="setTitle">
            <SendOutlined />
            确认提交论文标题
          </a-button>
        </a-form-item>
      </a-col>
      <a-col span="6"></a-col>
    </a-row>
  </a-form>
</template>
