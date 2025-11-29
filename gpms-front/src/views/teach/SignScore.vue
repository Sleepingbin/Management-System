<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import http from '@/utils/http';
import { thisScore } from '@/utils/ScoreData';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { getUserInfo } from '@/utils/auth';
import unauthorizedSign from '@/views/common/UnauthorizedSign.vue';
import Download from '@/components/Download.vue';

const labelCol = { style: { width: '300px' } };
const wrapperCol = { span: 14 };

const route = useRoute();
const stu_id: string = route.params.stu_id.toString();

const current = ref<number>();
const showForm = ref<boolean>();
const showEnd = ref<boolean>();
const showUnAuthorized = ref<boolean>();

const steps = [
  {
    title: '外文翻译成绩'
  },
  {
    title: '开题成绩'
  },
  {
    title: '中期成绩'
  },
  {
    title: '指导教师成绩'
  },
  {
    title: '评阅成绩'
  },
  {
    title: '答辩记录'
  },
  {
    title: '答辩成绩'
  },
  {
    title: '最终成绩'
  }
];

const warningText = ref<string>();

const setDisable = ref<boolean>();
http
  .post('/teacher/getState', { teacher_type: getUserInfo().user_type, stu_id: stu_id })
  .then((res) => {
    current.value = res.data.data.teacherStateCode;
    setDisable.value = res.data.data.disableForm;
    showForm.value = res.data.data.showForm;
    showEnd.value = res.data.data.showEnd;
    showUnAuthorized.value = res.data.data.showUnAuthorized;
    warningText.value = res.data.msg;
  });

http.post('/stu/getScore', { stu_id: stu_id }).then((res) => {
  thisScore.value = res.data;
});

const items = steps.map((item) => ({ key: item.title, title: item.title }));

const tempFinalEva = ref<string | null>(null);

const confirmText = ref<string>('成绩提交后无法修改, 是否确认提交?');
const confirmLoading = ref<boolean>(false);
const isShowConfirmDialog = ref<boolean>(false);
const showConfirmDialog = () => {
  isShowConfirmDialog.value = true;
};

const validSubmit = () => {
  switch (current.value) {
    case 0:
      return (
        thisScore.value.transScore1 != null &&
        thisScore.value.transScore2 != null &&
        thisScore.value.transScore3 != null
      );
    case 1:
      return (
        thisScore.value.startScore1 != null &&
        thisScore.value.startScore2 != null &&
        thisScore.value.startScore3 != null
      );
    case 2:
      return (
        thisScore.value.midScore1 != null &&
        thisScore.value.midScore2 != null &&
        thisScore.value.midScore3 != null
      );
    case 3:
      return (
        thisScore.value.teachScore1 != null &&
        thisScore.value.teachScore2 != null &&
        thisScore.value.teachScore3 != null &&
        thisScore.value.teachScore4 != null &&
        thisScore.value.teachScore5 != null
      );
    case 4:
      return (
        thisScore.value.readScore1 != null &&
        thisScore.value.readScore2 != null &&
        thisScore.value.readScore3 != null &&
        thisScore.value.readScore4 != null
      );
    case 5:
      return thisScore.value.defRecord != null;
    case 6:
      return (
        thisScore.value.defScore1 != null &&
        thisScore.value.defScore2 != null &&
        thisScore.value.defScore3 != null &&
        thisScore.value.defScore4 != null
      );
    case 7:
      return tempFinalEva.value != null;
    default:
      return false;
  }
};

const handleOk = () => {
  if (validSubmit()) {
    confirmText.value = '提交中...';
    confirmLoading.value = true;
    onSubmit().finally(() => {
      confirmLoading.value = false;
    });
  } else {
    message.error('请填写完整的成绩');
  }
};

const onSubmit = async () => {
  try {
    thisScore.value.finalEva = tempFinalEva.value;
    const response = await http.put('/teacher/updateScore', {
      ...thisScore.value
    });
    isShowConfirmDialog.value = false;
    if (response.status === 200) {
      message.success('提交成绩成功');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      message.success('刷新成功');
    }
  } catch (error) {
    message.error('网络错误, 请重试', error);
  }
};
onMounted(() => {
  confirmText.value = '成绩提交后无法修改, 是否确认提交?';
});
</script>

<template>
  <div>
    <a-steps :current="current" :items="items"></a-steps>
  </div>
  <div class="steps-content" v-if="showForm">
    <a-form
      :disabled="setDisable"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 1100px">
      <a-row>
        <a-col span="24">
          <a-form-item>
            <span class="warning-text">{{ warningText }}</span>
          </a-form-item>
        </a-col>
      </a-row>

      <div v-if="current === 0" class="form-container">
        <a-form
          :disabled="setDisable"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          layout="horizontal"
          style="max-width: 1100px">
        <a-row>
          <a-col span="12">
            <a-form-item :wrapper-col="{ offset: 8, span: 12 }">
              <Download
                button_text="点击下载学生翻译文件"
                :user-id="stu_id"
                file-name="外文翻译"
                file-type="pdf"></Download>
            </a-form-item>
          </a-col>
          <a-col span="12"></a-col>
        </a-row>

        <a-row>
          <a-col span="12">
            <a-form-item label="翻译阅读理解成绩" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~1"
                size="large"
                min="0"
                max="1"
                :controls="false"
                v-model:value="thisScore.transScore1" />
            </a-form-item>

            <a-form-item label="翻译准确性成绩" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~1"
                size="large"
                min="0"
                max="1"
                :controls="false"
                v-model:value="thisScore.transScore2" />
            </a-form-item>

            <a-form-item label="规范性与质量成绩" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~1"
                size="large"
                min="0"
                max="1"
                :controls="false"
                v-model:value="thisScore.transScore3" />
            </a-form-item>
          </a-col>
          <a-col span="12"> </a-col>
        </a-row>
        </a-form>
      </div>

      <!--      开题打分表单      -->
      <div v-if="current === 1">
        <!--        下载按钮-->
        <a-row>
          <a-col span="12">
            <a-form-item :wrapper-col="{ offset: 8, span: 12 }">
              <Download
                button_text="点击下载学生开题报告"
                :user-id="stu_id"
                file-name="开题报告"
                file-type="pdf"></Download>
            </a-form-item>
          </a-col>
          <a-col span="12"></a-col>
        </a-row>

        <a-row>
          <a-col span="12">
            <a-form-item label="调研资料获取能力" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~4"
                size="large"
                min="0"
                max="4"
                :controls="false"
                v-model:value="thisScore.startScore1" />
            </a-form-item>
            <a-form-item label="方案设计合理性" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~4"
                size="large"
                min="0"
                max="4"
                :controls="false"
                v-model:value="thisScore.startScore2" />
            </a-form-item>
            <a-form-item label="规范性与质量" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~4"
                size="large"
                min="0"
                max="4"
                :controls="false"
                v-model:value="thisScore.startScore3" />
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <!--      中期打分表单      -->
      <div v-if="current === 2">
        <!--        下载按钮-->
        <a-row>
          <a-col span="12">
            <a-form-item label="毕设进度情况" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~5"
                size="large"
                min="0"
                max="5"
                :controls="false"
                v-model:value="thisScore.midScore1" />
            </a-form-item>
            <a-form-item label="综合能力" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~5"
                size="large"
                min="0"
                max="5"
                :controls="false"
                v-model:value="thisScore.midScore2" />
            </a-form-item>
            <a-form-item label="已完成毕设质量" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~5"
                size="large"
                min="0"
                max="5"
                :controls="false"
                v-model:value="thisScore.midScore3" />
            </a-form-item>
            <a-form-item label="中期评语" :wrapper-col="{ offset: 1, span: 6 }">
              <a-textarea v-model:value="thisScore.midEva" />
            </a-form-item>
          </a-col>
          <a-col span="12"></a-col>
        </a-row>
      </div>

      <!--      指导老师评语建议打分表单      -->
      <div v-if="current === 3">
        <a-row>
          <a-col span="12">
            <a-form-item label="设计能力" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~3"
                size="large"
                min="0"
                max="3"
                :controls="false"
                v-model:value="thisScore.teachScore1" />
            </a-form-item>
            <a-form-item label="理论应用能力" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~3"
                size="large"
                min="0"
                max="3"
                :controls="false"
                v-model:value="thisScore.teachScore2" />
            </a-form-item>
            <a-form-item label="知识综合运用能力" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~3"
                size="large"
                min="0"
                max="3"
                :controls="false"
                v-model:value="thisScore.teachScore3" />
            </a-form-item>
            <a-form-item label="素养、态度、纪律表现" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~3"
                size="large"
                min="0"
                max="3"
                :controls="false"
                v-model:value="thisScore.teachScore4" />
            </a-form-item>
            <a-form-item label="毕设规范性与质量" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~3"
                size="large"
                min="0"
                max="3"
                :controls="false"
                v-model:value="thisScore.teachScore5" />
            </a-form-item>
            <a-form-item label="指导老师评语" :wrapper-col="{ offset: 1, span: 6 }">
              <a-textarea v-model:value="thisScore.teachEva" />
            </a-form-item>
          </a-col>
          <a-col span="12"></a-col>
        </a-row>
      </div>

      <!--      评阅打分表单      -->
      <div v-if="current === 4">
        <a-row>
          <a-col span="12">
            <a-form-item label="毕设规范性与质量" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~4"
                size="large"
                min="0"
                max="4"
                :controls="false"
                v-model:value="thisScore.readScore1" />
            </a-form-item>
            <a-form-item label="理论知识运用情况" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~4"
                size="large"
                min="0"
                max="4"
                :controls="false"
                v-model:value="thisScore.readScore2" />
            </a-form-item>
            <a-form-item label="研究设计方案" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~4"
                size="large"
                min="0"
                max="4"
                :controls="false"
                v-model:value="thisScore.readScore3" />
            </a-form-item>
            <a-form-item label="毕设创新型" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~3"
                size="large"
                min="0"
                max="3"
                :controls="false"
                v-model:value="thisScore.readScore4" />
            </a-form-item>
            <a-form-item label="评阅老师评语" :wrapper-col="{ offset: 1, span: 6 }">
              <a-textarea v-model:value="thisScore.readEva" />
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <!--      答辩记录表-->
      <div v-if="current === 5">
        <!--        下载按钮-->
        <a-row>
          <a-col span="12">
            <a-form-item :wrapper-col="{ offset: 8, span: 12 }">
              <Download
                button_text="点击下载学生答辩申请表"
                :user-id="stu_id"
                file-name="答辩申请表"
                file-type="pdf"></Download>
            </a-form-item>
          </a-col>
          <a-col span="12"></a-col>
        </a-row>
        <a-row>
          <a-col span="12">
            <a-form-item label="答辩记录" :wrapper-col="{ offset: -6, span: 6 }">
              <a-textarea
                v-model:value="thisScore.defRecord"
                :disabled="getUserInfo().user_type === '指导教师'" />
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <!--      答辩打分表单      -->
      <div v-if="current === 6">
        <a-row>
          <a-col span="12">
            <a-form-item label="毕设陈述情况" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~10"
                size="large"
                min="0"
                max="10"
                :controls="false"
                v-model:value="thisScore.defScore1" />
            </a-form-item>
            <a-form-item label="毕设（论文）水平" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~10"
                size="large"
                min="0"
                max="10"
                :controls="false"
                v-model:value="thisScore.defScore2" />
            </a-form-item>
            <a-form-item label="毕设工作量评分" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~10"
                size="large"
                min="0"
                max="10"
                :controls="false"
                v-model:value="thisScore.defScore3" />
            </a-form-item>

            <a-form-item label="答辩情况" :wrapper-col="{ offset: -6, span: 6 }">
              <a-input-number
                placeholder="0~10"
                size="large"
                min="0"
                max="10"
                :controls="false"
                v-model:value="thisScore.defScore4" />
            </a-form-item>
            <a-form-item label="答辩小组评语" :wrapper-col="{ offset: 1, span: 6 }">
              <a-textarea v-model:value="thisScore.defEva" />
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <!--      最终评价表单      -->
      <div v-if="current === 7">
        <a-row>
          <a-col span="12">
            <a-form-item label="最终评价" :wrapper-col="{ offset: 1, span: 12 }">
              <a-textarea v-model:value="tempFinalEva" />
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <a-row>
        <a-col span="12">
          <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
            <a-button size="large" type="primary" @click="showConfirmDialog">提交成绩</a-button>
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

  <div v-if="showEnd" class="steps-content">
    <a-result status="success" title="该学生评分工作已完成">
      <template #extra>
        <Download
          button_text="点击下载评价手册"
          :user-id="stu_id"
          file-name="评价手册"
          file-type="docx"></Download>
      </template>
    </a-result>
  </div>
  <div v-if="showUnAuthorized" class="steps-content">
    <unauthorizedSign></unauthorizedSign>
  </div>
</template>

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

.warning-text {
  font-size: 16px;
  font-weight: bolder;
  padding-top: -10px;
  padding-bottom: 20px;
}
</style>
