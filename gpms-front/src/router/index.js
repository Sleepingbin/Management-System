import { createRouter, createWebHistory } from 'vue-router';
import { getUserInfo, isLoggedIn } from '@/utils/auth';
import Home from '@/views/Home.vue';
import StuProcess from '@/views/stu/StuProcess.vue';
import SignScore from '@/views/teach/SignScore.vue';
import Login from '@/views/Login.vue';
import OverView from '@/views/common/OverView.vue';

const routes = [
  {
    path: '/',
    name: 'default',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/overview',
    children: [
      {
        path: '/overview',
        name: 'overview',
        component: OverView
      },
      {
        path: '/process',
        name: 'process',
        component: StuProcess,
        meta: {
          requiresAuth: true,
          roles: ['学生']
        }
      },
      {
        path: '/grade',
        name: 'grade',
        component: () => import('@/views/stu/GradeTable.vue'),
        meta: {
          requiresAuth: true,
          roles: ['学生']
        }
      },
      {
        path: '/info',
        name: 'info',
        component: () => import('@/views/Info.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/editInfo',
        name: 'editInfo',
        component: () => import('@/components/InfoEditor.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/changePasswd',
        name: 'changePasswd',
        component: () => import('@/views/ChangePasswd.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/showStu',
        name: 'showStu',
        component: () => import('@/views/teach/ShowStuList.vue'),
        meta: {
          requiresAuth: true,
          roles: ['指导教师', '小组秘书兼评阅教师', '组长']
        }
      },
      {
        path: '/uploadRequire',
        name: 'uploadRequire',
        component: () => import('@/views/teach/UploadRequirement.vue'),
        meta: {
          requiresAuth: true,
          roles: ['指导教师']
        }
      },
      {
        path: '/groupArrange',
        name: 'groupArrange',
        component: () => import('@/views/admin/ShowGroupArrange.vue'),
        meta: {
          requiresAuth: true,
          roles: ['管理员']
        }
      },
      {
        path: '/signScore/:stu_id',
        name: 'signScore',
        component: SignScore,
        meta: {
          requiresAuth: true,
          roles: ['指导教师', '小组秘书兼评阅教师', '组长']
        }
      },
      {
        path: '/showUser',
        name: 'showUser',
        component: () => import('@/views/admin/ShowUser.vue'),
        meta: {
          requiresAuth: true,
          roles: ['管理员']
        }
      },
      {
        path: '/showAllScore',
        name: 'showAllScore',
        component: () => import('@/views/admin/ShowAllScore.vue'),
        meta: {
          requiresAuth: true,
          roles: ['管理员']
        }
      },
      {
        path: '/addUser',
        name: 'addUser',
        component: () => import('@/views/admin/AddUser.vue'),
        meta: {
          requiresAuth: true,
          roles: ['管理员']
        }
      },
      {
        path: '/changeGroup',
        name: 'changeGroup',
        component: () => import('@/views/admin/ChangeGroup.vue'),
        meta: {
          requiresAuth: true,
          roles: ['管理员']

        }
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/common/403.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/common/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});
router.beforeEach((to, from, next) => {
  const userRole = getUserInfo().user_type;

  if (to.meta.requiresAuth) {
    if (!isLoggedIn()) {
      next('/login');
    } else {
      const roles = to.meta.roles && Array.isArray(to.meta.roles) ? to.meta.roles : [];
      if (roles.length === 0 || roles.includes(userRole)) {
        next();
      } else {
        next('/403');
      }
    }
  } else {
    next();
  }
});

export default router;
