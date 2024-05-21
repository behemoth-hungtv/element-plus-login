<template>
  <div>
    <el-button type="default" text @click="showDialog"
      ><el-icon class="me-2"><Edit /></el-icon>Đổi chủ sở hữu</el-button
    >

    <el-dialog append-to-body width="500" v-model="visible">
      <template #header>
        <el-icon class="me-2"><Edit /></el-icon> Thay đổi chủ sở hữu các hồ sơ đã chọn
      </template>
      <el-form :model="formData" label-width="120px">
        <el-input v-model="formData.email" placeholder="Enter email address" />
      </el-form>
      <template #footer>
        <el-button @click="visible = false">Huỷ</el-button>
        <el-button type="primary" @click="handleSubmit">Đổi chủ sở hữu</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

const formData = ref({
  email: ''
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
