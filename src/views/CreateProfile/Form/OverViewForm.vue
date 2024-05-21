<template>
  <el-form label-position="top">
    <el-row :gutter="50">
      <el-col :span="12">
        <el-form-item label="Browser">
          <el-radio-group v-model="formData.browser" size="large">
            <el-radio-button label="Titan Browser" value="titan" />
            <el-radio-button label="Nightly" value="nightly" />
          </el-radio-group>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="Operating System">
          <el-radio-group v-model="formData.operatingSystem" size="large">
            <el-radio-button label="Windows" value="window" />
            <el-radio-button label="Mac OS" value="macos" />
          </el-radio-group> </el-form-item
      ></el-col>
    </el-row>

    <el-row>
      <el-col :span="4">
        <el-form-item label="Version">
          <el-select v-model="formData.version" placeholder="Select version">
            <el-option
              v-for="option in versionOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-form-item>
          <template #label
            ><div class="flex justify-between"
              ><span>User Agent</span
              ><el-button @click="random" type="primary" text>
                <el-icon class="me-2"><Refresh /></el-icon>Random</el-button
              ></div
            ></template
          >
          <el-input v-model="formData.userAgent" placeholder="Enter User Agent"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="50">
      <el-col :span="12">
        <el-form-item label="Screen">
          <el-select v-model="formData.screen" placeholder="Select screen">
            <el-option
              v-for="option in screenOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="CPU">
          <el-select v-model="formData.cpu" placeholder="Select CPU">
            <el-option
              v-for="option in cpuOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select> </el-form-item
      ></el-col>

      <el-col :span="12">
        <el-form-item label="Languages">
          <el-select v-model="formData.languages" placeholder="Select languages" multiple>
            <el-option
              v-for="option in languageOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="Start Url">
          <el-input
            v-model="formData.startUrl"
            placeholder="Enter start URL"
          ></el-input> </el-form-item
      ></el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-checkbox v-model="formData.enableLiteMode"
          >Enable lite mode
          <el-tooltip placement="top" content="Disallow sites show images">
            <el-icon class="ms-2" color="#66b1ff"><QuestionFilled /></el-icon> </el-tooltip
        ></el-checkbox>
        <el-checkbox v-model="formData.doNotTrack">Do not track</el-checkbox>
        <el-checkbox v-model="formData.restoreLastSession">Restore last session</el-checkbox>
        <el-checkbox v-model="formData.clearCacheAfterClosingProfile"
          >Clear cache after closing profile</el-checkbox
        >
      </el-col>
    </el-row>

    <el-row class="mt-2">
      <el-col>
        <el-form-item label="Delay open (seconds)">
          <el-input-number
            v-model="formData.delayOpen"
            :min="0"
            placeholder="Enter delay in seconds"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import moment from 'moment-timezone'

const formData = ref({
  browser: 'titan',
  version: '',
  userAgent: '',
  operatingSystem: true,
  screen: '',
  languages: '',
  cpu: '',
  startUrl: '',
  enableLiteMode: false,
  doNotTrack: false,
  restoreLastSession: true,
  clearCacheAfterClosingProfile: true,
  delayOpen: 1
})

const versionOptions = Array.from({ length: 8 }, (_, index) => {
  const version = 117 + index
  return {
    label: `${version}`,
    value: `${version}`
  }
})

// Generate screen options dynamically
const screenOptions = [
  { label: '1024x768', value: '1024x768' },
  { label: '1152x648', value: '1152x648' },
  { label: '1152x864', value: '1152x864' },
  // Generating additional screen resolutions following the pattern
  ...Array.from({ length: 10 }, (_, index) => {
    const width = 1024 + index * 128
    const height = (width * 3) / 4 // Maintain 4:3 aspect ratio
    return {
      label: `${width}x${height}`,
      value: `${width}x${height}`
    }
  })
]

// Generate CPU options dynamically from 2 to 32
const cpuOptions = [2, 4, 8, 16, 32].map((cpuCount) => ({
  label: `${cpuCount}`,
  value: `${cpuCount}`
}))

const languageOptions = [
  { label: 'English', value: 'English' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'French', value: 'French' },
  { label: 'German', value: 'German' }
  // Add more languages as needed
]

const random = () => {
  console.log('random')
}
</script>
