import request from '@/axios'
import type { TableData } from './types'

export const getProfileListApi = (params: any) => {
  return request.get({ url: 'http://103.139.202.40:8080/api/profiles', params })
}

export const getProxyListApi = (params: any) => {
  return request.get({ url: '/mock/example/proxies', params })
}

export const getGroupMemberListApi = (params: any) => {
  return request.get({ url: '/mock/example/group_members', params })
}

export const getCardTableListApi = (params: any) => {
  return request.get({ url: '/mock/card/list', params })
}

export const getTreeTableListApi = (params: any) => {
  return request.get({ url: '/mock/example/treeList', params })
}

export const saveTableApi = (data: Partial<TableData>): Promise<IResponse> => {
  return request.post({ url: '/mock/example/save', data })
}

export const getTableDetApi = (id: string): Promise<IResponse<TableData>> => {
  return request.get({ url: '/mock/example/detail', params: { id } })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: '/mock/example/delete', data: { ids } })
}
