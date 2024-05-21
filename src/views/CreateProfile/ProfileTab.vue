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
        <p>Content for Vị Trí</p>
      </el-tab-pane>
      <el-tab-pane label="Phần Cứng" name="hardware">
        <p>Content for Phần Cứng</p>
      </el-tab-pane>
      <el-tab-pane label="Cookies" name="cookies">
        <p>Content for Cookies</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('overview')
</script>

<style>
/* Optional: Add custom styles here */
</style>
