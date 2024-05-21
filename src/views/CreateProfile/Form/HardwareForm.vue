<template>
  <el-form label-position="top" class="demo-form-inline">
    <el-row :gutter="50">
      <el-col :span="4">
        <el-form-item label="WebGL">
          <el-select v-model="formData.webgl" placeholder="Select value">
            <el-option label="Noise" value="noise" />
            <el-option label="Off" value="off" />
          </el-select> </el-form-item
      ></el-col>

      <el-col :span="4">
        <el-form-item label="Canvas">
          <el-select v-model="formData.canvas" placeholder="Select value">
            <el-option label="Noise" value="noise" />
            <el-option label="Block" value="block" />
            <el-option label="Off" value="off" />
          </el-select> </el-form-item
      ></el-col>

      <el-col :span="4">
        <el-form-item label="Client Rects">
          <el-select v-model="formData.clientRects" placeholder="Select value">
            <el-option label="Noise" value="noise" />
            <el-option label="Off" value="off" />
          </el-select> </el-form-item
      ></el-col>

      <el-col :span="4">
        <el-form-item label="Audio Context">
          <el-select v-model="formData.audioContext" placeholder="Select value">
            <el-option label="Noise" value="noise" />
            <el-option label="Off" value="off" />
          </el-select> </el-form-item
      ></el-col>

      <el-col :span="4">
        <el-form-item label="Fonts">
          <el-select v-model="formData.fonts" placeholder="Select value">
            <el-option label="Noise" value="noise" />
            <el-option label="Off" value="off" />
          </el-select> </el-form-item
      ></el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :span="8">
        <el-form-item label="WebGL Rerender">
          <el-select
            v-model="formData.webglRerender"
            filterable
            placeholder="Select or create WebGL rerender"
          >
            <el-option
              v-for="option in webglRerenderOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="WebGL Vendor">
          <el-select
            v-model="formData.webglVendor"
            filterable
            placeholder="Select or create WebGL vendor"
          >
            <el-option
              v-for="option in webglVenderOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select> </el-form-item
      ></el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :span="10">
        <el-form-item label="Tiện Ích Mở Rộng">
          <el-input
            v-model="formData.extensionValue"
            :disabled="!formData.enableExtension"
            placeholder="Eg: C://Extension1"
          />
        </el-form-item>
      </el-col>

      <el-col :span="10">
        <el-form-item label="Chrome arguments">
          <el-input v-model="formData.chromeArgument" placeholder="Eg: Argument1=abc" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-form-item label="Kích hoạt tiện ích mở rộng">
          <el-checkbox v-model="formData.enableExtension"></el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  webgl: '',
  canvas: '',
  clientRects: '',
  audioContext: '',
  fonts: '',
  webglRerender: '',
  webglVender: '',
  chromeArgument: '',
  extensionValue: '',
  enableExtension: false
})

const webglRerenderOptions = [
  { label: 'Google Inc. (NIVIDIA)', value: 'nividia' },
  { label: 'Google Inc. (Intel)', value: 'intel' },
  { label: 'Google Inc. (AMD)', value: 'amd' },
  { label: 'Google Inc. (Microsoft)', value: 'microsoft' }
]

const webglVenderOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
]
</script>
