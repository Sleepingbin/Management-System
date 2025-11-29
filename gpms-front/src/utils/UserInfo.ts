import { RegionInputModel } from 'v-region';
import { ref } from 'vue';
import { SelectProps } from 'ant-design-vue';

export interface FullUserInfo {
  user_id: string;
  name: string;
  age: string | number;
  gender: string;
  type: string;
  class: string;
  major: string;
  title: string;
  teacherType: string;
  teacherGroup: number | null;
  stuGroup: number | null;
  tel: string;
  email: string;
  region: RegionInputModel;
  detailAdd: string;
  user_pic: string;
}

export interface EditUserInfo {
  user_id: string;
  tel: string | null;
  email: string | null;
  region: RegionInputModel;
  detailAdd: string | null;
}

export const thisFullUserInfo = ref<FullUserInfo>({
  user_id: '',
  name: '',
  age: '',
  gender: '',
  type: '',
  class: '',
  major: '',
  title: '',
  teacherType: '',
  teacherGroup: null,
  stuGroup: null,
  tel: '',
  email: '',
  region: {
    province: '',
    city: '',
    area: '',
    town: ''
  },
  detailAdd: '',
  user_pic: ''
});

export const newUserInfo = ref<FullUserInfo>({
  user_id: null,
  name: null,
  age: null,
  gender: null,
  type: null,
  class: null,
  major: null,
  title: null,
  teacherType: null,
  teacherGroup: null,
  stuGroup: null,
  tel: null,
  email: null,
  region: {
    province: null,
    city: null,
    area: null,
    town: null
  },
  detailAdd: null,
  user_pic: null
});

export const thisEditUserInfo = ref<EditUserInfo>({
  user_id: '',
  tel: '',
  email: '',
  region: <RegionInputModel>{
    province: '',
    city: '',
    area: '',
    town: ''
  },
  detailAdd: ''
});

export const topic1 = ref<string>('');
export const topic2 = ref<string>('');
export const topic3 = ref<string>('');
export const t1_options = [
  { label: '工程设计', value: 'A' },
  { label: '科学研究', value: 'B' },
  { label: '技术开发', value: 'C' },
  { label: '其他', value: 'D' }
];
export const t2_options = [
  { label: '真题', value: 'A' },
  { label: '假题', value: 'B' },
  { label: '假题真做', value: 'C' }
];
export const t3_options = [
  { label: '新题', value: 'A' },
  { label: '旧题', value: 'B' }
];
export const GroupOptions = ref<SelectProps['options']>([
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: '13', value: '13' },
  { label: '14', value: '14' },
  { label: '15', value: '15' },
  { label: '16', value: '16' },
  { label: '17', value: '17' },
  { label: '18', value: '18' },
  { label: '19', value: '19' },
  { label: '20', value: '20' },
  { label: '21', value: '21' },
  { label: '22', value: '22' },
  { label: '23', value: '23' },
  { label: '24', value: '24' }
]);
