<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';
import { message, SelectProps } from 'ant-design-vue';
import http from '@/utils/http';
import { RegionColumns } from 'v-region';
import {
  GroupOptions,
  newUserInfo,
  t1_options,
  t2_options,
  t3_options,
  topic1,
  topic2,
  topic3
} from '@/utils/UserInfo';

const labelCol = { style: { width: '120px' } };
const wrapperCol = { span: 16 };

const emailRegex: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const telRegex: RegExp = /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[6]|17[0-8]|18[0-9]|19[8,9])\d{8}$/;

const confirmText = ref<string>('是否确认新增用户?');
const confirmLoading = ref<boolean>(false);
const isShowConfirmDialog = ref<boolean>(false);

const handleChange = (value: string) => {
  const add: string = topic1.value + topic2.value + topic3.value;
  switch (add) {
    case 'AAA':
      newUserInfo.value.stuGroup = 1;
      break;
    case 'AAB':
      newUserInfo.value.stuGroup = 2;
      break;
    case 'ABA':
      newUserInfo.value.stuGroup = 3;
      break;
    case 'ABB':
      newUserInfo.value.stuGroup = 4;
      break;
    case 'ACA':
      newUserInfo.value.stuGroup = 5;
      break;
    case 'ACB':
      newUserInfo.value.stuGroup = 6;
      break;
    case 'BAA':
      newUserInfo.value.stuGroup = 7;
      break;
    case 'BAB':
      newUserInfo.value.stuGroup = 8;
      break;
    case 'BBA':
      newUserInfo.value.stuGroup = 9;
      break;
    case 'BBB':
      newUserInfo.value.stuGroup = 10;
      break;
    case 'BCA':
      newUserInfo.value.stuGroup = 11;
      break;
    case 'BCB':
      newUserInfo.value.stuGroup = 12;
      break;
    case 'CAA':
      newUserInfo.value.stuGroup = 13;
      break;
    case 'CAB':
      newUserInfo.value.stuGroup = 14;
      break;
    case 'CBA':
      newUserInfo.value.stuGroup = 15;
      break;
    case 'CBB':
      newUserInfo.value.stuGroup = 16;
      break;
    case 'CCA':
      newUserInfo.value.stuGroup = 17;
      break;
    case 'CCB':
      newUserInfo.value.stuGroup = 17;
      break;
    case 'DAA':
      newUserInfo.value.stuGroup = 19;
      break;
    case 'DAB':
      newUserInfo.value.stuGroup = 20;
      break;
    case 'DBA':
      newUserInfo.value.stuGroup = 21;
      break;
    case 'DBB':
      newUserInfo.value.stuGroup = 22;
      break;
    case 'DCA':
      newUserInfo.value.stuGroup = 23;
      break;
    case 'DCB':
      newUserInfo.value.stuGroup = 24;
      break;
    default:
      return;
  }
};

const showConfirmDialog = () => {
  isShowConfirmDialog.value = true;
};

const handleOk = () => {
  confirmText.value = '提交中...';
  confirmLoading.value = true;
  onSubmitClick().finally(() => {
    confirmLoading.value = false;
  });
};

function validFormData(): boolean {
  if (!emailRegex.test(newUserInfo.value.email)) {
    message.error('请输入正确的邮箱地址');
    return false;
  }
  if (!telRegex.test(newUserInfo.value.tel)) {
    message.error('请输入正确的手机号码');
    return false;
  }
  return true;
}

const onSubmitClick = async () => {
  if (validFormData()) {
    try {
      await http.put('/admin/addUser', newUserInfo.value);
      isShowConfirmDialog.value = false;
      message.success('新增成功');
      message.success('即将刷新页面', 2);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      message.error('未知错误, 请重试');
    }
  }
};
</script>

<template>
  <div class="main">
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 1100px">
      <a-row>
        <!--首行-->
        <a-col span="24">
          <a-form-item label="用户类型">
            <a-radio-group button-style="solid" v-model:value="newUserInfo.type">
              <a-radio-button value="学生">学生</a-radio-button>
              <a-radio-button value="老师">老师</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <!-- 左侧列 -->
        <a-col span="8">
          <a-form-item label="学工号">
            <a-input v-model:value="newUserInfo.user_id" />
          </a-form-item>
          <a-form-item label="姓名">
            <a-input v-model:value="newUserInfo.name" />
          </a-form-item>
          <a-form-item label="性别">
            <a-radio-group button-style="solid" v-model:value="newUserInfo.gender">
              <a-radio-button value="男">男</a-radio-button>
              <a-radio-button value="女">女</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="年龄">
            <a-input v-model:value="newUserInfo.age" />
          </a-form-item>
        </a-col>

        <!-- 中列 -->
        <a-col span="8">
          <a-form-item label="联系方式">
            <a-input v-model:value="newUserInfo.tel" />
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input v-model:value="newUserInfo.email" />
          </a-form-item>
          <a-form-item label="联系地址">
            <RegionColumns v-model="newUserInfo.region" />
          </a-form-item>

          <a-form-item label="详细地址">
            <a-input v-model:value="newUserInfo.detailAdd" />
          </a-form-item>
        </a-col>

        <a-col span="8" v-if="newUserInfo.type === '学生'">
          <a-form-item label="专业">
            <a-input v-model:value="newUserInfo.major" />
          </a-form-item>
          <a-form-item label="班级">
            <a-input v-model:value="newUserInfo.class" />
          </a-form-item>
          <a-form-item label="学生组">
            <a-select
              ref="select"
              :options="GroupOptions"
              v-model:value="newUserInfo.stuGroup"
              disabled>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col span="8" v-if="newUserInfo.type === '老师'">
          <a-form-item label="职称">
            <a-select v-model:value="newUserInfo.title">
              <a-select-option value="讲师">讲师</a-select-option>
              <a-select-option value="副教授">副教授</a-select-option>
              <a-select-option value="教授">教授</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="教师组">
            <a-select ref="select" :options="GroupOptions" v-model:value="newUserInfo.teacherGroup">
            </a-select>
          </a-form-item>
          <a-form-item label="教师角色">
            <a-select v-model:value="newUserInfo.teacherType">
              <a-select-option value="组长">组长</a-select-option>
              <a-select-option value="小组秘书兼评阅教师">秘书兼评阅教师</a-select-option>
              <a-select-option value="指导教师">指导教师</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <div v-if="newUserInfo.type === '学生'" :gutter="8">
        <a-row>
          <a-divider dashed orientation="left">
            <p style="font-weight: bolder">学生选题录入</p>
          </a-divider>
          <a-col span="11">
            <a-form-item label="课题类别">
              <a-radio-group
                option-type="button"
                v-model:value="topic1"
                :options="t1_options"
                @change="handleChange" />
            </a-form-item>
          </a-col>

          <a-col span="8">
            <a-form-item label="课题类型">
              <a-radio-group
                option-type="button"
                v-model:value="topic2"
                :options="t2_options"
                @change="handleChange" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col span="6">
            <a-form-item label="新旧课题">
              <a-radio-group
                option-type="button"
                v-model:value="topic3"
                :options="t3_options"
                @change="handleChange" />
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <a-row>
        <a-col span="24">
          <a-form-item :wrapper-col="{ offset: 3 }">
            <a-button size="large" type="primary" @click="showConfirmDialog" style="width: 250px"
              >确认新增用户</a-button
            >
            <a-modal
              v-model:open="isShowConfirmDialog"
              title="提交确认"
              :confirm-loading="confirmLoading"
              @ok="handleOk">
              <p>{{ confirmText }}</p>
            </a-modal>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<style scoped>
.main {
  height: 100%;
}
</style>
