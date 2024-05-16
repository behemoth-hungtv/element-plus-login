<script setup lang="ts">
import { Search } from '@/components/Search'
import { useSearch } from '@/hooks/web/useSearch'
import ProxyCard from '@/views/Proxy/ProxyCard.vue'
import { ref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import ProxyPurchase from '@/views/Proxy/ProxyPurchase.vue'

const { searchMethods } = useSearch()
const { getFormData } = searchMethods

const searchParams = ref({})
const setSearchParams = (params: any) => {
  searchParams.value = params
}
const searchSchema = ref([
  {
    field: 'field2',
    label: 'Tag',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          value: '1'
        },
        {
          label: 'option2',
          value: '2'
        }
      ],
      on: {
        change: (value: string) => {
          console.log(value)
        }
      }
    }
  }
])

const centerDialogVisible = ref(false)
</script>

<template>
  <ContentWrap>
    <section class="section-search">
      <Search
        :showSearch="false"
        :schema="searchSchema"
        @search="setSearchParams"
        @reset="setSearchParams"
      />

      <BaseButton @click="centerDialogVisible = true" type="primary"
        ><el-icon class="me-2"><CirclePlus /></el-icon>Add</BaseButton
      >
    </section>

    <section class="mt-4"> <ProxyCard /> </section>

    <el-dialog v-model="centerDialogVisible" width="auto" minwidth="400" center>
      <template #title
        ><div class="flex items-center">
          <el-icon class="me-2"><Expand /></el-icon>
          Add Proxy
        </div>
      </template>
      <h3>Select one of these kinds</h3>
      <ProxyPurchase></ProxyPurchase>
    </el-dialog>
  </ContentWrap>
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>
