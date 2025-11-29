<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { RegionSelects } from 'v-region';
import http from '@/utils/http';
import { thisEditUserInfo } from '@/utils/UserInfo';
import { message } from 'ant-design-vue';
import { getUserInfo } from '@/utils/auth';

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };

const emailRegex: RegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const telRegex: RegExp = /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[6]|17[0-8]|18[0-9]|19[8,9])\d{8}$/;

const confirmText = ref<string>('是否确认修改修改信息?');
const confirmLoading = ref<boolean>(false);
const isShowConfirmDialog = ref<boolean>(false);
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
  if (!emailRegex.test(thisEditUserInfo.value.email)) {
    message.error('请输入正确的邮箱地址');
    return false;
  }
  if (!telRegex.test(thisEditUserInfo.value.tel)) {
    message.error('请输入正确的手机号码');
    return false;
  }
  return true;
}

const onSubmitClick = async () => {
  if (validFormData()) {
    try {
      await http.put('/updateInfo', thisEditUserInfo.value);
      isShowConfirmDialog.value = false;
      message.success('修改成功');
    } catch (error) {
      message.error('未知错误, 请重试');
    }
  }
};

onMounted(() => {
  http.post('/getEditInfo', { user_id: getUserInfo().user_id }).then((res) => {
    thisEditUserInfo.value = res.data;
  });
});
</script>

<template>
  <a-form
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="horizontal"
    style="max-width: 600px">
    <a-form-item label="联系方式">
      <a-input v-model:value="thisEditUserInfo.tel" />
    </a-form-item>

    <a-form-item label="邮箱">
      <a-input v-model:value="thisEditUserInfo.email" />
    </a-form-item>

    <a-form-item label="联系地址">
      <RegionSelects v-model="thisEditUserInfo.region" />
    </a-form-item>

    <a-form-item label="详细地址">
      <a-input v-model:value="thisEditUserInfo.detailAdd" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 6, span: 6 }">
      <a-button type="primary" @click="showConfirmDialog">确认编辑</a-button>
      <a-modal
        v-model:open="isShowConfirmDialog"
        title="提交确认"
        :confirm-loading="confirmLoading"
        @ok="handleOk">
        <p>{{ confirmText }}</p>
      </a-modal>
    </a-form-item>
  </a-form>
</template>
