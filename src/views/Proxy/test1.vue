<script setup lang="ts">
import { FormSchema } from '@/components/Form'
import { Search } from '@/components/Search'
import { useSearch } from '@/hooks/web/useSearch'
import MinTable from '@/views/Profile/UseTableDemo.vue'
import { reactive, ref } from 'vue'

const { searchRegister, searchMethods } = useSearch()
const { getFormData } = searchMethods

const schema = reactive<FormSchema[]>([
  {
    field: 'field1',
    label: 'Name',
    component: 'Input'
  }
])

const isGrid = ref(false)
const layout = ref('inline')

const handleSearch = async (data: any) => {
  const formData = await getFormData()
  console.log(formData)
  console.log(data)
}

const searchLoading = ref(false)
const resetLoading = ref(false)

const functionButtonsData = [
  {
    id: 1,
    text: 'Start 1 profiles',
    action: 'startProfiles',
    type: 'primary',
    iconClass: 'play-icon',
    icon: 'CaretRight' // Element Plus icon component for starting profiles
  },
  {
    id: 2,
    text: 'Stop 1 profiles',
    action: 'stopProfiles',
    iconClass: 'stop-icon',
    type: 'danger',
    plain: true,
    icon: 'CircleClose' // Element Plus icon component for stopping profiles
  },
  {
    id: 3,
    text: 'Assign to group',
    action: 'assignGroup',
    iconClass: 'user-plus-icon',
    type: 'primary',
    icon: 'User' // Element Plus icon component for assigning to a group
  },
  {
    id: 4,
    text: 'Share profiles',
    action: 'shareProfiles',
    iconClass: 'share-icon',
    type: 'primary',
    icon: 'Share' // Element Plus icon component for sharing profiles
  },
  {
    id: 5,
    text: 'Check proxy',
    action: 'checkProxy',
    iconClass: 'check-icon',
    type: 'primary',
    icon: 'Check' // Element Plus icon component for checking proxy
  },
  {
    id: 6,
    text: 'Start with app',
    action: 'startWithApp',
    iconClass: 'start-app-icon',
    type: 'primary',
    plain: true,
    icon: 'CaretRight' // Element Plus icon component for starting with the app
  },
  {
    id: 7,
    text: 'Update proxy',
    action: 'updateProxy',
    iconClass: 'update-icon',
    type: 'primary',
    plain: true,
    icon: 'Refresh' // Element Plus icon component for updating proxy
  },
  {
    id: 8,
    text: 'Update profiles',
    action: 'updateProfiles',
    iconClass: 'update-profiles-icon',
    type: 'primary',
    plain: true,
    icon: 'RefreshRight' // Element Plus icon component for updating profiles
  },
  {
    id: 9,
    text: 'Share on cloud',
    action: 'shareOnCloud',
    iconClass: 'cloud-icon',
    type: 'danger',
    plain: true,
    icon: 'Upload' // Element Plus icon component for sharing on cloud
  },
  {
    id: 10,
    text: 'New Finger Print',
    action: 'newFingerPrint',
    iconClass: 'icon-class',
    type: 'success',
    plain: true,
    icon: 'HelpFilled' // Element Plus icon component for new fingerprint
  }
]

const searchParams = ref({})
const setSearchParams = (params: any) => {
  searchParams.value = params
}
const searchSchema = ref([
  {
    component: 'Input',
    field: 'title',
    label: 'Title'
  }
])
</script>

<template>
  <Search :schema="searchSchema" @search="setSearchParams" @reset="setSearchParams" />

  <section class="functional-section flex flex-wrap gap-3.5 mt-3 justify-center">
    <el-button
      v-for="(data, index) in functionButtonsData"
      :key="index"
      :type="data.type"
      plain
      class="mx-0"
    >
      <el-icon class="me-2"><component :is="data.icon"></component></el-icon>
      {{ data.text }}
    </el-button>

    <el-dropdown>
      <el-button class="ml-3 mt-[2px]" link type="primary"
        ><el-icon><More /></el-icon
      ></el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-button link type="primary">
              <el-icon><Edit /></el-icon>
              菜单权限
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </section>

  <section class="mt-4">
    <MinTable />
  </section>
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>
