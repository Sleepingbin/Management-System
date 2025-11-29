<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import http from '@/utils/http';
import { getUserInfo } from '@/utils/auth';

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const oldPasswd: string = '1234'; // 测试假设旧密码是 1234
// const oldPasswd = ref<string>("");

const formRef = ref();

interface FormState {
  inputOldPasswd: string;
  newPasswd: string;
  confirmPasswd: string;
}

const formState = reactive<FormState>({
  inputOldPasswd: '',
  newPasswd: '',
  confirmPasswd: ''
});

const disabled = computed(() => {
  return !(formState.inputOldPasswd && formState.newPasswd && formState.confirmPasswd);
});

// 检查旧密码是否输入正确
const wrongOldPasswd = () => {
  if (oldPasswd !== formState.inputOldPasswd) {
    message.error('旧密码输入错误');
    return false;
  } else {
    return true;
  }
};

// 检查新密码是否为空
const emptyNewPasswd = () => {
  if (formState.newPasswd === '') {
    message.error('新密码不能为空');
    return false;
  } else {
    return true;
  }
};

// 检查两次输入的新密码是否一致
const comparePasswd = () => {
  if (formState.newPasswd !== formState.confirmPasswd) {
    message.error('两次输入的新密码不一致');
    return false;
  } else {
    return true;
  }
};

// 检查新密码是否与旧密码相同
const oldAndNewPasswd = () => {
  if (oldPasswd === formState.newPasswd) {
    message.error('新密码不能与旧密码相同');
    return false;
  } else {
    return true;
  }
};

const passwdLength = () => {
  if (formState.confirmPasswd.length < 6 || formState.newPasswd.length > 20) {
    message.error('密码长度不能小于6位或大于20位');
    return false;
  } else {
    return true;
  }
};

// 提交表单处理
const onFinish = async () => {
  // 如果所有检查通过，发送数据到后端
  if (
    wrongOldPasswd() &&
    emptyNewPasswd() &&
    oldAndNewPasswd() &&
    comparePasswd() &&
    passwdLength()
  ) {
    try {
      const response = await http.post('/changePasswd', {
        user_id: getUserInfo().user_id,
        newPasswd: formState.newPasswd
      });

      // 只有当响应状态码为 200 时，才显示成功消息
      if (response.status === 200) {
        message.success('修改密码成功');

        // 清空表单数据
        formState.inputOldPasswd = '';
        formState.newPasswd = '';
        formState.confirmPasswd = '';
      } else {
        message.error('修改密码失败，请稍后重试');
      }
    } catch (error) {
      message.error('网络错误，请稍后重试');
      console.error('修改密码时出错:', error);
    }
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log('修改失败:', errorInfo);
};
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px"
    :ref="formRef"
    :model="formState"
    @finish="onFinish"
    @finishFailed="onFinishFailed">
    <a-form-item label="旧密码">
      <a-input-password
        name="inputOldPasswd"
        v-model:value="formState.inputOldPasswd"
        placeholder="请输入旧密码" />
    </a-form-item>

    <a-form-item label="新密码">
      <a-input-password
        name="newPasswd"
        v-model:value="formState.newPasswd"
        placeholder="请输入新密码" />
    </a-form-item>

    <a-form-item label="确认新密码">
      <a-input-password
        name="confirmPasswd"
        v-model:value="formState.confirmPasswd"
        placeholder="再次输入新密码" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 6, span: 6 }">
      <a-button :disabled="disabled" type="primary" html-type="submit"> 确认修改 </a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped></style>
