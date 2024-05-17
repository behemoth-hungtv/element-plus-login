import { loginOutApi } from '@/api/login'
import { UserLoginType, UserType } from '@/api/login/types'
import { useI18n } from '@/hooks/web/useI18n'
import { ElMessageBox } from 'element-plus'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { store } from '../index'
import { useTagsViewStore } from './tagsView'
import router from '@/router'

interface UserState {
  userInfo?: UserType
  tokenKey: string
  token: string
  rememberMe: boolean
  loginInfo?: UserLoginType
  refreshToken: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userInfo: undefined,
      tokenKey: 'Authorization',
      token: '',
      rememberMe: true,
      loginInfo: undefined,
      refreshToken: ''
    }
  },
  getters: {
    getTokenKey(): string {
      return this.tokenKey
    },
    getToken(): string {
      return this.token
    },
    getRefreshToken(): string {
      return this.refreshToken
    },
    getUserInfo(): UserType | undefined {
      return this.userInfo
    },
    getRememberMe(): boolean {
      return this.rememberMe
    },
    getLoginInfo(): UserLoginType | undefined {
      return this.loginInfo
    }
  },
  actions: {
    setTokenKey(tokenKey: string) {
      this.tokenKey = tokenKey
    },
    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken
    },
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo?: UserType) {
      this.userInfo = userInfo
    },
    logoutConfirm() {
      const { t } = useI18n()
      ElMessageBox.confirm(t('common.loginOutMessage'), t('common.reminder'), {
        confirmButtonText: t('common.ok'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      })
        .then(async () => {
          // const res = await loginOutApi().catch(() => {})
          // if (res) {
          //   this.reset()
          // }

          this.reset()
        })
        .catch(() => {})
    },
    reset() {
      const tagsViewStore = useTagsViewStore()
      tagsViewStore.delAllViews()
      this.setToken('')
      this.setRefreshToken('')
      this.setUserInfo(undefined)

      router.push('/login')
    },
    logout() {
      this.reset()
    },
    setRememberMe(rememberMe: boolean) {
      this.rememberMe = rememberMe
    },
    setLoginInfo(loginInfo: UserLoginType | undefined) {
      this.loginInfo = loginInfo
    }
  },
  persist: true
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
