<script setup lang="tsx">
import { getProfileListApi, getProxyListApi } from '@/api/table'
import { BaseButton } from '@/components/Button'
import { Table, TableColumn, TableSlotDefault } from '@/components/Table'
import { useI18n } from '@/hooks/web/useI18n'
import { useIcon } from '@/hooks/web/useIcon'
import { useTable } from '@/hooks/web/useTable'
import dayjs from 'dayjs'
import { computed, onMounted, reactive, ref, unref } from 'vue'
import VueSecond from '@/views/Profile/test2.vue'

const { tableRegister, tableMethods, tableState } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getProxyListApi({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize)
    })
    return {
      list: res.data.list,
      total: res.data.total
    }
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { setProps, refresh } = tableMethods

const { t } = useI18n()

const columns = reactive<TableColumn[]>([])
const tagStyle = computed(() => {
  return (status: number) => {
    return status === 1
      ? {
          '--el-tag-text-color': '#6abe39',
          '--el-tag-bg-color': '#172412',
          '--el-tag-border-color': '#274a17'
        }
      : {
          '--el-tag-text-color': '#e84749',
          '--el-tag-bg-color': '#2b1316',
          '--el-tag-border-color': '#58191c'
        }
  }
})

onMounted(() => {
  setTimeout(() => {
    setProps({
      columns: [
        {
          field: 'selection',
          type: 'selection'
        },
        {
          field: 'name', // Synced with ListProps
          label: 'Name' // Synced with ListProps
        },
        {
          field: 'type', // Synced with ListProps
          label: 'Type', // Synced with ListProps
          formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
            return <ElTag type="success">{cellValue}</ElTag>
          }
        },
        {
          field: 'supported_protocol', // Synced with ListProps
          label: 'Supported Protocal' // Synced with ListProps
        },
        {
          field: 'started_at', // Synced with ListProps
          label: 'Started At', // Synced with ListProps,
          formatter: ({ createTime }) => dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
        },
        {
          field: 'expired_at', // Synced with ListProps
          label: 'Expired At', // Synced with ListProps,
          formatter: ({ createTime }) => dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
        },
        {
          field: 'usage_remaining', // Synced with ListProps
          label: 'Usage Remaining' // Synced with ListProps
        }
      ]
    })
  }, 2000)
})

const actionFn = (data: TableSlotDefault) => {
  console.log(data)
}

const canShowPagination = ref(true)
</script>

<template>
  <Table
    v-model:pageSize="pageSize"
    v-model:currentPage="currentPage"
    showAction
    :columns="columns"
    :data="dataList"
    :loading="loading"
    :pagination="
      canShowPagination
        ? {
            total: total
          }
        : undefined
    "
    @register="tableRegister"
    @refresh="refresh"
  />
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>
