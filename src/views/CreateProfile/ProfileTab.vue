<script setup>
import { ref } from 'vue'
import CookiesForm from '@/views/CreateProfile/Form/CookieForm.vue'
import HardwareForm from '@/views/CreateProfile/Form/HardwareForm.vue'
import LocationForm from '@/views/CreateProfile/Form/LocationForm.vue'

const activeTab = ref('overview')
</script>

<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Tổng Quan" name="overview">
        <p>Content for Tổng Quan</p>
      </el-tab-pane>
      <el-tab-pane label="Mạng" name="network">
        <p>Content for Mạng</p>
      </el-tab-pane>
      <el-tab-pane label="Vị Trí" name="location">
        <LocationForm></LocationForm>
      </el-tab-pane>
      <el-tab-pane label="Phần Cứng" name="hardware">
        <HardwareForm />
      </el-tab-pane>
      <el-tab-pane label="Cookies" name="cookies">
        <CookiesForm />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
/* Optional: Add custom styles here */
</style>
