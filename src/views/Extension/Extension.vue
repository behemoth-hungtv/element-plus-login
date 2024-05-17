<script setup lang="ts">
import MinTable from '@/views/Proxy/UseTableDemo.vue'
import { ContentWrap } from '@/components/ContentWrap'
import ExtensionCard from '@/views/Extension/ExtensionCard.vue'

const centerDialogVisible = ref(false)

import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const urlForm = reactive({
  url: ''
})

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
    <section class="uploads flex items-center mb-4">
      <el-upload
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
      >
        <el-button size="large" type="primary" plain>
          <el-icon class="me-2"><UploadFilled /></el-icon>Upload</el-button
        >
      </el-upload>

      <el-button
        @click="centerDialogVisible = true"
        style="margin-top: 0"
        class="ms-3"
        size="large"
        type="primary"
      >
        <el-icon class="me-2"><Link /></el-icon>Enter URL</el-button
      >
    </section>

    <ExtensionCard></ExtensionCard>

    <el-dialog v-model="centerDialogVisible" width="auto" center>
      <template #title
        ><div class="flex items-center">
          <el-icon class="me-2"><Link /></el-icon>
          Enter Extension URL
        </div>
      </template>
      <el-form
        ref="formRef"
        style="min-width: 800px"
        :model="urlForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item
          label="URL"
          prop="url"
          :rules="[{ required: true, message: 'url is required' }]"
        >
          <el-input v-model.number="urlForm.url" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item class="justify-between">
          <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
          <el-button @click="resetForm(formRef)">Reset</el-button>
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
