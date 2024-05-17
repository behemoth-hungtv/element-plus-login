import { NO_RESET_WHITE_LIST } from '@/constants'
import { useI18n } from '@/hooks/web/useI18n'
import { Layout } from '@/utils/routerHelper'
import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStoreWithOut } from '@/store/modules/user'
import { NO_REDIRECT_WHITE_LIST } from '@/constants'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: t('router.dashboard'),
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/Dashboard/Analysis.vue'),
        name: 'Analysis',
        meta: {
          title: t('router.analysis'),
          noCache: true,
          affix: true
        }
      }
    ]
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/profile',
    component: Layout,
    name: 'Profile',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/Profile/Profile.vue'),
        name: 'ProfileDemo',
        meta: {
          title: 'Profile',
          icon: 'mdi:user'
        }
      }
    ]
  },
  {
    path: '/proxy',
    component: Layout,
    name: 'Proxy',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/Proxy/Proxy.vue'),
        name: 'ProxyIndex',
        meta: {
          title: 'Proxy',
          icon: 'mdi:proxy'
        }
      }
    ]
  },
  {
    path: '/extension',
    component: Layout,
    name: 'Extension',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/Extension/Extension.vue'),
        name: 'ExtensionIndex',
        meta: {
          title: 'Extension',
          icon: 'mdi:extension'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap.concat(asyncRouterMap) as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !NO_RESET_WHITE_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStoreWithOut()

  if (userStore.getToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (NO_REDIRECT_WHITE_LIST.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
    }
  }
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
