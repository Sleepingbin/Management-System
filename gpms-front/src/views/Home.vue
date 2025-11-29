<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import { ref } from 'vue';
import {
  UserOutlined,
  LaptopOutlined,
  TeamOutlined,
  SettingOutlined,
  UserAddOutlined,
  LockOutlined,
  FormOutlined,
  GithubOutlined,
  UpOutlined,
  GlobalOutlined,
  ReadOutlined,
  HomeOutlined,
  ZhihuOutlined,
  UploadOutlined,
  LayoutOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue';
import { getUserInfo } from '@/utils/auth';

const selectedKeys2 = ref<string[]>(['0']);
import { RouterLink } from 'vue-router';
import { setLogout } from '@/utils/auth';
import router from '@/router';

const openKeys = ref<string[]>(['sub1']);

const handleLogout = async () => {
  setLogout();
  await router.push({ name: 'login' });
};
</script>

<template>
  <a-layout class="a-layout">
    <a-layout-header class="header" style="background-color: #2260bd; height: 12vh">
      <div class="header-container">
        <div class="logo">
          <img src="/book2.png" alt="logo" />
        </div>
        <span class="header-text">EZ毕业设计管理系统</span>
        <div class="header-right">
          <span style="margin-right: 20px; font-weight: normal; color: #e9e9e9; font-size: 16px">{{
            getUserInfo().user_id
          }}</span>
          <span style="margin-right: 20px; font-weight: normal; color: #e9e9e9; font-size: 16px">
            {{ getUserInfo().user_type }}
          </span>
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="info">
                  <router-link to="/info">个人信息</router-link>
                </a-menu-item>
                <a-menu-item key="logout" @click="handleLogout">
                  <router-link to="/logout">退出登录</router-link>
                </a-menu-item>
              </a-menu>
            </template>
            <a class="ant-dropdown-link" onclick="e => e.preventDefault()">
              <a-avatar size="large">
                <template #icon>
                  <user-outlined />
                </template>
              </a-avatar>
            </a>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px" class="a-layout-content">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            mode="inline"
            style="height: 100%">
            <a-menu-item key="1">
              <AppstoreOutlined />
              <router-link to="/overview">概览</router-link>
            </a-menu-item>

            <a-menu-item key="31" v-if="getUserInfo().user_type === '学生'">
              <user-outlined />
              <router-link to="/process">进度</router-link>
            </a-menu-item>

            <a-menu-item key="32" v-if="getUserInfo().user_type === '学生'">
              <router-link to="/grade">
                <laptop-outlined />
                成绩
              </router-link>
            </a-menu-item>

            <a-menu-item
              key="21"
              v-if="
                getUserInfo().user_type === '指导教师' ||
                getUserInfo().user_type === '小组秘书兼评阅教师' ||
                getUserInfo().user_type === '组长'
              ">
              <router-link to="/showStu">
                <laptop-outlined />
                学生列表
              </router-link>
            </a-menu-item>

            <a-menu-item key="22" v-if="getUserInfo().user_type === '指导教师'">
              <router-link to="/uploadRequire">
                <UploadOutlined />
                要求上传
              </router-link>
            </a-menu-item>

            <a-sub-menu key="sub5"  v-if="getUserInfo().user_type === '管理员'">
              <template #title>
                <span>
                  <SettingOutlined />
                  分组
                </span>
              </template>
              <a-menu-item key="01">
                <router-link to="/groupArrange">
                  <LayoutOutlined />
                  分组情况
                </router-link>
              </a-menu-item>
              <a-menu-item key="09" v-if="getUserInfo().user_type === '管理员'">
                <router-link to="/changeGroup">
                  <LayoutOutlined />
                  修改分组
                </router-link>
              </a-menu-item>
            </a-sub-menu>


            <a-menu-item key="02" v-if="getUserInfo().user_type === '管理员'">
              <router-link to="/showUser">
                <TeamOutlined />
                用户基本信息
              </router-link>
            </a-menu-item>

            <a-menu-item key="03" v-if="getUserInfo().user_type === '管理员'">
              <router-link to="/addUser">
                <UserAddOutlined />
                添加用户
              </router-link>
            </a-menu-item>

            <a-menu-item key="04" v-if="getUserInfo().user_type === '管理员'">
              <router-link to="/showAllScore">
                <FormOutlined />
                学生成绩汇总
              </router-link>
            </a-menu-item>

            <a-sub-menu key="sub1">
              <template #title>
                <span>
                  <SettingOutlined />
                  个人空间
                </span>
              </template>

              <a-menu-item key="2">
                <router-link to="/info">
                  <user-outlined />
                  基本信息
                </router-link>
              </a-menu-item>

              <a-menu-item key="3">
                <router-link to="/editInfo">
                  <FormOutlined />
                  修改信息
                </router-link>
              </a-menu-item>

              <a-menu-item key="4">
                <router-link to="/changePasswd">
                  <LockOutlined />
                  修改密码
                </router-link>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <router-view class="router-view" />
          <a-float-button-group trigger="hover" type="primary" :style="{ right: '94px' }">
            <template #icon>
              <UpOutlined />
            </template>
            <a-float-button tooltip="知网" href="https://www.cnki.net/">
              <template #icon>
                <ZhihuOutlined />
              </template>
            </a-float-button>
            <a-float-button tooltip="建大图书馆" href="http://lib.bucea.edu.cn/home/">
              <template #icon>
                <ReadOutlined />
              </template>
            </a-float-button>
            <a-float-button tooltip="信息门户" href="https://sso.bucea.edu.cn/">
              <template #icon>
                <HomeOutlined />
              </template>
            </a-float-button>
            <a-float-button tooltip="学校官网" href="https://www.bucea.edu.cn/">
              <template #icon>
                <GlobalOutlined />
              </template>
            </a-float-button>
          </a-float-button-group>
          <a-float-button
            tooltip="Github"
            href="https://github.com/Biiddd/ez-gpms-front/"
            shape="circle"
            type="primary"
            :style="{
              right: '164px'
            }">
            <template #icon>
              <GithubOutlined />
            </template>
          </a-float-button>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center; height: 3vh">
      Biid Xuan Malibin ©2024 Power by Ali Cloud
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.header-container {
  display: flex; /* 启用Flexbox布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: space-between; /* 水平方向上两端对齐，中间留有空隙 */
}

.logo {
  width: 90px;
  height: 90px;
}

.logo img {
  width: 100%;
  height: auto;
  transform: scale(0.8);
}

.header-text {
  font-weight: bolder;
  font-size: 48px;
  color: #e9e9e9;
  margin-left: 50px;
}

.header-right {
  float: right;
  display: flex;
  align-items: center;
  height: 100%;
}

.a-layout-content {
  display: flex;
  flex-direction: column;
}
.router-view {
  flex: 1;
}

#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
