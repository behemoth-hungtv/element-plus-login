<template>
  <div>
    <el-button type="default" text @click="showDialog"
      ><el-icon class="me-2"><Edit /></el-icon>Chia sẻ</el-button
    >

    <el-dialog append-to-body width="690" v-model="visible" title="Invite Someone">
      <el-form :model="formData" label-width="120px">
        <el-form-item label="Invitee Email">
          <el-input v-model="formData.email" placeholder="Enter email address" />
        </el-form-item>

        <div class="flex items-center">
          <el-checkbox
            v-model="formData.read"
            label="Đọc (Read)"
            true-value="true"
            false-value="false"
          />
          <el-checkbox
            v-model="formData.syncData"
            label="Đồng bộ Dữ Liệu (Sync Data)"
            true-value="true"
            false-value="false"
          />
          <el-checkbox
            v-model="formData.edit"
            label="Chỉnh sửa (Edit)"
            true-value="true"
            false-value="false"
          />
          <el-checkbox
            v-model="formData.delete"
            label="Xóa (Delete)"
            true-value="true"
            false-value="false"
          />
        </div>
      </el-form>
      <template #footer>
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Invite</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

const formData = ref({
  email: '',
  read: true, // Separate permission fields with default value true
  syncData: true,
  edit: true,
  delete: true
})

const showDialog = () => {
  visible.value = true
}

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  visible.value = false
}
</script>

<style scoped>
/* Add any button styling customizations here (optional) */
</style>
