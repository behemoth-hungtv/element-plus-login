<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getCardTableListApi } from '@/api/table'
import { ref } from 'vue'
import { ElLink, ElDivider } from 'element-plus'

interface Params {
  pageIndex?: number
  pageSize?: number
}

const { t } = useI18n()

const loading = ref(true)

let tableDataList = ref<any[]>([])

const getTableList = async (params?: Params) => {
  const res = await getCardTableListApi(
    params || {
      pageIndex: 1,
      pageSize: 10
    }
  )
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })
  if (res) {
    tableDataList.value = res.data.list
  }
}

getTableList()

const actionClick = (row?: any) => {
  console.log(row)
}

const centerDialogVisible = ref(false)
</script>

<template>
  <Table
    :columns="[]"
    :data="tableDataList"
    :loading="loading"
    custom-content
    :card-wrap-style="{
      width: '200px',
      marginBottom: '20px',
      marginRight: '20px'
    }"
  >
    <template #content="row">
      <div class="text-center mb-2">
        <div>
          <img :src="row.logo" class="w-48px h-48px rounded-[50%]" alt="" />
        </div>
      </div>

      <div class="text-center mb-2">
        <div class="mb-12px font-700 font-size-16px">{{ row.name }}</div>
        <div class="line-clamp-3 font-size-12px">{{ row.desc }}</div>
      </div>
    </template>
    <template #content-footer="item">
      <div class="flex justify-center items-center">
        <div class="flex-1 text-center" @click="() => actionClick(item)">
          <BaseButton @click="centerDialogVisible = true" type="primary"
            ><el-icon class="me-2"><ShoppingCart /></el-icon>Purchase</BaseButton
          >
        </div>
      </div>
    </template>
  </Table>

  <el-dialog v-model="centerDialogVisible" title="Confirm" width="500" center>
    <span> Are you sure to process this purchase ? </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>
