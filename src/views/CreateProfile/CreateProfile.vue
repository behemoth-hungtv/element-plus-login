<script setup>
import { reactive } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'

const form = reactive({
  name: '',
  group: '',
  syncCloud: true
})

const groups = [
  { value: 'group1', label: 'Group 1' },
  { value: 'group2', label: 'Group 2' },
  { value: 'group3', label: 'Group 3' }
]

const createProfile = () => {
  console.log('Profile Created:', form)
}
</script>

<template>
  <ContentWrap>
    <el-form label-position="top" :model="form">
      <el-row :gutter="20">
        <el-col :span="12"
          ><el-form-item label="Têи">
            <el-input v-model="form.name" placeholder="Têи"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Nhóm">
            <el-select v-model="form.group" placeholder="Nhóm">
              <el-option
                v-for="item in groups"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
      </el-row>

      <div class="flex justify-start">
        <el-form-item>
          <el-checkbox v-model="form.syncCloud"
            >Đồng bộ đám mây <el-icon><Edit /></el-icon
          ></el-checkbox>
        </el-form-item>
      </div>

      <div class="flex justify-start">
        <el-form-item>
          <el-button type="primary" @click="createProfile">+ Tạo Hồ Sơ</el-button>
        </el-form-item>
      </div>
    </el-form>
  </ContentWrap>
</template>

<style>
/* Optional: Add any additional styles you need */
</style>
