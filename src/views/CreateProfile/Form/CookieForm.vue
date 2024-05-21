<script setup>
import { ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { ElMessageBox, ElMessage } from 'element-plus'

const { t } = useI18n()

const cookieForm = ref({
  name: ''
})

const showForm = ref(true)

const cookiesCount = ref(1)

const cookies = ref([
  { name: 'Cookie 1', url: 'https://example.com', value: 'value1' },
  { name: 'Cookie 2', url: 'https://example.com', value: 'value2' },
  { name: 'Cookie 3', url: 'https://example.com', value: 'value3' }
])

const handleSubmit = () => {
  console.log('form', cookieForm)
  showForm.value = false
}

const onDeleteCookies = () => {
  ElMessageBox.confirm(t('common.delMessage'), t('common.delWarning'), {
    confirmButtonText: t('common.delOk'),
    cancelButtonText: t('common.delCancel'),
    type: 'warning'
  }).then(async () => {
    // call delete api

    if (true) {
      ElMessage.success(t('common.delSuccess'))

      showForm.value = true
    }
  })
}
</script>

<template>
  <el-form v-if="showForm" label-position="top">
    <el-form-item label="Nhập Cookies">
      <el-input
        v-model="cookieForm.name"
        type="textarea"
        rows="8"
        placeholder="Kéo hoặc dán cookies"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">Nhập</el-button>
    </el-form-item>
  </el-form>

  <div v-else>
    <section class="flex items-center mb-3">
      <div class="me-3"
        >Đã nhập <span class="text-blue">{{ cookiesCount }} </span> cookies</div
      >
      <el-button type="danger" plain @click="onDeleteCookies">Xóa</el-button>
    </section>

    <el-table :data="cookies" style="width: 100%">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="url" label="URL" />
      <el-table-column prop="value" label="Value" />
    </el-table>
  </div>
</template>

<style>
.el-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
