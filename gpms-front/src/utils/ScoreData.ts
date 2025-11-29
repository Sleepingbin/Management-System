import { ref } from 'vue';
import { getUserInfo } from '@/utils/auth';

export interface ScoreData {
  id: string;

  // 开题报告
  startScore1: number | null;
  startScore2: number | null;
  startScore3: number | null;
  startScore: number | null;
  startEva: string | null;

  // 外文翻译
  transScore1: number | null;
  transScore2: number | null;
  transScore3: number | null;
  transScore: number | null;
  transEva: string | null;

  // 中期检查
  midScore1: number | null;
  midScore2: number | null;
  midScore3: number | null;
  midScore: number | null;
  midEva: string | null;

  // 指导老师
  teachScore1: number | null;
  teachScore2: number | null;
  teachScore3: number | null;
  teachScore4: number | null;
  teachScore5: number | null;
  teachScore: number | null;
  teachEva: string | null;

  // 评阅老师
  readScore1: number | null;
  readScore2: number | null;
  readScore3: number | null;
  readScore4: number | null;
  readScore: number | null;
  readEva: string | null;

  // 答辩记录
  defRecord: string | null;

  // 答辩小组
  defScore1: number | null;
  defScore2: number | null;
  defScore3: number | null;
  defScore4: number | null;
  defScore: number | null;
  defEva: string | null;

  // 委员会总评
  finalScore: number | null;
  finalEva: string | null;
}

export const thisScore = ref<ScoreData>({
  id: getUserInfo().user_id,
  // 开题报告
  startScore1: null,
  startScore2: null,
  startScore3: null,
  startScore: null,
  startEva: '',

  // 外文翻译
  transScore1: null,
  transScore2: null,
  transScore3: null,
  transScore: null,
  transEva: '',

  // 中期检查
  midScore1: null,
  midScore2: null,
  midScore3: null,
  midScore: null,
  midEva: '',

  // 指导老师
  teachScore1: null,
  teachScore2: null,
  teachScore3: null,
  teachScore4: null,
  teachScore5: null,
  teachScore: null,
  teachEva: '',

  // 评阅老师
  readScore1: null,
  readScore2: null,
  readScore3: null,
  readScore4: null,
  readScore: null,
  readEva: '',

  // 答辩记录
  defRecord: null,

  // 答辩小组
  defScore1: null,
  defScore2: null,
  defScore3: null,
  defScore4: null,
  defScore: null,
  defEva: '',

  // 委员会总评
  finalScore: null,
  finalEva: ''
});

// null 显示为尚未评分
export function formatScore(score: number | string): string | number {
  return score === null ? '尚未评分' : score;
}

// null 或空字符串显示为无评价
export function formatEvaluation(eva: string | null | undefined): string {
  return eva === null || eva === undefined || eva === '' ? '暂无评价' : eva;
}
