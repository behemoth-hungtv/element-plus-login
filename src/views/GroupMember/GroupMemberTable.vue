<script setup lang="tsx">
import { getGroupMemberListApi } from '@/api/table'
import { Table, TableColumn, TableSlotDefault } from '@/components/Table'
import { useI18n } from '@/hooks/web/useI18n'
import { useTable } from '@/hooks/web/useTable'
import dayjs from 'dayjs'
import { computed, onMounted, reactive, ref, unref } from 'vue'
import DropDownAction from '@/views/GroupMember/TableAction.vue'

const { tableRegister, tableMethods, tableState } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getGroupMemberListApi({
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
          field: 'email',
          label: 'Email'
        },
        {
          field: 'create_profile', // Synced with ListProps
          label: 'Create Profile' // Synced with ListProps
        },
        {
          field: 'view_profile', // Synced with ListProps
          label: 'View Profile' // Synced with ListProps
        },
        {
          field: 'share_profile', // Synced with ListProps
          label: 'Share Profile' // Synced with ListProps
        },
        {
          field: 'edit_proxy', // Synced with ListProps
          label: 'Edit Proxy', // Synced with ListProps,
          formatter: ({ createTime }) => dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
        },
        {
          field: 'operation',
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

const actionFn = (data: TableSlotDefault) => {
  console.log(data)
}

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
