import { reactive } from 'vue';

const userState = reactive({
  isLoggedIn: false,
  user_id: null,
  user_type: null
});

export function updateUserState(isLoggedIn: boolean, user_id: string, user_type: string) {
  userState.isLoggedIn = isLoggedIn;
  userState.user_id = user_id;
  userState.user_type = user_type;

  // 将用户信息存储到 sessionStorage
  sessionStorage.setItem('user_id', user_id);
  sessionStorage.setItem('user_type', user_type);
}

export function setLogout() {
  // 清除 sessionStorage
  sessionStorage.removeItem('user_id');
  sessionStorage.removeItem('user_type');

  // 清空用户状态
  userState.isLoggedIn = false;
  userState.user_id = null;
  userState.user_type = null;
}

export function isLoggedIn(): boolean {
  // 检查 sessionStorage 中是否有用户信息
  const user_id = sessionStorage.getItem('user_id');
  const user_type = sessionStorage.getItem('user_type');
  return !!user_id && !!user_type; // 如果 user_id 和 user_type 都存在，则返回 true
}

export function getUserInfo() {
  // 从 sessionStorage 中获取用户信息
  const user_id = sessionStorage.getItem('user_id');
  const user_type = sessionStorage.getItem('user_type');
  return {
    user_id,
    user_type
  };
}
