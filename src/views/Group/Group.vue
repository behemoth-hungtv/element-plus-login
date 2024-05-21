<script setup lang="ts">
import { Search } from '@/components/Search'
import GroupList from '@/views/Group/GroupList.vue'
import { ref, reactive } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'

const searchParams = ref({})
const setSearchParams = (params: any) => {
  searchParams.value = params
}
const searchSchema = ref([
  {
    field: 'field2',
    label: 'Name',
    component: 'Input'
  }
])

const centerDialogVisible = ref(false)

const groupMemberForm = reactive({
  name: ''
})

const formRef = ref<FormInstance>()

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <ContentWrap>
    <section class="section-search flex justify-between">
      <Search
        :showReset="false"
        :schema="searchSchema"
        @search="setSearchParams"
        @reset="setSearchParams"
      />

      <BaseButton @click="centerDialogVisible = true" type="primary"
        ><el-icon class="me-2"><CirclePlus /></el-icon>Add Group</BaseButton
      >
    </section>

    <section class="mt-4"> <GroupList /> </section>

    <el-dialog v-model="centerDialogVisible" width="auto" center>
      <template #header
        ><div class="flex items-center">
          <el-icon class="me-2"><House /></el-icon>
          Add new group
        </div>
      </template>

      <el-form
        ref="formRef"
        style="min-width: 800px"
        :model="groupMemberForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item
          label="Name"
          prop="name"
          :rules="[{ required: true, message: 'name is required' }]"
        >
          <el-input v-model.number="groupMemberForm.name" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item class="justify-between">
          <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </ContentWrap>
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>
