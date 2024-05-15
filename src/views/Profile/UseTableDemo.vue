<script setup lang="tsx">
import { getTableListApi } from '@/api/table'
import { BaseButton } from '@/components/Button'
import { Table, TableColumn, TableSlotDefault } from '@/components/Table'
import { useI18n } from '@/hooks/web/useI18n'
import { useIcon } from '@/hooks/web/useIcon'
import { useTable } from '@/hooks/web/useTable'
import dayjs from 'dayjs'
import { computed, onMounted, reactive, ref, unref } from 'vue'

const { tableRegister, tableMethods, tableState } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getTableListApi({
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
          slots: {
            default: (data: TableSlotDefault) => {
              return (
                <div>
                  <BaseButton type="primary" onClick={() => actionFn(data)}>
                    Start
                  </BaseButton>

                  <el-dropdown
                    scopedSlots={{
                      dropdown: function () {
                        return (
                          <el-dropdown-menu>
                            <el-dropdown-item>
                              <el-button link type="primary" icon={useIcon({ icon: 'mdi:more' })}>
                                菜单权限
                              </el-button>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        )
                      }
                    }}
                  >
                    <el-button
                      class="ml-3 mt-[2px]"
                      link
                      type="primary"
                      icon={useIcon({ icon: 'mdi:dots-horizontal' })}
                    />
                  </el-dropdown>
                </div>
              )
            }
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
