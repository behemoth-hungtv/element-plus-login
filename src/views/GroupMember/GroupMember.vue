<script setup lang="ts">
import { Search } from '@/components/Search'
import GroupMemberTable from '@/views/GroupMember/GroupMemberTable.vue'
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
  email: '',
  password: '',
  create_profile_permission: true,
  view_profile_permission: true,
  share_profile_permission: true,
  modify_proxy_permission: true
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
        ><el-icon class="me-2"><CirclePlus /></el-icon>Add group</BaseButton
      >
    </section>

    <section class="mt-4"> <GroupMemberTable /> </section>

    <el-dialog v-model="centerDialogVisible" width="auto" center>
      <template #header
        ><div class="flex items-center">
          <el-icon class="me-2"><User /></el-icon>
          Add new member to group
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
          label="Email"
          prop="email"
          :rules="[{ required: true, message: 'email is required' }]"
        >
          <el-input v-model.number="groupMemberForm.email" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="Password"
          prop="password"
          :rules="[{ required: true, message: 'password is required' }]"
        >
          <el-input v-model.number="groupMemberForm.password" type="text" autocomplete="off" />
        </el-form-item>

        <div class="flex items-center justify-between">
          <el-form-item label="Create Profile" prop="create_permission">
            <el-checkbox
              v-model.number="groupMemberForm.create_profile_permission"
              type="text"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item label="View Profile" prop="view_profile_permission">
            <el-checkbox
              v-model.number="groupMemberForm.view_profile_permission"
              type="text"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item label="Share Profile" prop="share_profile_permission">
            <el-checkbox
              v-model.number="groupMemberForm.share_profile_permission"
              type="text"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item label="Modify Proxy" prop="modify_proxy_permission">
            <el-checkbox
              v-model.number="groupMemberForm.modify_proxy_permission"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
        </div>

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
