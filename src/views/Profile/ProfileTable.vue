<script setup lang="tsx">
import { getProfileListApi } from '@/api/table'
import { Table, TableColumn } from '@/components/Table'
import { useI18n } from '@/hooks/web/useI18n'
import { useTable } from '@/hooks/web/useTable'
import dayjs from 'dayjs'
import { computed, onMounted, reactive, ref, unref } from 'vue'
import DropDownAction from '@/views/Profile/DropDownAction.vue'

const { tableRegister, tableMethods, tableState } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getProfileListApi({
      offset: (unref(currentPage) - 1) * unref(pageSize),
      limit: unref(pageSize)
    })

    return {
      list: res.data.items,
      total: res.data.pagination.total_items
    }
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { setProps, refresh } = tableMethods

const { t } = useI18n()

const columns = reactive<TableColumn[]>([])

onMounted(() => {
  setTimeout(() => {
    setProps({
      columns: [
        {
          field: 'selection',
          type: 'selection'
        },
        {
          field: 'id',
          label: 'ID',
          type: 'index'
        },
        {
          field: 'name', // Synced with ListProps
          label: 'Name' // Synced with ListProps
        },
        {
          field: 'tag', // Synced with ListProps
          label: 'Tag', // Synced with ListProps
          formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
            return (
              <ElTag closable type="success">
                {cellValue}
              </ElTag>
            )
          }
        },
        {
          field: 'note', // Synced with ListProps
          label: 'Note' // Synced with ListProps
        },
        {
          field: 'proxy', // Synced with ListProps
          label: 'Proxy' // Synced with ListProps
        },
        {
          field: 'updated_at', // Synced with ListProps
          label: 'Updated At', // Synced with ListProps
          formatter: ({ createTime }) => dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
        },
        {
          field: 'status', // Synced with ListProps
          label: 'Status', // Synced with ListProps
          formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
            return (
              <ElTag type={cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'}>
                {cellValue === 1
                  ? t('tableDemo.important')
                  : cellValue === 2
                    ? t('tableDemo.good')
                    : t('tableDemo.commonly')}
              </ElTag>
            )
          }
        },
        {
          field: 'Operation',
          label: t('tableDemo.action'),
          formatter: () => {
            return (
              <DropDownAction
                onOpenDetails={() => (centerDialogVisible.value = true)}
              ></DropDownAction>
            )
          }
        }
      ]
    })
  }, 2000)
})

const canShowPagination = ref(true)

const centerDialogVisible = ref(false)
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

  <el-dialog v-model="centerDialogVisible" title="Warning" width="500" center>
    <span> It should be noted that the content will not be aligned in center by default </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>
