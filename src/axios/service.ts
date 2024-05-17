import axios, { AxiosError } from 'axios'
import { defaultRequestInterceptors, defaultResponseInterceptors } from './config'
import { useUserStoreWithOut } from '@/store/modules/user'
import { REQUEST_TIMEOUT } from '@/constants'
import { ElMessage } from 'element-plus'
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, RequestConfig } from './types'
import { refreshTokenApi } from '@/api/login/index'

import router from '@/router'

export const PATH_URL = import.meta.env.VITE_API_BASE_PATH

let isRefreshing = false

let refreshSubscribers: Array<(token: string) => void> = []

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback)
}

const abortControllerMap: Map<string, AbortController> = new Map()

const axiosInstance: AxiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT,
  baseURL: PATH_URL
})

axiosInstance.interceptors.request.use((res: InternalAxiosRequestConfig) => {
  const controller = new AbortController()
  const url = res.url || ''
  res.signal = controller.signal
  abortControllerMap.set(
    import.meta.env.VITE_USE_MOCK === 'true' ? url.replace('/mock', '') : url,
    controller
  )
  return res
})

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const url = res.config.url || ''
    abortControllerMap.delete(url)
    // 这里不能做任何处理，否则后面的 interceptors 拿不到完整的上下文了
    return res
  },
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (error.toJSON().status == 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (!isRefreshing) {
        isRefreshing = true

        const userStore = useUserStoreWithOut()
        const refreshToken = userStore.getRefreshToken

        const res = await refreshTokenApi({ refresh_token: refreshToken })

        console.log('origin', res)

        if (res) {
          userStore.setUserInfo(res.data)
          userStore.setToken(res.data.access_token)
          userStore.setRefreshToken(res.data.refresh_token)

          onRefreshed(newToken)
        }

        return new Promise((resolve, reject) => {
          addRefreshSubscriber((token: string) => {
            if (token) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token
              resolve(axiosInstance(originalRequest))
            } else {
              reject(error)
            }
          })
        })
      } else if (error.toJSON().status == 401) {
        router.push('/')
      }
    }

    ElMessage.error(error.toJSON().response.message)

    return Promise.reject(error)
  }
)

axiosInstance.interceptors.request.use(defaultRequestInterceptors)
axiosInstance.interceptors.response.use(defaultResponseInterceptors)

const service = {
  request: (config: RequestConfig) => {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any)
      }

      axiosInstance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },
  cancelRequest: (url: string | string[]) => {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      abortControllerMap.get(_url)?.abort()
      abortControllerMap.delete(_url)
    }
  },
  cancelAllRequest() {
    // eslint-disable-next-line no-unused-vars
    for (const [__, controller] of abortControllerMap) {
      controller.abort()
    }
    abortControllerMap.clear()
  }
}

export default service
