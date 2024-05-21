<script setup lang="tsx">
import { getProfileListApi } from '@/api/table'
import { Table, TableColumn } from '@/components/Table'
import { useI18n } from '@/hooks/web/useI18n'
import { useTable } from '@/hooks/web/useTable'
import dayjs from 'dayjs'
import { onMounted, reactive, ref, unref, nextTick } from 'vue'
import DropDownAction from '@/views/Profile/DropDownAction.vue'
import { Search } from '@/components/Search'

import ProfileDetail from '@/views/Profile/ProfileDetail.vue'
import ProfileFunction from '@/views/Profile/ProfileFunction.vue'

const searchSchema = ref([
  {
    component: 'Input',
    field: 'name',
    label: 'Name'
  }
])

const searchParams = ref({})

const { tableRegister, tableMethods, tableState } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getProfileListApi({
      offset: (unref(currentPage) - 1) * unref(pageSize),
      limit: unref(pageSize),
      ...unref(searchParams)
    })

    return {
      list: res.data.items.map((item) => ({
        ...item,
        tag: [item.tag]
      })),
      total: res.data.pagination.total_items
    }
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { setProps, refresh, getList } = tableMethods

const { t } = useI18n()

const columns = reactive<TableColumn[]>([])
const canShowPagination = ref(true)

const setSearchParams = (params: any) => {
  searchParams.value = params

  getList()
}

const showDetailsCard = ref(false)

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
          width: 80,
          sortable: true,
          sortBy: () => {
            // call API
            console.log('sort')
            return -1
          }
        },
        {
          field: 'name', // Synced with ListProps
          label: 'Name', // Synced with ListProps
          sortable: true,
          sortBy: () => {
            // call API
            console.log('sort')
            return -1
          }
        },
        {
          field: 'tag', // Synced with ListProps
          label: 'Tag', // Synced with ListProps
          width: 120,
          formatter: (row: Recordable, __: TableColumn, cellValue: string[]) => {
            const items = cellValue.map((item) => {
              return (
                <ElTag
                  style="cursor:pointer"
                  class="me-2"
                  closable
                  type="success"
                  onClose={(tag) => handleClose(row, tag)}
                >
                  {item}
                </ElTag>
              )
            })

            return (
              <div class="flex flex-wrap items-center tag-row">
                {items}
                {row.inputVisible && (
                  <el-input
                    ref="InputRef"
                    v-model={inputValue.value}
                    onChange={() => handleInputConfirm(row)}
                    class="w-20"
                    size="small"
                  />
                )}
                {!row.inputVisible && (
                  <el-button
                    class="button-new-tag mt-1"
                    size="small"
                    type="success"
                    plain
                    onClick={() => showInput(row)}
                  >
                    +
                  </el-button>
                )}
              </div>
            )
          }
        },
        {
          field: 'note', // Synced with ListProps
          label: 'Note', // Synced with ListProps
          formatter: (row: Recordable, __: TableColumn, cellValue: number) => {
            return (
              <el-input
                v-model={row.note}
                onChange={() => handleUpdateNote(row)}
                clearable
                class="note-input w-20"
                size="small"
              />
            )
          }
        },
        {
          field: 'proxy', // Synced with ListProps
          label: 'Proxy' // Synced with ListProps
        },
        {
          field: 'updated_at', // Synced with ListProps
          label: 'Updated At', // Synced with ListProps
          sortable: true,
          sortBy: () => {
            // call API
            console.log('sort')
            return -1
          },
          formatter: ({ createTime }) => dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
        },
        {
          field: 'status', // Synced with ListProps
          label: 'Status', // Synced with ListProps
          width: 100,
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
          formatter: (row) => {
            return <DropDownAction record={row}></DropDownAction>
          }
        }
      ]
    })
  }, 20)
})

const inputValue = ref('')
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (row, tag: string) => {
  row.tag.splice(row.tag.indexOf(tag), 1)
}

const showInput = (row) => {
  row.inputVisible = true

  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = (row) => {
  // row.tag should be array
  if (inputValue.value) {
    row.tag.push(inputValue.value)
  }

  row.inputVisible = false
  inputValue.value = ''
}

const multipleSelection: any = ref([])

const handleUpdateNote = (row) => {}

const handleSelectionChange = (val: []) => {
  console.log('get selected rows')
  multipleSelection.value = val
}

const rowClick = (row) => {
  showDetailsCard.value = true
  console.log(row)
}
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="showDetailsCard ? 17 : 24">
      <Search :schema="searchSchema" @search="setSearchParams" @reset="setSearchParams" />

      <ProfileFunction></ProfileFunction>

      <section class="profile-table mt-4">
        <Table
          v-model:pageSize="pageSize"
          v-model:currentPage="currentPage"
          showAction
          style="over-flow: auto"
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
          @rowClick="rowClick"
          @selection-change="handleSelectionChange"
        /> </section
    ></el-col>

    <el-col :span="7">
      <ProfileDetail
        :showDetailsCard="showDetailsCard"
        @toggleDetailsCard="showDetailsCard = !showDetailsCard"
      ></ProfileDetail
    ></el-col>
  </el-row>
</template>

<style lang="less">
.profile-page {
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }

  .el-button.is-circle {
    width: 20px;
    height: 20px;
  }

  .profile-table {
    .el-dialog__body {
      padding: 0 !important;
      padding-top: 10px !important;
    }

    .el-form-item {
      margin-bottom: 0 !important;
    }
  }

  .tag-row {
    .button-new-tag {
      display: none;
    }

    min-height: 40px;
    width: 100%;
  }

  .tag-row:hover {
    .button-new-tag {
      display: inline;
    }
  }

  .note-input .el-input__wrapper {
    box-shadow: none;
  }

  .note-input:hover .el-input__wrapper {
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  }
}
</style>

<style lang="scss" scoped></style>
