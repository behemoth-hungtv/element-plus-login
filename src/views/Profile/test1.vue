<script setup lang="ts">
import { FormSchema } from '@/components/Form'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'
import { useIcon } from '@/hooks/web/useIcon'
import { useSearch } from '@/hooks/web/useSearch'
import MinTable from '@/views/Profile/UseTableDemo.vue'
import { reactive, ref } from 'vue'

const { t } = useI18n()

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
    icon: 'mdi:account-group' // Icon for starting profiles
  },
  {
    id: 2,
    text: 'Stop 1 profiles',
    action: 'stopProfiles',
    iconClass: 'stop-icon',
    type: 'danger',
    plain: true,
    icon: 'mdi:stop-circle' // Icon for stopping profiles
  },
  {
    id: 3,
    text: 'Assign to group',
    action: 'assignGroup',
    iconClass: 'user-plus-icon',
    type: 'primary',
    icon: 'mdi:account-plus' // Icon for assigning to a group
  },
  {
    id: 4,
    text: 'Share profiles',
    action: 'shareProfiles',
    iconClass: 'share-icon',
    type: 'primary',
    icon: 'mdi:share-variant' // Icon for sharing profiles
  },
  {
    id: 5,
    text: 'Check proxy',
    action: 'checkProxy',
    iconClass: 'check-icon',
    type: 'primary',
    icon: 'mdi:check-circle' // Icon for checking proxy
  },
  {
    id: 6,
    text: 'Start with app',
    action: 'startWithApp',
    iconClass: 'start-app-icon',
    type: 'primary',
    plain: true,
    icon: 'mdi:play-circle' // Icon for starting with the app
  },
  {
    id: 7,
    text: 'Update proxy',
    action: 'updateProxy',
    iconClass: 'update-icon',
    type: 'primary',
    plain: true,
    icon: 'mdi:sync' // Icon for updating proxy
  },
  {
    id: 8,
    text: 'Update profiles',
    action: 'updateProfiles',
    iconClass: 'update-profiles-icon',
    type: 'primary',
    plain: true,
    icon: 'mdi:refresh' // Icon for updating profiles
  },
  {
    id: 9,
    text: 'Share on cloud',
    action: 'shareOnCloud',
    iconClass: 'cloud-icon',
    type: 'danger',
    plain: true,
    icon: 'mdi:cloud-upload' // Icon for sharing on cloud
  },
  {
    id: 10,
    text: 'New Finger Print',
    action: 'newFingerPrint',
    iconClass: 'icon-class',
    type: 'success',
    plain: true,
    icon: 'mdi:fingerprint' // Icon for new fingerprint
  }
]
</script>

<template>
  <Search
    :schema="schema"
    :is-col="isGrid"
    :layout="layout"
    :search-loading="searchLoading"
    :reset-loading="resetLoading"
    :show-reset="false"
    :show-expand="false"
    expand-field="field6"
    @search="handleSearch"
    @reset="handleSearch"
    @register="searchRegister"
  />

  <section class="functional-section flex flex-wrap gap-3.5 mt-3 justify-center">
    <el-button
      v-for="(data, index) in functionButtonsData"
      :key="index"
      :type="data.type"
      plain
      :icon="useIcon({ icon: data.icon })"
      class="mx-0"
    >
      {{ data.text }}
    </el-button>

    <el-dropdown>
      <el-button
        class="ml-3 mt-[2px]"
        link
        type="primary"
        :icon="useIcon({ icon: 'mdi:dots-horizontal' })"
      />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-button link type="primary" :icon="useIcon({ icon: 'mdi:more' })">
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
